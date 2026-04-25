/**
 * HTTP 抽象层核心实现
 * 基于 uni.request，提供 Promise / 拦截器 / 业务码解包 / 取消队列等能力
 */
import { HttpError } from './types';
import type {
  ApiResponse,
  CreateHttpClientOptions,
  HttpClient,
  HttpMethod,
  HttpRequestConfig,
} from './types';

// ---------- 工具函数 ----------

function defaultIsSuccessCode(code: number) {
  return code === 0;
}

function joinUrl(baseURL: string, url: string) {
  if (!url) return baseURL;
  if (/^https?:\/\//i.test(url)) return url;
  if (!baseURL) return url;
  return `${baseURL.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`;
}

function normalizeMethod(method?: HttpMethod): HttpMethod {
  return (method ?? 'GET').toUpperCase() as HttpMethod;
}

function createAutoCancelKey(config: HttpRequestConfig) {
  const method = normalizeMethod(config.method);
  const url = config.url ?? '';
  const payload = config.params ?? config.data;
  const payloadStr =
    payload && typeof payload === 'object' ? JSON.stringify(payload) : String(payload ?? '');
  return `${method}:${url}:${payloadStr}`;
}

function resolveRequestMode(config: HttpRequestConfig): NonNullable<HttpRequestConfig['mode']> {
  if (config.mode) return config.mode;
  return normalizeMethod(config.method) === 'GET' ? 'takeLatest' : 'parallel';
}

function normalizeCancelKey(
  config: HttpRequestConfig,
  mode: NonNullable<HttpRequestConfig['mode']>
): string | undefined {
  if (config.cancelKey) return config.cancelKey;
  if (mode !== 'parallel') return createAutoCancelKey(config);
  return undefined;
}

function isApiResponseShape<T>(payload: unknown): payload is ApiResponse<T> {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'code' in payload &&
    typeof (payload as { code: unknown }).code === 'number'
  );
}

function unwrapResponseData<T>(
  payload: unknown,
  isSuccessCode: (code: number) => boolean,
  strictResponse: boolean,
  onBusinessError?: (error: Error, message: string) => void
): T {
  if (!isApiResponseShape<T>(payload)) {
    if (strictResponse) {
      throw new Error('响应结构不符合 ApiResponse 约定，请检查后端返回格式或关闭 strictResponse');
    }
    return payload as T;
  }

  if (!isSuccessCode(payload.code)) {
    const message = payload.message || '业务请求失败';
    const businessError = new Error(message);
    onBusinessError?.(businessError, message);
    throw businessError;
  }

  return payload.data as T;
}

// ---------- 内部状态 ----------

interface PendingRequestMeta {
  key: string;
  scope?: string;
  task: UniApp.RequestTask;
  silentCancel: boolean;
}

// ---------- 工厂函数 ----------

