---
name: admin-layout-pattern
description: >-
  Standard admin panel layout pattern with sidebar, header, and content area.
  Use when building management dashboards, admin panels, CMS, or any app that
  needs sidebar navigation with top header.
---

# 后台布局规范

定义管理后台的标准布局结构：侧边栏导航 + 顶栏 + 内容区。适用于 Vue
SPA 和 Nuxt 应用。

## 布局结构

```
┌─────────────────────────────────────────────┐
│  VHeader（顶栏）                              │
│  ┌──────┐  面包屑 / 页面标题    用户头像 退出  │
│  │折叠按钮│                                   │
├──┴──────┬──────────────────────────────────┤
│          │                                  │
│  VAside  │  VMain（内容区）                  │
│ （侧边栏）│                                  │
│          │  <router-view />                 │
│  VMenu   │                                  │
│          │                                  │
│          │                                  │
└──────────┴──────────────────────────────────┘
```

## 文件位置

```
src/
├── layouts/
│   └── AdminLayout.vue            # 布局主组件
├── shared/
│   └── components/
│       └── layout/
│           ├── AppSidebar.vue     # 侧边栏（VMenu + 菜单渲染）
│           ├── AppHeader.vue      # 顶栏（折叠按钮 + 面包屑 + 用户信息）
│           └── AppBreadcrumb.vue  # 面包屑
```

## AdminLayout.vue

```vue
<template>
  <VContainer class="h-screen">
    <VAside :width="isCollapsed ? '64px' : '220px'" class="transition-all">
      <AppSidebar :collapsed="isCollapsed" :menus="permissionStore.menus" />
    </VAside>
    <VContainer>
      <VHeader class="flex h-14 items-center justify-between border-b px-4">
        <div class="flex items-center gap-2">
          <VButton
            :icon="isCollapsed ? Expand : Fold"
            text
            @click="isCollapsed = !isCollapsed"
          />
          <AppBreadcrumb />
        </div>
        <div class="flex items-center gap-4">
          <span>{{ authStore.user?.name }}</span>
          <VButton text @click="handleLogout">退出</VButton>
        </div>
      </VHeader>
      <VMain class="overflow-auto p-4">
        <router-view />
      </VMain>
    </VContainer>
  </VContainer>
</template>

<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue';
import AppSidebar from '@/shared/components/layout/AppSidebar.vue';
import AppBreadcrumb from '@/shared/components/layout/AppBreadcrumb.vue';

const isCollapsed = ref(false);
const authStore = useAuthStore();
const permissionStore = usePermissionStore();

function handleLogout() {
  authStore.logout();
  permissionStore.reset();
}
</script>
```

## AppSidebar.vue

```vue
<template>
  <div class="flex h-full flex-col bg-gray-900">
    <div class="flex h-14 items-center justify-center font-bold text-white">
      <span v-if="!collapsed">应用名称</span>
      <span v-else>Logo</span>
    </div>
    <VMenu
      :default-active="route.path"
      :collapse="collapsed"
      router
      background-color="#1f2937"
      text-color="#d1d5db"
      active-text-color="#60a5fa"
      class="flex-1 border-r-0"
    >
      <template v-for="menu in menus" :key="menu.id">
        <VSubMenu v-if="menu.children?.length" :index="menu.path">
          <template #title>
            <VIcon v-if="menu.icon"><component :is="menu.icon" /></VIcon>
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
        <VMenuItem v-else :index="menu.path">
          <VIcon v-if="menu.icon"><component :is="menu.icon" /></VIcon>
          <span>{{ menu.name }}</span>
        </VMenuItem>
      </template>
    </VMenu>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
defineProps<{ collapsed: boolean; menus: MenuItem[] }>();
</script>
```

## 路由配置

布局组件作为路由的父级 wrapper：

```typescript
// src/router/routes.ts
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/modules/auth/views/login.vue'),
  },
  {
    path: '/',
    component: () => import('@/layouts/AdminLayout.vue'),
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      // 静态路由（所有角色可见）
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/modules/dashboard/views/index.vue'),
        meta: { title: '首页' },
      },
      // 动态路由由 permission store 通过 addRoute 注入到此处
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/shared/components/Error404.vue'),
  },
];
```

## Nuxt 差异

Nuxt 使用 `layouts/` 目录约定替代手动路由嵌套：

```vue
<!-- src/layouts/admin.vue -->
<template>
  <!-- 与 AdminLayout.vue 结构相同，router-view 改为 slot -->
  <VContainer class="h-screen">
    <VAside ...>...</VAside>
    <VContainer>
      <VHeader ...>...</VHeader>
      <VMain class="overflow-auto p-4">
        <slot />
      </VMain>
    </VContainer>
  </VContainer>
</template>
```

页面中指定布局：

```vue
<script setup>
definePageMeta({ layout: 'admin' });
</script>
```

## 注意事项

- 侧边栏菜单数据来自 `usePermissionStore().menus`（参考
  `patterns/permission-rbac`）
- `VMenu` 设置 `router` 属性后，`index` 值即为路由 path，点击自动跳转
- 折叠状态可持久化到 localStorage，避免刷新丢失
- 移动端适配时可将侧边栏改为 `VDrawer` 抽屉模式
