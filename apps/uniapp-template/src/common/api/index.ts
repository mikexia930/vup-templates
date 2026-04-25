/**
 * 应用层 HTTP 默认实例
 * 在 libs/http 抽象层之上注入业务策略：baseURL / token / 错误提示 / 401 跳转 等
 */
import { createHttpClient } from '@/libs/http';
import { getCurrentLocale } from '@/locales';

const TOKEN_STORAGE_KEY = 'token';

export const http = createHttpClient({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  timeout: 15000,

  getAccessToken: () => {
    try {
      return uni.getStorageSync(TOKEN_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  },

  getLocale: () => {
    try {
      return getCurrentLocale();
    } catch {
      return null;
    }
  },

  onUnauthorized: () => {
    try {
      uni.removeStorageSync(TOKEN_STORAGE_KEY);
    } catch {
      // ignore
    }
    // TODO: 替换为实际登录页路径
    // uni.reLaunch({ url: '/pages/login/index' });
  },

  onResponseError: (_error, message) => {
    uni.showToast({
      title: message || '请求失败',
      icon: 'none',
      duration: 2000,
    });
  },

  onBusinessError: (_error, message) => {
    uni.showToast({
      title: message || '业务异常',
      icon: 'none',
      duration: 2000,
    });
  },
});

export type { ApiResponse, HttpRequestConfig } from '@/libs/http';
export { HttpError } from '@/libs/http';
