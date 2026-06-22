import { Preferences } from '@capacitor/preferences';

/**
 * 应用侧最小请求适配层。
 *
 * 模板默认保持自包含，真实项目需要共享请求能力时再通过 vup package add @vup/http 接入。
 */

export interface RequestOptions extends RequestInit {
  query?: Record<string, string | number | boolean | null | undefined>;
}

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
  return localStorage.getItem('locale') || 'en-US';
}

function buildUrl(url: string, query?: RequestOptions['query']) {
  const baseURL = import.meta.env.VITE_API_BASE || '';
  const requestUrl = new URL(baseURL + url, window.location.origin);

  Object.entries(query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      requestUrl.searchParams.set(key, String(value));
    }
  });

  return requestUrl.toString();
}

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { query, headers, ...fetchOptions } = options;
  const token = getAccessToken();
  const requestHeaders = new Headers(headers);
  requestHeaders.set('Accept-Language', getLocale());
  if (token) requestHeaders.set('Authorization', `Bearer ${token}`);

  const response = await fetch(buildUrl(url, query), {
    ...fetchOptions,
    headers: requestHeaders,
  });

  if (response.status === 401) {
    await removeAccessToken();
  }

  if (!response.ok) {
    throw new Error(response.statusText || 'Request failed');
  }

  return response.json() as Promise<T>;
}

export const isRequestCanceled = (error: unknown) =>
  error instanceof DOMException && error.name === 'AbortError';

export default Object.assign(request, {
  get: <T>(url: string, options?: RequestOptions) => request<T>(url, { ...options, method: 'GET' }),
  post: <T>(url: string, body?: unknown, options?: RequestOptions) => {
    const requestOptions: RequestOptions = {
      ...options,
      method: 'POST',
      headers: {
        ...Object.fromEntries(new Headers(options?.headers).entries()),
        'Content-Type': 'application/json',
      },
    };

    if (body !== undefined) {
      requestOptions.body = JSON.stringify(body);
    }

    return request<T>(url, requestOptions);
  },
  isCanceled: isRequestCanceled,
});
