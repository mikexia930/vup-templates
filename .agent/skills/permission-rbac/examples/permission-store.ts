// 范例：apps/<app>/src/stores/permission.ts
//
// 适用：vue / electron / capacitor 共用
// 角色：全局 permission store（管角色 / 权限码 / 菜单 / 动态路由）
//
// 关键设计：
//   - 登录成功后由 auth-store 调用 fetchPermissions()
//   - 登出时必须调 reset() 清除动态路由（避免角色切换残留）
//   - 刷新页面 store 丢失，由路由守卫检测并重新拉取

import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { useRouter } from 'vue-router';
import { fetchPermissions as fetchPermissionsApi } from '@/modules/auth/api/permission';
import { generateRoutes } from '@/router/generateRoutes';
import type { MenuItem } from '@/modules/auth/api/permission';

export const usePermissionStore = defineStore('permission', () => {
  const router = useRouter();

  const roles = ref<string[]>([]);
  const permissions = ref<string[]>([]);
  const menus = ref<MenuItem[]>([]);
  const dynamicRoutes = ref<RouteRecordRaw[]>([]);

  // 登录成功后调用：拉取权限 + 注册动态路由
  async function fetchPermissions() {
    const data = await fetchPermissionsApi();
    roles.value = data.roles;
    permissions.value = data.permissions;
    menus.value = data.menus;

    const routes = generateRoutes(data.menus);
    routes.forEach((route) => router.addRoute(route));
    dynamicRoutes.value = routes;
  }

  function hasPermission(code: string): boolean {
    return permissions.value.includes(code);
  }

  function hasRole(role: string): boolean {
    return roles.value.includes(role);
  }

  // 登出时调用：清除动态路由 + 重置状态
  function reset() {
    dynamicRoutes.value.forEach((route) => {
      if (route.name) router.removeRoute(route.name);
    });
    roles.value = [];
    permissions.value = [];
    menus.value = [];
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
