import axios from 'axios';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export interface ApiResponse<T = unknown> {
  code: number;
  data?: T;
  message?: string | null;
}

export interface CreateHttpClientOptions {
  /**
   * 基础地址，通常来自应用环境变量（如 VITE_API_BASE）。
   */
  baseURL?: string;
  /**
   * 请求超时，默认 15000ms。
   */
  timeout?: number;
  /**
   * 获取 token 的回调。返回值会自动注入 Authorization 请求头。
   */
  getAccessToken?: () => string | null | undefined;
  /**
   * 获取当前语言的回调。返回值会自动注入 Accept-Language 请求头。
   */
  getLocale?: () => string | null | undefined;
  /**
   * 收到 401 后的处理逻辑（例如清理 token、跳转登录页）。
   */
  onUnauthorized?: (error: AxiosError) => void;
  /**
   * 全局错误回调。可用于统一埋点或提示。
   */
  onResponseError?: (error: AxiosError, message: string) => void;
  /**
   * 业务错误回调（code 非成功码时触发）。
   */
  onBusinessError?: (error: Error, message: string) => void;
  /**
   * 自定义业务成功码判断，默认 code === 0。
   */
  isSuccessCode?: (code: number) => boolean;
  /**
   * 是否严格校验响应结构符合 ApiResponse。
   * - true: 响应结构不符合时立即抛错（推荐，默认）
   * - false: 允许透传后端原始结构
   */
  strictResponse?: boolean;
}

export interface HttpRequestConfig extends AxiosRequestConfig {
  /**
   * 并发策略：
   * - parallel: 并行放行（不做并发控制）
   * - takeLatest: 新请求发起前取消同 key 旧请求
   * - takeFirst: 存在同 key 进行中请求时，忽略新请求
   *
   * 默认策略：
   * - GET 请求默认 takeLatest（更适合查询类场景）
   * - 非 GET 请求默认 parallel（避免写操作被误取消）
   */
  mode?: 'parallel' | 'takeLatest' | 'takeFirst';
  /**
   * 请求取消唯一 key。相同 key 可被 cancel(key) 取消。
   */
  cancelKey?: string;
  /**
   * 请求所属作用域，可用于 cancelAll(scope) 批量取消。
   */
  cancelScope?: string;
  /**
   * 请求被取消时是否静默（不触发 onResponseError）。
   */
  silentCancel?: boolean;
}

export interface HttpClient {
  instance: AxiosInstance;
  cancel: (key: string) => void;
  cancelAll: (scope?: string) => void;
  delete: <T = unknown>(url: string, config?: HttpRequestConfig) => Promise<T>;
  get: <T = unknown>(url: string, config?: HttpRequestConfig) => Promise<T>;
  isCanceled: (error: unknown) => boolean;
  patch: <T = unknown>(url: string, data?: unknown, config?: HttpRequestConfig) => Promise<T>;
  post: <T = unknown>(url: string, data?: unknown, config?: HttpRequestConfig) => Promise<T>;
  put: <T = unknown>(url: string, data?: unknown, config?: HttpRequestConfig) => Promise<T>;
}

/**
 * 统一提取错误信息，避免应用层重复写 AxiosError 判断逻辑。
 */
export function normalizeAxiosErrorMessage(error: unknown) {
  if (axios.isAxiosError(error))
    return error.response?.data?.message ?? error.message ?? '请求失败';

  if (error instanceof Error) return error.message;

  return '请求失败';
}

function defaultIsSuccessCode(code: number) {
  return code === 0;
}

interface PendingRequestMeta {
  key: string;
  scope?: string | undefined;
  controller: AbortController;
  silentCancel: boolean;
}

interface InternalCancelMeta {
  key: string;
  controller: AbortController;
}

type HttpRequestConfigWithMeta = HttpRequestConfig & { _cancelMeta?: InternalCancelMeta };

function createAutoCancelKey(config: HttpRequestConfig) {
  const method = (config.method ?? 'get').toUpperCase();
  const url = config.url ?? '';
  const params =
    config.params && typeof config.params === 'object'
      ? JSON.stringify(config.params)
      : String(config.params ?? '');
  return `${method}:${url}:${params}`;
}

