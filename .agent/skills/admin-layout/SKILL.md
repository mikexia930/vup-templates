---
name: admin-layout
description: >-
  Use when implementing a backend admin layout (sidebar menu + topbar + content
  area). Covers layout structure, menu rendering from permission store, sidebar
  collapse, breadcrumb, user dropdown. Orchestrates permission-rbac skill (menu
  data) and vup-ui skill (layout components).
---

# admin-layout

后台管理布局模式。**侧边栏菜单 + 顶栏 + 内容区**。

## 适用场景

- 后台管理系统（用户管理 / 订单管理 / Dashboard）
- vue / electron 最常用

## 何时被加载

- new-project Phase 7 搭建后台框架
- new-feature 调整后台布局

## 引用的 skills

| 能力     | 加载哪个 skill                                                |
| -------- | ------------------------------------------------------------- |
| 菜单数据 | `permission-rbac`（usePermissionStore.menus）                 |
| UI 组件  | `vup-ui`（VContainer / VAside / VHeader / VMain / VMenu ...） |
| 路由守卫 | `auth-guard`（未登录跳登录页）                                |
| 用户信息 | `auth-login`（useAuthStore.userInfo）                         |

## 页面组成

```
┌──────┬──────────────────────────────────┐
│      │  顶栏 (VHeader)                  │
│  侧  │  [≡折叠] [面包屑]    [用户头像▼] │
│  边  ├──────────────────────────────────┤
│  栏  │                                  │
│      │  内容区 (VMain)                  │
│ (V   │                                  │
│  A   │  <RouterView />                  │
│  s   │                                  │
│  i   │                                  │
│  d   │                                  │
│  e)  │                                  │
│      │                                  │
└──────┴──────────────────────────────────┘
```

## 文件结构

```
src/layouts/
├── AdminLayout.vue               主布局
├── components/
│   ├── LayoutSidebar.vue         侧边栏（菜单渲染）
│   ├── LayoutTopbar.vue          顶栏（折叠按钮 + 面包屑 + 用户）
│   └── LayoutUserDropdown.vue    用户下拉菜单
```

## 实现步骤

### Step 1：创建 AdminLayout.vue

```vue
<template>
  <VContainer class="h-screen">
    <VAside :width="isCollapsed ? '64px' : '220px'" class="transition-all">
      <LayoutSidebar :collapsed="isCollapsed" />
    </VAside>
    <VContainer>
      <VHeader class="flex h-14 items-center border-b px-4">
        <LayoutTopbar v-model:collapsed="isCollapsed" />
      </VHeader>
      <VMain class="overflow-auto p-4">
        <RouterView />
      </VMain>
    </VContainer>
  </VContainer>
</template>

<script setup lang="ts">
const isCollapsed = ref(false);
</script>
```

### Step 2：侧边栏菜单（LayoutSidebar.vue）

```vue
<template>
  <div class="flex h-full flex-col">
    <!-- Logo -->
    <div class="flex h-14 items-center justify-center border-b">
      <span v-if="!collapsed" class="text-lg font-bold">{{ appName }}</span>
      <VIcon v-else name="logo" />
    </div>

    <!-- 菜单 -->
    <VMenu
      :collapse="collapsed"
      :default-active="route.path"
      router
      class="flex-1 border-r-0"
    >
      <template v-for="menu in menus" :key="menu.id">
        <!-- 有子菜单 -->
        <VSubMenu v-if="menu.children?.length" :index="menu.path">
          <template #title>
            <VIcon v-if="menu.icon" :name="menu.icon" />
            <span>{{ menu.name }}</span>
          </template>
          <VMenuItem
            v-for="child in menu.children"
            :key="child.id"
            :index="child.path"
          >
            {{ child.name }}
          </VMenuItem>
        </VSubMenu>

        <!-- 无子菜单 -->
        <VMenuItem v-else :index="menu.path">
          <VIcon v-if="menu.icon" :name="menu.icon" />
          <span>{{ menu.name }}</span>
        </VMenuItem>
      </template>
    </VMenu>
  </div>
</template>

<script setup lang="ts">
import { usePermissionStore } from '@/stores/permission';

defineProps<{ collapsed: boolean }>();

const route = useRoute();
const permissionStore = usePermissionStore();
const menus = computed(() => permissionStore.menus.filter((m) => !m.hidden));
</script>
```

### Step 3：顶栏（LayoutTopbar.vue）

```vue
<template>
  <div class="flex w-full items-center justify-between">
    <div class="flex items-center gap-4">
      <!-- 折叠按钮 -->
      <VButton text @click="emit('update:collapsed', !collapsed)">
        <VIcon :name="collapsed ? 'Expand' : 'Fold'" />
      </VButton>

      <!-- 面包屑 -->
      <VBreadcrumb>
        <VBreadcrumbItem
          v-for="item in breadcrumbs"
          :key="item.path"
          :to="item.path"
        >
          {{ item.meta?.title || item.name }}
        </VBreadcrumbItem>
      </VBreadcrumb>
    </div>

    <!-- 右侧：用户下拉 -->
    <LayoutUserDropdown />
  </div>
</template>

<script setup lang="ts">
defineProps<{ collapsed: boolean }>();
const emit = defineEmits<{ 'update:collapsed': [value: boolean] }>();

const route = useRoute();
const breadcrumbs = computed(() => route.matched.filter((r) => r.meta?.title));
</script>
```

### Step 4：用户下拉（LayoutUserDropdown.vue）

```vue
<template>
  <VDropdown>
    <div class="flex cursor-pointer items-center gap-2">
      <VAvatar :size="32">{{ userInfo?.username?.[0] }}</VAvatar>
      <span>{{ userInfo?.username }}</span>
    </div>
    <template #dropdown>
      <VDropdownMenu>
        <VDropdownItem @click="handleLogout">退出登录</VDropdownItem>
      </VDropdownMenu>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const userInfo = computed(() => authStore.userInfo);

async function handleLogout() {
  await authStore.logout();
}
</script>
```

### Step 5：注册路由

```typescript
// router/routes.ts
{
  path: '/',
  component: () => import('@/layouts/AdminLayout.vue'),
  children: [
    // 静态子路由
    { path: '', redirect: '/dashboard' },
    { path: 'dashboard', component: () => import('@/modules/dashboard/views/DashboardPage.vue') },
    // 动态子路由由 permission-rbac 的 addRoute 注入
  ],
}
```

## 关键决策点（AI 必须问用户）

1. **布局风格**：左侧侧边栏（最常见） / 顶部导航 / 混合？
2. **菜单来源**：后端动态菜单（permission-rbac）还是前端静态配置？
3. **是否需要多级菜单**：一级 / 两级 / 三级？
4. **是否需要面包屑**：面包屑导航？
5. **是否需要标签页导航**：多 Tab 页签（keep-alive）？
6. **顶栏右侧**：用户头像 / 全屏按钮 / 主题切换 / 通知铃铛？

## 产出位置

- 布局：`apps/<app>/src/layouts/AdminLayout.vue`
- 布局子组件：`apps/<app>/src/layouts/components/`
- 路由配置：`apps/<app>/src/router/routes.ts`

## 资源

```
admin-layout/
└── SKILL.md            本文件（代码骨架已内嵌）
```
