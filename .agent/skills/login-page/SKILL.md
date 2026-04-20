---
name: login-page
description: >-
  Use when implementing a login page UI. Covers form layout, validation, submit
  flow, error feedback, and redirect-after-login. Orchestrates auth-login skill
  (login action) and auth-guard skill (redirect query).
---

# login-page

登录页 UI 模式。**只管页面 UI 和交互**，登录逻辑由 `auth-login` skill 提供。

## 适用场景

- 任何需要用户登录的应用
- vue / electron / capacitor 共用同一套模式
- nuxt 用法稍有不同（composable + navigateTo）

## 何时被加载

- new-project Phase 7 实现登录页
- new-feature 加登录功能

## 引用的 skills

| 能力                  | 加载哪个 skill                       |
| --------------------- | ------------------------------------ |
| 登录请求 + token 写入 | `auth-login`（useAuthStore.login）   |
| 登录后跳转            | `auth-guard`（读 query.redirect）    |
| UI 组件               | `vup-ui`（VForm / VInput / VButton） |

## 页面组成

```
┌──────────────────────────────────┐
│                                  │
│          [Logo / 标题]           │
│                                  │
│   ┌──────────────────────────┐   │
│   │  用户名：[____________]  │   │
│   │  密  码：[____________]  │   │
│   │                          │   │
│   │  □ 记住我                │   │
│   │                          │   │
│   │  [      登 录      ]     │   │
│   │                          │   │
│   │  忘记密码？  |  注册     │   │
│   └──────────────────────────┘   │
│                                  │
└──────────────────────────────────┘
```

## 文件结构

```
src/
├── pages/login.vue          （Nuxt：文件系统路由）
└── modules/auth/
    └── views/
        └── LoginPage.vue    （Vue / Electron / Capacitor）
```

## 实现步骤

### Step 1：创建页面文件

按当前 stack 的路由约定放置。

### Step 2：表单结构

```vue
<template>
  <div class="flex min-h-screen items-center justify-center">
    <VCard class="w-96 p-8">
      <h1 class="mb-6 text-center text-2xl font-bold">
        {{ t('login.title') }}
      </h1>

      <VForm
        ref="formRef"
        :model="form"
        :rules="rules"
        @submit.prevent="handleLogin"
      >
        <VFormItem prop="username">
          <VInput v-model="form.username" :placeholder="t('login.username')" />
        </VFormItem>

        <VFormItem prop="password">
          <VInput
            v-model="form.password"
            type="password"
            show-password
            :placeholder="t('login.password')"
          />
        </VFormItem>

        <VButton
          type="primary"
          :loading="loading"
          class="w-full"
          native-type="submit"
        >
          {{ t('login.submit') }}
        </VButton>
      </VForm>
    </VCard>
  </div>
</template>
```

### Step 3：登录逻辑

```typescript
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const form = reactive({ username: '', password: '' });
const loading = ref(false);
const formRef = ref();

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

async function handleLogin() {
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) return;

  loading.value = true;
  try {
    await authStore.login(form.username, form.password);
    // 登录后跳回原页面（auth-guard 拦截时保留的 redirect）
    const redirect = (route.query.redirect as string) || '/';
    router.replace(redirect);
  } catch (error) {
    // 错误提示（VMessage 或表单下方提示）
    VMessage.error(error instanceof Error ? error.message : '登录失败');
  } finally {
    loading.value = false;
  }
}
```

### Step 4：Nuxt 差异

Nuxt 用 composable + navigateTo：

```typescript
const auth = useAuth(); // composable（见 auth-login 的 nuxt-login.ts）
const route = useRoute();

async function handleLogin() {
  await auth.login(form.username, form.password);
  const redirect = (route.query.redirect as string) || '/';
  await navigateTo(redirect, { replace: true });
}
```

### Step 5：注册路由

```typescript
// vue 系：router/routes.ts
{ path: '/login', name: 'Login', component: () => import('@/modules/auth/views/LoginPage.vue') }

// nuxt：自动路由（pages/login.vue）
```

## 交互细节

- **提交按钮 loading**：防止重复点击（loading 期间按钮不可点）
- **表单校验**：提交前校验，不通过不发请求
- **错误反馈**：用 `VMessage.error` 或表单上方 `VAlert`
- **密码可见切换**：`VInput` 的 `show-password` 属性
- **回车提交**：`@submit.prevent` 或 `@keyup.enter`
- **记住我**：可选，存 username 到 localStorage（不存密码）

## 关键决策点（AI 必须问用户）

1. **登录方式**：账号密码 / 手机验证码 / 第三方（微信/钉钉/SSO）？
2. **是否需要注册入口**：登录页下方放注册链接？
3. **是否需要忘记密码**：跳转重置页面？
4. **是否需要验证码**：图形验证码 / 滑块？
5. **页面风格**：居中卡片 / 左右分栏 / 全屏背景？

## 产出位置

- Vue 系：`apps/<app>/src/modules/auth/views/LoginPage.vue`
- Nuxt：`apps/<nuxt>/src/pages/login.vue`

## 资源

```
login-page/
└── SKILL.md            本文件（代码骨架已内嵌）
```
