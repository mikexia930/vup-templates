---
name: nuxt-app
description: >-
  Guide for developing web applications using nuxt-template (Nuxt 4 SSR). Use
  when creating SSR websites, SEO-required apps, or working in
  apps/nuxt-template, or when user mentions Nuxt, SSR, server-side rendering, or
  SEO.
---

# Nuxt App 开发指南

基于
`apps/nuxt-template`，适用于需要 SSR/SEO 的 Web 应用、营销官网、内容站等。使用 Nuxt
4 + 文件系统路由。

## 快速开始

```bash
vup add my-website

# 选择 nuxt 模板，完成后
pnpm install
pnpm --filter my-website dev       # 默认端口 9303
```

## 目录结构

```
apps/my-website/
├── src/
│   ├── app.vue                    # 根组件
│   ├── pages/                     # 文件系统路由
│   │   ├── index.vue              # /
│   │   ├── login.vue              # /login（需自建）
│   │   └── dashboard/
│   │       └── index.vue          # /dashboard
│   ├── components/                # 自动导入组件
│   ├── composables/               # 自动导入组合函数
│   ├── stores/                    # Pinia store
│   ├── api/
│   │   ├── request.ts             # ofetch 封装
│   │   ├── types.ts
│   │   └── modules/
│   ├── utils/
│   │   └── tokenStorage.ts        # Token 存储（useCookie）
│   ├── middleware/                 # 路由中间件
│   ├── server/                    # Nitro 服务端 API（可选）
│   ├── types/                     # 自动导入的类型目录
│   ├── locales/                   # i18n 语言包（JSON）
│   └── assets/
├── nuxt.config.ts
└── package.json
```

## 与 Vue SPA 的关键差异

| 方面        | vue-template         | nuxt-template                      |
| ----------- | -------------------- | ---------------------------------- |
| 路由        | 手动定义 `routes.ts` | 文件系统路由（`pages/`）           |
| HTTP 客户端 | axios                | **ofetch** / `useFetch` / `$fetch` |
| Token 存储  | localStorage         | **useCookie**（SSR 可读）          |
| 组件注册    | 手动 import          | `components/` 自动导入             |
| 中间件      | `router.beforeEach`  | `middleware/` 文件                 |
| i18n        | `vue-i18n` 手动配置  | `@nuxtjs/i18n` 模块                |

## 平台特定实现

### HTTP 客户端：ofetch

参考 `patterns/api-layer`，本 app 使用 ofetch：

```typescript
// src/api/request.ts
import { ofetch } from 'ofetch';

const request = ofetch.create({
  baseURL: useRuntimeConfig().public.apiBase || '',
  timeout: 15000,
  onRequest({ options }) {
    const token = useCookie('access_token').value;
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  },
  onResponseError({ response }) {
    if (response.status === 401) {
      useCookie('access_token').value = null;
      navigateTo('/login');
    }
  },
});

export default request;
```

在页面/组件中也可直接用 Nuxt 内置的 `useFetch` / `$fetch`：

- `useFetch`：自动处理 SSR 数据序列化，适合页面级数据加载
- `$fetch`：适合事件触发的请求（表单提交、按钮操作等）

### Token 存储：useCookie

SSR 场景下 localStorage 在服务端不可用，使用 `useCookie` 代替：

```typescript
// src/utils/tokenStorage.ts
export const tokenStorage = {
  getToken: () => useCookie('access_token').value,
  setToken: (token: string) => {
    useCookie('access_token').value = token;
  },
  removeToken: () => {
    useCookie('access_token').value = null;
  },
  getRefreshToken: () => useCookie('refresh_token').value,
  setRefreshToken: (token: string) => {
    useCookie('refresh_token').value = token;
  },
  removeRefreshToken: () => {
    useCookie('refresh_token').value = null;
  },
};
```

### 路由中间件（替代 beforeEach）

```typescript
// src/middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('access_token');
  if (!token.value) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } });
  }
});
```

在页面中使用：

```vue
<script setup>
definePageMeta({ middleware: 'auth' });
</script>
```

### 开发代理

已在 `nuxt.config.ts` 中预置，通过环境变量配置：

```bash
# .env.development
NUXT_PUBLIC_API_BASE=http://localhost:3000
```

`vite.server.proxy` 和 `nitro.devProxy` 都会将 `/api` 转发到该地址。

## i18n

使用 `@nuxtjs/i18n` 模块，语言包为 JSON 格式放在 `src/locales/`：

- 默认语言：`en-US`
- 路由策略：`prefix_except_default`（默认语言无前缀，其他语言 `/zh-CN/page`）

## 构建与部署

```bash
pnpm --filter my-website build     # SSR 构建
pnpm --filter my-website generate  # 静态生成（SSG）
pnpm --filter my-website preview   # 预览构建产物
```

Nuxt 构建产物在 `.output/` 目录，可通过 Node 服务或 Vercel/Netlify 部署。
