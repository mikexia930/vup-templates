// 范例：apps/<app>/src/shared/utils/tokenStorage.ts
//
// 适用：vue / electron 渲染进程
// 底层：window.localStorage（浏览器同步 API）
//
// 调用时机：
//   - getAccessToken：每次 HTTP 请求自动调用（@vup/http 注入 Authorization）
//   - setAccessToken：登录成功后调用
//   - removeAccessToken：登出 / 收到 401 时调用
//   - syncTokenFromStorage：同步实现是 noop，仅为接口对齐
//
// AI 使用：直接复制即可（同步实现最简单）

const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

// ============ Access token ============

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_KEY);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_KEY, token);
}

export function removeAccessToken(): void {
  localStorage.removeItem(ACCESS_KEY);
}

// 同步实现无需 sync，但保留同名函数让接口与异步实现对齐
export async function syncTokenFromStorage(): Promise<void> {
  // noop
}

// ============ Refresh token（按需启用） ============
//
// 仅在使用 refresh token 自动续期时需要。详见 auth-login skill。
// 不用 refresh token 的项目可以删除以下函数。

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY);
}

export function setRefreshToken(token: string): void {
  localStorage.setItem(REFRESH_KEY, token);
}

export function removeRefreshToken(): void {
  localStorage.removeItem(REFRESH_KEY);
}

// 登录成功后一次性写两个 token
export function setTokens(access: string, refresh: string): void {
  setAccessToken(access);
  setRefreshToken(refresh);
}

// 登出 / refresh 失败时一次性清两个
export function removeTokens(): void {
  removeAccessToken();
  removeRefreshToken();
}
