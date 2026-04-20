// 范例：apps/<nuxt-app>/utils/tokenStorage.ts
//
// 适用：nuxt（SSR + CSR）
// 底层：useCookie（Nuxt 内置 composable）
//
// 为什么用 cookie 而不是 localStorage：
//   - SSR 环境下服务端要能读到 token（localStorage 是浏览器独有）
//   - useCookie 同时管理客户端 + 服务端，自动同步
//   - 配合 SameSite / Secure / HttpOnly 提升安全（仅 HttpOnly 时只能由服务器读，本示例使用普通 cookie）
//
// 调用时机：
//   - getAccessToken：每次请求时调用（@vup/http 也支持，但 Nuxt 通常用 ofetch 而非 @vup/http）
//   - setAccessToken：登录成功后调用
//   - removeAccessToken：登出 / 收到 401 时调用
//   - syncTokenFromStorage：cookie 是同步的，noop
//
// AI 注意：
//   - 必须在 setup / composable / plugin 内调用，不能在普通函数里直接用 useCookie
//   - 如需在普通函数访问，可在调用方先取出 cookie 实例传入

const KEY = 'access_token';

export function getAccessToken(): string | null {
  return useCookie<string | null>(KEY).value ?? null;
}

export function setAccessToken(token: string): void {
  useCookie<string | null>(KEY).value = token;
}

export function removeAccessToken(): void {
  useCookie<string | null>(KEY).value = null;
}

export async function syncTokenFromStorage(): Promise<void> {
  // cookie 同步可读，无需 sync
}
