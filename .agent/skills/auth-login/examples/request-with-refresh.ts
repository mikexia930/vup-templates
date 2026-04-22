// 范例：apps/<app>/src/api/request.ts（完整可复制形态）
//
// 适用：vue / electron / capacitor / wxt（用 @vup/http 的 stack）
// 角色：在 createHttpClient 基础上，扩展 401 自动 refresh 拦截器
//
// 这是合并了 http-client + auth-login 完整 refresh 的最终形态。
// 直接复制本文件到 apps/<app>/src/api/request.ts 即可。
//
// 关键设计：
//   - 基础适配（baseURL / token 注入 / 401 钩子）来自 @vup/http
//   - 401 自动 refresh + 并发去重 + 重放：在应用层用 axios.interceptors 扩展
//   - 不动 @vup/http 包，应用层完全可控
//
// 依赖：
//   - token-storage skill 提供 getAccessToken / setTokens / removeTokens
//   - auth-login skill 提供 useAuthStore（含 refreshTokens / logout 方法）

import type { AxiosError, AxiosRequestConfig } from 'axios';
import { createHttpClient } from '@vup/http';
import { getAccessToken, removeAccessToken } from '@/common/utils/tokenStorage';

// ============ Step 1: 创建基础实例（http-client skill） ============

const request = createHttpClient({
  baseURL: import.meta.env.VITE_API_BASE || '',
  getAccessToken,
  getLocale: () => 'en_US',
  // 401 时不在此处理（交给下面的拦截器统一管 refresh + 重放）
  // onUnauthorized 在 refresh 也失败的兜底里调用
  onResponseError: (error, message) => {
    if (request.isCanceled(error)) return;
    console.error('[request]', message);
  },
});

export const isRequestCanceled = request.isCanceled;

// ============ Step 2: 扩展 401 自动 refresh 拦截器（auth-login skill） ============

// 扩展 axios config，加内部重试标记
interface RetriableRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// 共享 refresh Promise：所有并发 401 请求等同一个新 token
let refreshingPromise: Promise<string> | null = null;

async function getOrCreateRefreshPromise(): Promise<string> {
  if (refreshingPromise) return refreshingPromise;

  // 动态 import 避免循环依赖（store 引用 request、request 引用 store）
  const { useAuthStore } = await import('@/stores/auth');
  const authStore = useAuthStore();

  refreshingPromise = authStore.refreshTokens().finally(() => {
    refreshingPromise = null;
  });

  return refreshingPromise;
}

request.instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;
    const status = error.response?.status;

    // 非 401 / 没有原始请求配置 → 不处理
    if (status !== 401 || !originalRequest) return Promise.reject(error);

    // refresh 接口本身 401 → 直接拒绝，避免无限循环
    if (originalRequest.url?.includes('/api/auth/refresh')) {
      return Promise.reject(error);
    }

    // 已经重试过的请求 → 直接拒绝
    if (originalRequest._retry) return Promise.reject(error);
    originalRequest._retry = true;

    try {
      // 等待 refresh 完成（并发请求共享同一个 Promise）
      const newAccessToken = await getOrCreateRefreshPromise();

      // 用新 token 重放原请求
      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };

      return request.instance.request(originalRequest);
    } catch (refreshError) {
      // refresh 失败 → 兜底登出（清 token，路由跳转由 auth-guard 处理）
      removeAccessToken();
      const { useAuthStore } = await import('@/stores/auth');
      await useAuthStore().logout();
      return Promise.reject(refreshError);
    }
  }
);

export default request;
