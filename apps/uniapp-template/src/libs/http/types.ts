/**
 * HTTP 抽象层类型定义
 * 与 @vup/http 的 API 设计对齐，但底层基于 uni.request
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD';

/**
 * 后端统一响应结构
 */
export interface ApiResponse<T = unknown> {
  code: number;
  data?: T;
  message?: string | null;
}

/**
 * uni.request 错误对象（uni 没有给出标准类型，自己声明）
 */
export interface UniRequestError {
  errMsg: string;
  errno?: number;
}

/**
 * createHttpClient 工厂选项
 */
export interface CreateHttpClientOptions {
  /**
   * 基础地址，通常来自应用环境变量（如 VITE_API_BASE_URL）。
   */
  baseURL?: string;
  /**
   * 请求超时（毫秒），默认 15000。
   */
  timeout?: number;
  /**
   * 默认请求头。
   */
  headers?: Record<string, string>;
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
  onUnauthorized?: (error: HttpError) => void;
  /**
   * 全局错误回调（网络错误 / HTTP 状态码非 2xx）。
   */
  onResponseError?: (error: HttpError, message: string) => void;
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

/**
 * 单次请求的额外配置
 */
export interface HttpRequestConfig {
  /**
   * 请求路径（相对 baseURL）或绝对 URL。
   */
  url?: string;
  /**
   * HTTP 方法。
   */
  method?: HttpMethod;
  /**
   * 请求体或 query 参数。
   * GET 请求会作为 query string，其他方法作为 body。
   */
  data?: unknown;
  /**
   * GET 请求的 query 参数（也可直接放 data，二者等价；同时存在以 params 优先）。
   */
  params?: Record<string, unknown>;
  /**
   * 请求头。
   */
  header?: Record<string, string>;
  /**
   * 超时时间（毫秒），覆盖工厂默认值。
   */
  timeout?: number;
  /**
   * 跳过 token 注入（如登录接口）。
   */
  skipAuth?: boolean;
  /**
   * 跳过全局错误回调（业务自行处理错误时使用）。
   */
  silent?: boolean;
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
   * 不传时按 method+url+params 自动生成。
   */
  cancelKey?: string;
  /**
   * 请求所属作用域，可用于 cancelAll(scope) 批量取消。
   */
  cancelScope?: string;
  /**
   * 请求被取消时是否静默（不触发 onResponseError），默认 true。
   */
  silentCancel?: boolean;
  /**
   * uni.request 透传：dataType / responseType 等。
   */
  dataType?: string;
  responseType?: 'text' | 'arraybuffer';
}

/**
 * 标准化后的 HTTP 错误对象
 */
export class HttpError extends Error {
  /** HTTP 状态码（无响应时为 0） */
  status: number;
  /** 是否为请求被取消 */
  canceled: boolean;
  /** 是否为超时 */
  timeout: boolean;
  /** 原始错误对象 */
  raw?: unknown;
  /** 响应体（如果有） */
  response?: unknown;
  /** 触发请求的 config */
  config?: HttpRequestConfig;

  constructor(message: string, init: Partial<Omit<HttpError, 'name' | 'message'>> = {}) {
    super(message);
    this.name = 'HttpError';
    this.status = init.status ?? 0;
    this.canceled = init.canceled ?? false;
    this.timeout = init.timeout ?? false;
    this.raw = init.raw;
    this.response = init.response;
    this.config = init.config;
  }
}

/**
 * HTTP 客户端公开接口
 */
export interface HttpClient {
  /** 取消指定 key 的请求 */
  cancel: (key: string) => void;
  /** 取消指定 scope 下所有请求；不传 scope 则取消全部 */
  cancelAll: (scope?: string) => void;
  /** 判断错误是否为「被取消」 */
  isCanceled: (error: unknown) => boolean;

  request: <T = unknown>(config: HttpRequestConfig) => Promise<T>;
  get: <T = unknown>(url: string, config?: Omit<HttpRequestConfig, 'url' | 'method'>) => Promise<T>;
  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: Omit<HttpRequestConfig, 'url' | 'method' | 'data'>
  ) => Promise<T>;
  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: Omit<HttpRequestConfig, 'url' | 'method' | 'data'>
  ) => Promise<T>;
  delete: <T = unknown>(
    url: string,
    config?: Omit<HttpRequestConfig, 'url' | 'method'>
  ) => Promise<T>;
}
