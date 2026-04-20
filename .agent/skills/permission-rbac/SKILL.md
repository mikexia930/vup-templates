---
name: permission-rbac
description: >-
  Use when implementing role-based access control (RBAC) in frontend apps.
  Covers permission store, dynamic route generation from backend menu tree,
  button-level v-permission directive, and permission API. Works with auth-login
  skill (login triggers permission fetch) and auth-guard skill (route guard
  extended with permission check). Backend RBAC guards belong to nest-api stack
  skill.
---

# permission-rbac

前端 RBAC 权限控制。**覆盖动态路由、菜单过滤、按钮权限**。

## 适用范围

- vue / electron / capacitor：完整方案（动态路由 + 菜单 + 按钮权限）
- nuxt：部分适用（菜单/按钮权限可用，动态路由需用 Nuxt middleware 适配）
- wxt / uniapp：按钮权限可用，路由方案不同

## 不在本 skill 范围

- 后端 Nest RolesGuard / Roles 装饰器 → `nest-api` stack skill
- 路由守卫基础逻辑（未登录跳登录）→ `auth-guard` skill
- 登录请求 / token 操作 → `auth-login` skill

## 何时被加载

- 实现后台管理系统的权限功能
- new-project Phase 7 涉及角色 / 菜单 / 按钮权限

## 与登录的衔接流程

```
登录成功（auth-login skill 完成 token 写入）
  ↓
调用 GET /api/auth/permissions
  ↓
返回 { roles, permissions, menus }
  ↓
usePermissionStore 缓存数据
  ↓
generateRoutes(menus) → router.addRoute()
  ↓
渲染侧边栏菜单
```

## 数据结构

### 后端返回（标准约定）

如后端字段与此不同，必须停下问用户：

```typescript
interface PermissionData {
  roles: string[]; // 角色码：['admin', 'editor']
  permissions: string[]; // 权限码：['user:create', 'user:delete']
  menus: MenuItem[]; // 菜单树
}

interface MenuItem {
  id: number;
  parentId: number | null;
  name: string; // 路由 name
  path: string; // 路由 path
  component: string; // 组件路径：'modules/user/views/index'
  icon?: string;
  sort: number;
  hidden?: boolean; // 是否在菜单中隐藏
  children?: MenuItem[];
}
```

### 前端路由 meta 扩展

```typescript
interface RouteMeta {
  title: string;
  icon?: string;
  requiresAuth?: boolean; // 是否需要登录
  roles?: string[]; // 允许的角色（空 = 不限）
  permissions?: string[]; // 允许的权限码（空 = 不限）
  hidden?: boolean; // 菜单中隐藏
}
```

## 实现步骤

### Step 1：权限 API

在 `src/modules/auth/api/permission.ts` 实现权限拉取接口。参考
`examples/permission-api.ts`。

### Step 2：Permission Store

在 `src/stores/permission.ts`（全局 store）实现权限状态管理。参考
`examples/permission-store.ts`。

关键点：

- `fetchPermissions()`：拉取并缓存 roles / permissions / menus
- `hasPermission(code)`：判断是否有某权限码
- `hasRole(role)`：判断是否有某角色
- `reset()`：登出时清除动态路由 + 重置状态

### Step 3：动态路由生成

将后端菜单树转为 vue-router 路由。参考 `examples/generate-routes.ts`。

关键点：

- 用 `import.meta.glob` 动态映射组件
- 递归处理 children

### Step 4：按钮级权限指令

注册 `v-permission` 指令，在 mounted 时判断权限，无权限则移除元素。参考
`examples/v-permission.ts`。

### Step 5：扩展路由守卫

在 `auth-guard` skill 的路由守卫中扩展权限判断：

```typescript
// 在 auth-guard 的 beforeEach 中追加：
if (hasToken && permissionStore.dynamicRoutes.length === 0) {
  await permissionStore.fetchPermissions();
  return next({ ...to, replace: true }); // 重新匹配（动态路由刚注册）
}
```

## 注意事项

- **登出必须调 `permissionStore.reset()`**：清除动态路由，避免角色切换后残留
- **刷新页面 store 丢失**：路由守卫通过 `dynamicRoutes.length === 0`
  判断并重新拉取
- **menus 的 component 字段**：存相对路径（如
  `modules/user/views/index`），前端用 `import.meta.glob` 动态映射

## 关键决策点（AI 必须问用户）

1. **权限粒度**：
   - A. 简单角色（admin / user，不做权限码）
   - B. RBAC（角色 + 权限码 + 菜单）
   - C. ABAC（基于属性，更灵活）推荐 B（适合中后台）
2. **菜单来源**：后端返回完整菜单树，还是前端静态定义 + 后端只返回角色？
3. **按钮权限方式**：`v-permission` 指令（移除 DOM） vs
   `v-if="hasPermission('xxx')"`（隐藏）？
4. **权限码命名风格**：`模块:操作`（如 `user:create`）？还是其他？

## 产出位置

- 权限 API：`apps/<app>/src/modules/auth/api/permission.ts`
- Permission Store：`apps/<app>/src/stores/permission.ts`（全局 store）
- 动态路由生成：`apps/<app>/src/router/generateRoutes.ts`
- 权限指令：`apps/<app>/src/directives/permission.ts`

## 引用关系

本 skill 引用：

- `auth-login` skill — 登录成功后触发 `fetchPermissions`
- `auth-guard` skill — 路由守卫中扩展权限判断
- `token-storage` skill — 判断登录态

本 skill 被引用：

- `admin-layout` pattern — 侧边栏菜单渲染
- `crud-page` pattern — 按钮权限控制

## 资源

```
permission-rbac/
├── SKILL.md
└── examples/
    ├── permission-store.ts       usePermissionStore
    ├── generate-routes.ts        菜单树 → vue-router 路由
    ├── v-permission.ts           按钮级权限指令
    └── permission-api.ts         权限接口
```
