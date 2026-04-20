import { createHttpClient } from '@vup/http';
import { Preferences } from '@capacitor/preferences';

/**
 * 说明：
 * 1. 共享能力（axios 实例工厂、通用拦截器）放在 @vup/http 包里；
 * 2. 当前文件保留应用侧适配逻辑（环境变量、token、语言、401 行为）；
 * 3. 业务接口函数继续放在 modules/<name>/api 下，不在这里堆业务细节；
 * 4. token 使用 @capacitor/preferences 持久化（移动端必须，避免被系统清理 localStorage）。
 */

// 内存缓存：让同步的 getAccessToken() 接口能立刻返回
// 由 syncTokenFromStorage（启动时）和 setAccessToken（登录时）维护
let cachedToken: string | null = null;

// 启动时调用一次，把持久化的 token 加载到内存
export async function syncTokenFromStorage() {
  const { value } = await Preferences.get({ key: 'access_token' });
  cachedToken = value;
}

// 登录成功后调用，同步内存 + 持久化
export async function setAccessToken(token: string) {
  cachedToken = token;
  await Preferences.set({ key: 'access_token', value: token });
}

// 登出 / 401 时调用，清理内存 + 持久化
export async function removeAccessToken() {
  cachedToken = null;
  await Preferences.remove({ key: 'access_token' });
}

function getAccessToken() {
  return cachedToken;
}

function getLocale() {
  return localStorage.getItem('locale') || 'en_US';
}

const request = createHttpClient({
  baseURL: import.meta.env.VITE_API_BASE || '',
  getAccessToken,
  getLocale,
  onResponseError: (_error, message) => {
    if (request.isCanceled(_error)) return;
    console.error('[request]', message);
  },
  onUnauthorized: () => {
    void removeAccessToken();
  },
});

export const isRequestCanceled = request.isCanceled;

export default request;
