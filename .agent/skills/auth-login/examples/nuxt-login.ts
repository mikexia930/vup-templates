// 范例：apps/<nuxt-app>/composables/useAuth.ts
//
// 适用：nuxt（SSR + cookie + ofetch）
// 角色：登录 / 登出 / refresh 流程
//
// 与 vue 系的区别：
//   - token 存 cookie（详见 token-storage skill 的 nuxt.ts）
//   - HTTP 用 ofetch，不是 @vup/http（详见 nuxt-app stack skill）
//   - refresh 拦截器在 ofetch 的 onResponseError 中实现
//   - 路由跳转用 navigateTo，不是 vue-router
//
// AI 注意：
//   - 必须在 setup / composable / plugin 中调用 useCookie
//   - SSR 环境下 useCookie 同时管理服务端 + 客户端

import type { ApiResponse } from '~/api/types';

export interface UserInfo {
  id: number;
  username: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

// 共享 refresh Promise（与 vue 方案同样的并发去重思路）
let refreshingPromise: Promise<string> | null = null;

export function useAuth() {
  const accessToken = useCookie<string | null>('access_token');
  const refreshToken = useCookie<string | null>('refresh_token');
  const userInfo = useState<UserInfo | null>('userInfo', () => null);
  const isLoggedIn = computed(() => !!accessToken.value);

  async function login(username: string, password: string) {
    const res = await $fetch<ApiResponse<LoginResponse>>('/api/auth/login', {
      method: 'POST',
      body: { username, password },
    });

    if (res.code !== 0 || !res.data) {
      throw new Error(res.message || '登录失败');
    }

    accessToken.value = res.data.accessToken;
    refreshToken.value = res.data.refreshToken;
    await fetchUserInfo();
  }

  async function logout() {
    try {
      if (accessToken.value) {
        await $fetch('/api/auth/logout', { method: 'POST' });
      }
    } catch {
      // 静默：前端清理优先
    }
    accessToken.value = null;
    refreshToken.value = null;
    userInfo.value = null;
    if (process.client) await navigateTo('/login');
  }

  async function fetchUserInfo() {
    const res = await $fetch<ApiResponse<UserInfo>>('/api/auth/me');
    if (res.code === 0 && res.data) {
      userInfo.value = res.data;
    }
  }

  async function refreshTokens(): Promise<string> {
    if (refreshingPromise) return refreshingPromise;

    refreshingPromise = (async () => {
      const res = await $fetch<ApiResponse<LoginResponse>>('/api/auth/refresh', {
        method: 'POST',
        body: { refreshToken: refreshToken.value },
      });

      if (res.code !== 0 || !res.data) {
        throw new Error('refresh failed');
      }

      accessToken.value = res.data.accessToken;
      refreshToken.value = res.data.refreshToken;
      return res.data.accessToken;
    })().finally(() => {
      refreshingPromise = null;
    });

    return refreshingPromise;
  }

  return { userInfo, isLoggedIn, login, logout, fetchUserInfo, refreshTokens };
}

// ============ refresh 拦截器（在 src/api/request.ts 的 ofetch 创建后追加） ============
//
// 在 ofetch.create 的 onResponseError 中处理：
//
// async onResponseError({ request, response, options }) {
//   if (response.status !== 401) return;
//
//   const url = typeof request === 'string' ? request : request.url;
//   if (url.includes('/api/auth/refresh')) return;  // 防无限循环
//
//   const auth = useAuth();
//   try {
//     const newToken = await auth.refreshTokens();
//     // ofetch 没有原生重放，需要由调用方重新发起；或抛特定错误让上层重试
//     options.headers = { ...options.headers, Authorization: `Bearer ${newToken}` };
//     return ofetch(url, options);
//   } catch {
//     await auth.logout();
//   }
// }
