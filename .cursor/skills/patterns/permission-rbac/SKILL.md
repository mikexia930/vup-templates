---
name: permission-rbac-pattern
description: >-
  Standard RBAC permission conventions for vup-templates apps. Use when
  implementing role-based access control, dynamic routes, menu filtering,
  permission directives, or Nest RBAC guards.
---

# 权限与 RBAC 规范

本规范定义基于角色的访问控制（RBAC）标准，覆盖前端动态路由/菜单/按钮权限和后端接口鉴权。

## 与登录的衔接

```
登录成功（token 已存储）
  → 调用 GET /api/auth/permissions
  → 返回 { roles, permissions, menus }
  → usePermissionStore 缓存数据
  → 动态注册路由（addRoute）
  → 渲染侧边栏菜单
```

## 数据结构

### 后端返回

```typescript
interface PermissionData {
  roles: string[]; // 角色码，如 ['admin', 'editor']
  permissions: string[]; // 权限码，如 ['user:create', 'user:delete']
  menus: MenuItem[]; // 菜单树
}

interface MenuItem {
  id: number;
  parentId: number | null;
  name: string; // 路由 name
  path: string; // 路由 path
  component: string; // 组件路径，如 'views/user/index'
  icon?: string;
  sort: number;
  hidden?: boolean; // 是否在菜单中隐藏
  children?: MenuItem[];
}
```

### 前端路由 meta

```typescript
interface RouteMeta {
  title: string; // 页面标题 / 菜单文字
  icon?: string;
  requiresAuth?: boolean; // 是否需要登录
  roles?: string[]; // 允许访问的角色（空 = 不限）
  permissions?: string[]; // 允许访问的权限码（空 = 不限）
  hidden?: boolean; // 菜单中隐藏
}
```

## Permission Store

```typescript
// src/stores/permission.ts
export const usePermissionStore = defineStore('permission', () => {
  const roles = ref<string[]>([]);
  const permissions = ref<string[]>([]);
  const menus = ref<MenuItem[]>([]);
  const dynamicRoutes = ref<RouteRecordRaw[]>([]);

  async function fetchPermissions() {
    const res = await authApi.getPermissions();
    roles.value = res.data.roles;
    permissions.value = res.data.permissions;
    menus.value = res.data.menus;
    dynamicRoutes.value = generateRoutes(res.data.menus);
    dynamicRoutes.value.forEach((route) => router.addRoute(route));
  }

  function hasPermission(code: string): boolean {
    return permissions.value.includes(code);
  }

  function hasRole(role: string): boolean {
    return roles.value.includes(role);
  }

  function reset() {
    roles.value = [];
    permissions.value = [];
    menus.value = [];
    dynamicRoutes.value.forEach((route) => {
      if (route.name) router.removeRoute(route.name);
    });
    dynamicRoutes.value = [];
  }

  return {
    roles,
    permissions,
    menus,
    dynamicRoutes,
    fetchPermissions,
    hasPermission,
    hasRole,
    reset,
  };
});
```

## 动态路由生成

将后端菜单树转为 Vue Router 路由：

```typescript
// src/router/generateRoutes.ts
const viewModules = import.meta.glob('@/views/**/*.vue');

function generateRoutes(menus: MenuItem[]): RouteRecordRaw[] {
  return menus.map((menu) => {
    const route: RouteRecordRaw = {
      path: menu.path,
      name: menu.name,
      component: viewModules[`/src/${menu.component}.vue`],
      meta: { title: menu.name, icon: menu.icon, hidden: menu.hidden },
      children: menu.children ? generateRoutes(menu.children) : undefined,
    };
    return route;
  });
}
```

## 按钮级权限指令

```typescript
// src/directives/permission.ts
const vPermission: Directive = {
  mounted(el, binding) {
    const { hasPermission } = usePermissionStore();
    const codes = Array.isArray(binding.value)
      ? binding.value
      : [binding.value];
    if (!codes.some((code) => hasPermission(code))) {
      el.parentNode?.removeChild(el);
    }
  },
};
```

使用方式：

```html
<el-button v-permission="'user:delete'">删除</el-button>
<el-button v-permission="['user:create', 'user:edit']">编辑</el-button>
```

## 路由守卫（扩展 auth-login 的守卫）

```typescript
router.beforeEach(async (to, from, next) => {
  const hasToken = !!tokenStorage.getToken();
  const permissionStore = usePermissionStore();

  if (to.meta.requiresAuth && !hasToken) {
    return next({ path: '/login', query: { redirect: to.fullPath } });
  }

  if (hasToken && permissionStore.dynamicRoutes.length === 0) {
    await permissionStore.fetchPermissions();
    return next({ ...to, replace: true });
  }

  next();
});
```

## 后端（Nest）

### Roles Guard

```typescript
// src/auth/guards/roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!requiredRoles) return true;
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
```

### Roles 装饰器

```typescript
@Roles('admin')
@Get('users')
findAll() { ... }
```

## 注意事项

- 登出时必须调用 `permissionStore.reset()` 清除动态路由，避免角色切换后残留
- 刷新页面时 store 丢失，路由守卫中通过 `dynamicRoutes.length === 0`
  判断并重新拉取
- menus 的 `component` 字段存的是相对路径（如
  `modules/user/views/index`），前端用 `import.meta.glob` 动态映射
