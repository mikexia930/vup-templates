export interface RequestConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  retries?: number;
  retryDelay?: number;
}

export interface ResponseData<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export interface RequestInterceptor {
  onRequest?: (config: RequestInit) => RequestInit | Promise<RequestInit>;
  onRequestError?: (error: Error) => never | Promise<never>;
}

export interface ResponseInterceptor {
  onResponse?: <T>(response: ResponseData<T>) => ResponseData<T> | Promise<ResponseData<T>>;
  onResponseError?: (error: Error) => never | Promise<never>;
}

export class HttpClient {
  private readonly config: Required<RequestConfig>;
  private readonly requestInterceptors: RequestInterceptor[] = [];
  private readonly responseInterceptors: ResponseInterceptor[] = [];

  constructor(config: RequestConfig = {}) {
    this.config = {
      baseURL: config.baseURL ?? '',
      timeout: config.timeout ?? 10000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      retries: config.retries ?? 0,
      retryDelay: config.retryDelay ?? 1000,
    };
  }

  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  async request<T = unknown>(url: string, options: RequestInit = {}): Promise<ResponseData<T>> {
    return this.requestWithRetry<T>(url, options, 0);
  }

  get<T = unknown>(url: string, options?: RequestInit): Promise<ResponseData<T>> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  post<T = unknown>(url: string, data?: unknown, options?: RequestInit): Promise<ResponseData<T>> {
    return this.request<T>(url, this.resolveBodyOptions('POST', data, options));
  }

  put<T = unknown>(url: string, data?: unknown, options?: RequestInit): Promise<ResponseData<T>> {
    return this.request<T>(url, this.resolveBodyOptions('PUT', data, options));
  }

  patch<T = unknown>(url: string, data?: unknown, options?: RequestInit): Promise<ResponseData<T>> {
    return this.request<T>(url, this.resolveBodyOptions('PATCH', data, options));
  }

  delete<T = unknown>(url: string, options?: RequestInit): Promise<ResponseData<T>> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  private async requestWithRetry<T>(
    url: string,
    options: RequestInit,
    attempt: number
  ): Promise<ResponseData<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      let requestConfig: RequestInit = {
        ...options,
        headers: this.resolveHeaders(options.headers),
        signal: controller.signal,
      };

      for (const interceptor of this.requestInterceptors) {
        if (interceptor.onRequest) {
          requestConfig = await interceptor.onRequest(requestConfig);
        }
      }

      const response = await fetch(this.resolveURL(url), requestConfig);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw this.createHTTPError(response);
      }

      let data = (await response.json()) as ResponseData<T>;

      for (const interceptor of this.responseInterceptors) {
        if (interceptor.onResponse) {
          data = await interceptor.onResponse(data);
        }
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (attempt < this.config.retries && this.shouldRetry(error)) {
        await this.delay(this.config.retryDelay * 2 ** attempt);
        return this.requestWithRetry<T>(url, options, attempt + 1);
      }

      for (const interceptor of this.responseInterceptors) {
        if (interceptor.onResponseError) {
          return interceptor.onResponseError(error as Error);
        }
      }

      for (const interceptor of this.requestInterceptors) {
        if (interceptor.onRequestError) {
          return interceptor.onRequestError(error as Error);
        }
      }

      throw error;
    }
  }

  private resolveURL(url: string): string {
    if (!this.config.baseURL) return url;
    const base = this.config.baseURL.endsWith('/')
      ? this.config.baseURL.slice(0, -1)
      : this.config.baseURL;
    const path = url.startsWith('/') ? url : `/${url}`;
    return `${base}${path}`;
  }

  private resolveHeaders(headers?: HeadersInit): Headers {
    const resolvedHeaders = new Headers(this.config.headers);
    if (headers) {
      new Headers(headers).forEach((value, key) => {
        resolvedHeaders.set(key, value);
      });
    }
    return resolvedHeaders;
  }

  private resolveBodyOptions(
    method: string,
    data: unknown,
    options: RequestInit = {}
  ): RequestInit {
    const requestOptions: RequestInit = {
      ...options,
      method,
    };

    if (data !== undefined) {
      requestOptions.body = JSON.stringify(data);
    }

    return requestOptions;
  }

  private createHTTPError(response: Response): Error {
    const error = new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    Object.assign(error, {
      status: response.status,
      statusText: response.statusText,
    });
    return error;
  }

  private shouldRetry(error: unknown): boolean {
    if (!(error instanceof Error)) return false;
    if (error.name === 'AbortError') return true;
    if (error.message.includes('Failed to fetch')) return true;

    const status = (error as { status?: number }).status;
    return status === 429 || (typeof status === 'number' && status >= 500);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}

export const http = new HttpClient();