function resolveRequestMode(config: HttpRequestConfig) {
  if (config.mode) return config.mode;

  const method = (config.method ?? 'get').toUpperCase();
  return method === 'GET' ? 'takeLatest' : 'parallel';
}

function normalizeCancelKey(
  config: HttpRequestConfig,
  mode: 'parallel' | 'takeLatest' | 'takeFirst'
) {
  if (config.cancelKey) return config.cancelKey;

  if (mode !== 'parallel') return createAutoCancelKey(config);

  return undefined;
}

function isCanceledError(error: unknown) {
  return axios.isAxiosError(error) && error.code === 'ERR_CANCELED';
}

function isApiResponseShape<T>(payload: unknown): payload is ApiResponse<T> {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'code' in payload &&
    typeof (payload as { code: unknown }).code === 'number'
  );
}

function buildInvalidApiResponseMessage(response: AxiosResponse<unknown>) {
  const requestUrl = response.config?.url ?? '';
  const isTemplateDemoApi = /\/api\/template-demo(?:\/|$)/.test(requestUrl);

  if (isTemplateDemoApi) {
    return [
      `检测到 ${requestUrl} 返回结构不符合 ApiResponse 约定。`,
      '如果你在开发环境首次运行模板，请确认已开启 Mock：VITE_ENABLE_MOCK=true（或删除该变量，默认开启）。',
      '若关闭 Mock，请确保后端返回 { code, data, message } 结构。',
    ].join(' ');
  }

  return '响应结构不符合 ApiResponse 约定，请检查后端返回格式。';
}

function unwrapResponseData<T>(
  response: AxiosResponse<ApiResponse<T> | T>,
  isSuccessCode: (code: number) => boolean,
  strictResponse: boolean,
  onBusinessError?: (error: Error, message: string) => void
) {
  const payload = response.data;

  if (!isApiResponseShape<T>(payload)) {
    if (strictResponse) throw new Error(buildInvalidApiResponseMessage(response));

    return payload as unknown as T;
  }

  if (!isSuccessCode(payload.code)) {
    const message = payload.message || '业务请求失败';
    const businessError = new Error(message);
    onBusinessError?.(businessError, message);
    throw businessError;
  }

  return payload.data as T;
}

/**
 * 创建一个可复用的 axios 客户端。
 *
 * 使用建议：
 * 1. 基础能力放在 shared package（这里）。
 * 2. 应用内保留 src/api/request.ts，只做环境和业务策略适配。
 * 3. 模块接口函数继续放在 src/modules/<name>/api/。
 */