export function createHttpClient(options: CreateHttpClientOptions = {}): HttpClient {
  const {
    baseURL = '',
    timeout = 15000,
    headers: defaultHeaders = {},
    getAccessToken,
    getLocale,
    onUnauthorized,
    onResponseError,
    onBusinessError,
    isSuccessCode = defaultIsSuccessCode,
    strictResponse = true,
  } = options;

  const pendingMap = new Map<string, PendingRequestMeta>();

  function clearPending(key: string, task?: UniApp.RequestTask) {
    const current = pendingMap.get(key);
    if (!current) return;
    if (task && current.task !== task) return; // 避免旧请求误删新映射
    pendingMap.delete(key);
  }

  function cancel(key: string) {
    const pending = pendingMap.get(key);
    if (!pending) return;
    try {
      pending.task.abort();
    } catch {
      // ignore
    }
    pendingMap.delete(key);
  }

  function cancelAll(scope?: string) {
    pendingMap.forEach((pending, key) => {
      if (!scope || pending.scope === scope) {
        try {
          pending.task.abort();
        } catch {
          // ignore
        }
        pendingMap.delete(key);
      }
    });
  }

  function isCanceled(error: unknown): boolean {
    return error instanceof HttpError && error.canceled;
  }

  function buildHeaders(config: HttpRequestConfig): Record<string, string> {
    const merged: Record<string, string> = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
      ...(config.header ?? {}),
    };

    if (!config.skipAuth) {
      const token = getAccessToken?.();
      if (token) merged.Authorization = `Bearer ${token}`;
    }

    const locale = getLocale?.();
    if (locale && !merged['Accept-Language']) merged['Accept-Language'] = locale;

    return merged;
  }

  /**
   * 核心请求方法
   */
  function request<T = unknown>(rawConfig: HttpRequestConfig): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const config: HttpRequestConfig = { ...rawConfig };
      const method = normalizeMethod(config.method);
      config.method = method;

      const mode = resolveRequestMode(config);
      const cancelKey = normalizeCancelKey(config, mode);

      // takeLatest: 取消同 key 旧请求
      if (cancelKey && mode === 'takeLatest') cancel(cancelKey);

      // takeFirst: 已有进行中请求则直接拒绝（视为被取消）
      if (cancelKey && mode === 'takeFirst' && pendingMap.has(cancelKey)) {
        const error = new HttpError('请求被忽略（takeFirst 模式下已有同 key 请求）', {
          canceled: true,
          config,
        });
        // 静默处理：takeFirst 取消默认不上报
        return reject(error);
      }

      const finalUrl = joinUrl(baseURL, config.url ?? '');
      const finalHeader = buildHeaders(config);

      // GET 请求把 params 合并进 data（uni.request GET 时 data 自动转 query）
      const finalData =
        method === 'GET' ? (config.params ?? config.data) : (config.data ?? config.params);

      const task = uni.request({
        url: finalUrl,
        method,
        data: finalData as string | AnyObject | ArrayBuffer | undefined,
        header: finalHeader,
        timeout: config.timeout ?? timeout,
        dataType: config.dataType,
        responseType: config.responseType,
        success: (res) => {
          if (cancelKey) clearPending(cancelKey, task);

          const status = res.statusCode;

          // HTTP 状态码非 2xx
          if (status < 200 || status >= 300) {
            const message = `HTTP ${status}`;
            const error = new HttpError(message, {
              status,
              response: res.data,
              config,
            });

            if (status === 401) onUnauthorized?.(error);
            if (!config.silent) onResponseError?.(error, message);
            return reject(error);
          }

          // 2xx 走业务码解包
          try {
            const data = unwrapResponseData<T>(
              res.data,
              isSuccessCode,
              strictResponse,
              onBusinessError
            );
            resolve(data);
          } catch (e) {
            // 业务错误已通过 onBusinessError 回调，这里不再重复 onResponseError
            reject(e);
          }
        },
        fail: (err) => {
          if (cancelKey) clearPending(cancelKey, task);

          const errMsg = err?.errMsg ?? '请求失败';
          const isAbort = /abort/i.test(errMsg);
          const isTimeout = /timeout/i.test(errMsg);

          const error = new HttpError(isAbort ? '请求已取消' : isTimeout ? '请求超时' : errMsg, {
            canceled: isAbort,
            timeout: isTimeout,
            raw: err,
            config,
          });

          // 取消的请求默认静默
          const silentCancel = config.silentCancel ?? true;
          if (isAbort && silentCancel) return reject(error);

          if (!config.silent) onResponseError?.(error, error.message);
          reject(error);
        },
      });

      // 注册到 pending map（用于 cancel）
      if (cancelKey) {
        const meta: PendingRequestMeta = {
          key: cancelKey,
          task,
          silentCancel: config.silentCancel ?? true,
        };
        if (config.cancelScope) meta.scope = config.cancelScope;
        pendingMap.set(cancelKey, meta);
      }
    });
  }

  return {
    cancel,
    cancelAll,
    isCanceled,
    request,
    get: <T = unknown>(url: string, config?: Omit<HttpRequestConfig, 'url' | 'method'>) =>
      request<T>({ ...config, url, method: 'GET' }),
    post: <T = unknown>(
      url: string,
      data?: unknown,
      config?: Omit<HttpRequestConfig, 'url' | 'method' | 'data'>
    ) => request<T>({ ...config, url, method: 'POST', data }),
    put: <T = unknown>(
      url: string,
      data?: unknown,
      config?: Omit<HttpRequestConfig, 'url' | 'method' | 'data'>
    ) => request<T>({ ...config, url, method: 'PUT', data }),
    delete: <T = unknown>(url: string, config?: Omit<HttpRequestConfig, 'url' | 'method'>) =>
      request<T>({ ...config, url, method: 'DELETE' }),
  };
}
