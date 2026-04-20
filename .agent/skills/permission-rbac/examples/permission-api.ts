// 范例：apps/<app>/src/modules/auth/api/permission.ts
//
// 权限接口：登录成功后拉取角色 / 权限码 / 菜单树

import request from '@/api/request';

export interface MenuItem {
  id: number;
  parentId: number | null;
  name: string; // 路由 name
  path: string; // 路由 path
  component: string; // 组件路径：'modules/user/views/index'
  icon?: string;
  sort: number;
  hidden?: boolean;
  children?: MenuItem[];
}

export interface PermissionData {
  roles: string[]; // 角色码：['admin', 'editor']
  permissions: string[]; // 权限码：['user:create', 'user:delete']
  menus: MenuItem[]; // 菜单树
}

export async function fetchPermissions() {
  return request.get<PermissionData>('/api/auth/permissions');
}