export function createHttpClient(options: CreateHttpClientOptions = {}): HttpClient {
  const {
    baseURL = '',
    timeout = 15000,
    getAccessToken,
    getLocale,
    onResponseError,
    onBusinessError,
    onUnauthorized,
    isSuccessCode = defaultIsSuccessCode,
    strictResponse = true,
  } = options;

  const instance = axios.create({
    baseURL,
    timeout,
  });
  const pendingRequestMap = new Map<string, PendingRequestMeta>();

  function clearPendingByKey(key: string, controller?: AbortController) {
    const current = pendingRequestMap.get(key);
    if (!current) return;
    // 避免旧请求返回时误删新请求映射。
    if (controller && current.controller !== controller) return;
    pendingRequestMap.delete(key);
  }

  function cancel(key: string) {
    const pending = pendingRequestMap.get(key);
    if (!pending) return;
    pending.controller.abort();
    pendingRequestMap.delete(key);
  }

  function cancelAll(scope?: string) {
    pendingRequestMap.forEach((pending, key) => {
      if (!scope || pending.scope === scope) {
        pending.controller.abort();
        pendingRequestMap.delete(key);
      }
    });
  }

  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const nextConfig = config as InternalAxiosRequestConfig & HttpRequestConfigWithMeta;
    const headers = axios.AxiosHeaders.from(nextConfig.headers);

    const accessToken = getAccessToken?.();
    if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);

    const locale = getLocale?.();
    if (locale) headers.set('Accept-Language', locale);

    nextConfig.headers = headers;
    const mode = resolveRequestMode(nextConfig);
    const cancelKey = normalizeCancelKey(nextConfig, mode);
    nextConfig.mode = mode;

    if (cancelKey && mode === 'takeLatest') cancel(cancelKey);

    if (cancelKey) {
      const existing = pendingRequestMap.get(cancelKey);
      if (existing && mode === 'takeFirst') {
        // takeFirst 场景下，若已有同 key 请求在进行中，当前请求直接中断。
        const controller = new AbortController();
        controller.abort();
        nextConfig.signal = controller.signal;
        nextConfig.silentCancel = nextConfig.silentCancel ?? true;
        return nextConfig;
      }

      const controller = new AbortController();
      const externalSignal = nextConfig.signal;

      if (externalSignal) {
        if (externalSignal.aborted) {
          controller.abort();
        } else if (typeof externalSignal.addEventListener === 'function') {
          externalSignal.addEventListener('abort', () => controller.abort(), { once: true });
        }
      }

      nextConfig.signal = controller.signal;
      nextConfig._cancelMeta = {
        key: cancelKey,
        controller,
      };

      const pendingMeta: PendingRequestMeta = {
        key: cancelKey,
        controller,
        silentCancel: nextConfig.silentCancel ?? true,
      };
      if (nextConfig.cancelScope) pendingMeta.scope = nextConfig.cancelScope;

      pendingRequestMap.set(cancelKey, pendingMeta);
    }

    return nextConfig;
  });

  instance.interceptors.response.use(
    (response) => {
      const config = response.config as HttpRequestConfigWithMeta;
      const cancelMeta = config._cancelMeta;
      if (cancelMeta) clearPendingByKey(cancelMeta.key, cancelMeta.controller);
      return response;
    },
    (error: AxiosError) => {
      const config = error.config as HttpRequestConfigWithMeta | undefined;
      const cancelMeta = config?._cancelMeta;
      const pending = cancelMeta ? pendingRequestMap.get(cancelMeta.key) : undefined;

      if (cancelMeta) clearPendingByKey(cancelMeta.key, cancelMeta.controller);

      const silentCancel = config?.silentCancel ?? pending?.silentCancel ?? true;
      if (isCanceledError(error) && silentCancel) return Promise.reject(error);

      const message = normalizeAxiosErrorMessage(error);

      if (error.response?.status === 401) onUnauthorized?.(error);

      onResponseError?.(error, message);
      return Promise.reject(error);
    }
  );

  return {
    instance,
    cancel,
    cancelAll,
    delete: <T = unknown>(url: string, config?: HttpRequestConfig) =>
      instance
        .delete<ApiResponse<T> | T>(url, config)
        .then((response) =>
          unwrapResponseData(response, isSuccessCode, strictResponse, onBusinessError)
        ),
    get: <T = unknown>(url: string, config?: HttpRequestConfig) =>
      instance
        .get<ApiResponse<T> | T>(url, config)
        .then((response) =>
          unwrapResponseData(response, isSuccessCode, strictResponse, onBusinessError)
        ),
    isCanceled: isCanceledError,
    patch: <T = unknown>(url: string, data?: unknown, config?: HttpRequestConfig) =>
      instance
        .patch<ApiResponse<T> | T>(url, data, config)
        .then((response) =>
          unwrapResponseData(response, isSuccessCode, strictResponse, onBusinessError)
        ),
    post: <T = unknown>(url: string, data?: unknown, config?: HttpRequestConfig) =>
      instance
        .post<ApiResponse<T> | T>(url, data, config)
        .then((response) =>
          unwrapResponseData(response, isSuccessCode, strictResponse, onBusinessError)
        ),
    put: <T = unknown>(url: string, data?: unknown, config?: HttpRequestConfig) =>
      instance
        .put<ApiResponse<T> | T>(url, data, config)
        .then((response) =>
          unwrapResponseData(response, isSuccessCode, strictResponse, onBusinessError)
        ),
  };
}
