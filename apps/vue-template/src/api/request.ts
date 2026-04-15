import { createHttpClient } from '@vup/http';

/**
 * 说明：
 * 1. 共享能力（axios 实例工厂、通用拦截器）放在 @vup/http 包里；
 * 2. 当前文件保留应用侧适配逻辑（环境变量、token、语言、401 行为）；
 * 3. 业务接口函数继续放在 modules/<name>/api 下，不在这里堆业务细节。
 */

function getAccessToken() {
  return localStorage.getItem('access_token');
}

function getLocale() {
  return localStorage.getItem('locale') || 'en_US';
}

const request = createHttpClient({
  baseURL: import.meta.env.VITE_API_BASE || '',
  getAccessToken,
  getLocale,
  // 这里保留为“最小默认行为”，业务项目可按需替换为路由跳转或消息提示。
  // 主动取消请求属于可控行为，不应当被当作异常噪声提示给用户。
  onResponseError: (_error, message) => {
    if (request.isCanceled(_error)) return;
    console.error('[request]', message);
  },
  onUnauthorized: () => {
    localStorage.removeItem('access_token');
  },
});

export const isRequestCanceled = request.isCanceled;

export default request;
