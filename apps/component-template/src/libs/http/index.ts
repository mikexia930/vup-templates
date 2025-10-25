// HTTP 请求封装工具
export interface RequestConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  retries?: number;
  retryDelay?: number;
}

export interface ResponseData<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface RequestInterceptor {
  onRequest?: (config: RequestInit) => RequestInit | Promise<RequestInit>;
  onRequestError?: (error: Error) => Promise<never>;
}

export interface ResponseInterceptor {
  onResponse?: <T>(response: ResponseData<T>) => ResponseData<T> | Promise<ResponseData<T>>;
  onResponseError?: (error: Error) => Promise<never>;
}

export class HttpClient {
  private config: {
    baseURL: string;
    timeout: number;
    headers: Record<string, string>;
    retries: number;
    retryDelay: number;
  };
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor(config: RequestConfig = {}) {
    this.config = {
      baseURL: config.baseURL || '',
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      retries: config.retries || 0,
      retryDelay: config.retryDelay || 1000,
    };
  }

  // 添加请求拦截器
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  // 添加响应拦截器
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  // URL 拼接工具方法
  private joinURL(baseURL: string, url: string): string {
    const base = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    const path = url.startsWith('/') ? url : `/${url}`;
    return `${base}${path}`;
  }

  async request<T = any>(url: string, options: RequestInit = {}): Promise<ResponseData<T>> {
    return this.requestWithRetry<T>(url, options, 0);
  }

  private async requestWithRetry<T = any>(
    url: string,
    options: RequestInit = {},
    attempt: number
  ): Promise<ResponseData<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      // 构建请求配置
      let requestConfig: RequestInit = {
        ...options,
        headers: {
          ...this.config.headers,
          ...options.headers,
        },
        signal: controller.signal,
      };

      // 应用请求拦截器
      for (const interceptor of this.requestInterceptors) {
        if (interceptor.onRequest) {
          requestConfig = await interceptor.onRequest(requestConfig);
        }
      }

      const fullURL = this.config.baseURL ? this.joinURL(this.config.baseURL, url) : url;
      const response = await fetch(fullURL, requestConfig);

      clearTimeout(timeoutId);

      // 检查响应状态
      if (!response.ok) {
        const error = new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        (error as any).status = response.status;
        (error as any).statusText = response.statusText;
        throw error;
      }

      // 解析响应数据
      let data: ResponseData<T>;
      try {
        data = await response.json();
      } catch (parseError) {
        const error = new Error('Failed to parse response as JSON');
        (error as any).originalError = parseError;
        throw error;
      }

      // 应用响应拦截器
      for (const interceptor of this.responseInterceptors) {
        if (interceptor.onResponse) {
          data = await interceptor.onResponse(data);
        }
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      // 检查是否需要重试
      if (attempt < this.config.retries && this.shouldRetry(error as Error)) {
        await this.delay(this.config.retryDelay * 2 ** attempt); // 指数退避
        return this.requestWithRetry<T>(url, options, attempt + 1);
      }

      // 应用响应错误拦截器
      for (const interceptor of this.responseInterceptors) {
        if (interceptor.onResponseError) {
          return await interceptor.onResponseError(error as Error);
        }
      }

      // 应用请求错误拦截器
      for (const interceptor of this.requestInterceptors) {
        if (interceptor.onRequestError) {
          return await interceptor.onRequestError(error as Error);
        }
      }

      throw error;
    }
  }

  // 判断是否应该重试
  private shouldRetry(error: Error): boolean {
    // 网络错误或超时错误可以重试
    if (error.name === 'AbortError') return true;
    if (error.message.includes('Failed to fetch')) return true;

    // HTTP 5xx 错误可以重试
    if ((error as any).status >= 500) return true;

    // HTTP 429 (Too Many Requests) 可以重试
    if ((error as any).status === 429) return true;

    return false;
  }

  // 延迟工具方法
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  get<T = any>(url: string, options?: RequestInit): Promise<ResponseData<T>> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  post<T = any>(url: string, data?: any, options?: RequestInit): Promise<ResponseData<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put<T = any>(url: string, data?: any, options?: RequestInit): Promise<ResponseData<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  patch<T = any>(url: string, data?: any, options?: RequestInit): Promise<ResponseData<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete<T = any>(url: string, options?: RequestInit): Promise<ResponseData<T>> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }
}

// 创建默认实例
export const http = new HttpClient();

// 类型已经在上面通过 export interface 导出了，这里不需要重复导出
