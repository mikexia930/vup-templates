// 范例：apps/<app>/src/modules/user/api/user.ts
//
// 模块接口的标准写法。每个模块在自己的 api/ 目录导出具名函数。
// AI 使用：参考结构与命名风格，实际接口路径/字段按 docs/api/openapi.yaml。

import request from '@/api/request';

// 模块内类型（如简单可放这里，复杂可独立 types.ts）
export interface UserInfo {
  id: number;
  name: string;
  avatar: string;
}

export interface UserListQuery {
  username?: string;
  status?: number;
  page: number;
  size: number;
}

export interface UserListResult {
  list: UserInfo[];
  total: number;
}

// ============================================================
// 查询类：默认 takeLatest，搜索/筛选高频场景显式传 cancelKey
// ============================================================

export function getUserList(params: UserListQuery) {
  return request.get<UserListResult>('/api/users', {
    params,
    // 推荐显式传 cancelKey，语义清晰
    cancelKey: 'user:list:search',
    // 同模块多请求批量取消
    cancelScope: 'user:list',
  });
}

export function getUserInfo(id: number) {
  return request.get<UserInfo>(`/api/users/${id}`);
}

// ============================================================
// 写操作：默认 parallel，避免误取消
// ============================================================

export function createUser(data: Omit<UserInfo, 'id'>) {
  return request.post<null>('/api/users', data);
}

export function updateUser(id: number, data: Partial<UserInfo>) {
  return request.put<null>(`/api/users/${id}`, data);
}

export function deleteUser(id: number) {
  return request.delete<null>(`/api/users/${id}`);
}
