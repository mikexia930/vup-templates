import { ofetch } from 'ofetch';
import type { FetchOptions } from 'ofetch';
import type { ApiResponse } from './types';

/**
 * 说明：
 * 1. Nuxt 使用 ofetch 适配 SSR；
 * 2. 当前文件只保留应用侧适配（baseURL、token、语言、401）；
 * 3. 业务接口函数放在 src/api/<module>.ts。
 */
let requestInstance: ReturnType<typeof ofetch.create> | null = null;

function isApiResponseShape<T>(payload: unknown): payload is ApiResponse<T> {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'code' in payload &&
    typeof (payload as { code: unknown }).code === 'number'
  );
}

function createRequest() {
  const runtimeConfig = useRuntimeConfig();

  return ofetch.create({
    baseURL: runtimeConfig.public.apiBase || '/api',
    timeout: 15000,
    onRequest({ options }) {
      const accessToken = useCookie('access_token').value;
      const locale = useCookie('i18n_redirected').value || 'en-US';

      if (accessToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }

      options.headers = {
        ...options.headers,
        'Accept-Language': locale,
      };
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        useCookie('access_token').value = null;
        await navigateTo('/login');
      }
    },
  });
}

export default function request<T>(url: string, options?: FetchOptions<'json'>) {
  if (!requestInstance) requestInstance = createRequest();

  return requestInstance<ApiResponse<T> | T>(url, options).then((payload) => {
    if (!isApiResponseShape<T>(payload)) {
      throw new Error('响应结构不符合 ApiResponse 约定，请检查后端返回格式。');
    }

    if (payload.code !== 0) {
      throw new Error(payload.message || '业务请求失败');
    }

    return payload.data;
  });
}
