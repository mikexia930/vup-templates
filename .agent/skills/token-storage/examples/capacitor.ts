// 范例：apps/<app>/src/shared/utils/tokenStorage.ts
//
// 适用：capacitor（移动端）
// 底层：@capacitor/preferences
//   - iOS: UserDefaults
//   - Android: SharedPreferences
//   - PWA fallback: localStorage
//
// ⚠️ 关键：移动端必须用 Preferences，不能用 localStorage
//   原因：iOS/Android 系统会在内存压力下主动清理 localStorage，
//   导致用户登录态凭空丢失。Preferences 与原生 App 设置同级，不会被清。
//
// ⚠️ iOS 合规：需在 ios/App/PrivacyInfo.xcprivacy 声明使用原因
//   key: NSPrivacyAccessedAPICategoryUserDefaults
//   reason: CA92.1
//
// 调用时机：
//   - syncTokenFromStorage：必须在 main.ts bootstrap 开头 await 一次
//   - getAccessToken：每次 HTTP 请求自动调用（同步读缓存）
//   - setAccessToken：登录成功后 await 调用
//   - removeAccessToken：登出 / 收到 401 时 await 调用
//
// AI 使用：直接复制，并确保 main.ts 入口 await syncTokenFromStorage()

import { Preferences } from '@capacitor/preferences';

const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

// 内存缓存：让 get*Token 保持同步签名
// 由 syncTokenFromStorage（启动时）和 set*/remove*（运行时）维护
let cachedAccessToken: string | null = null;
let cachedRefreshToken: string | null = null;

// ============ Access token ============

export function getAccessToken(): string | null {
  return cachedAccessToken;
}

export async function setAccessToken(token: string): Promise<void> {
  cachedAccessToken = token;
  await Preferences.set({ key: ACCESS_KEY, value: token });
}

export async function removeAccessToken(): Promise<void> {
  cachedAccessToken = null;
  await Preferences.remove({ key: ACCESS_KEY });
}

// 启动时一次加载两个 token 到缓存
export async function syncTokenFromStorage(): Promise<void> {
  const [access, refresh] = await Promise.all([
    Preferences.get({ key: ACCESS_KEY }),
    Preferences.get({ key: REFRESH_KEY }),
  ]);
  cachedAccessToken = access.value;
  cachedRefreshToken = refresh.value;
}

// ============ Refresh token（按需启用） ============
//
// 仅在使用 refresh token 自动续期时需要。详见 auth-login skill。
// 不用 refresh token 的项目可以删除以下函数 + 把 syncTokenFromStorage 简化
// 为只读 ACCESS_KEY。

export function getRefreshToken(): string | null {
  return cachedRefreshToken;
}

export async function setRefreshToken(token: string): Promise<void> {
  cachedRefreshToken = token;
  await Preferences.set({ key: REFRESH_KEY, value: token });
}

export async function removeRefreshToken(): Promise<void> {
  cachedRefreshToken = null;
  await Preferences.remove({ key: REFRESH_KEY });
}

// 登录成功后一次性写两个 token（避免应用层 await 两次）
export async function setTokens(access: string, refresh: string): Promise<void> {
  cachedAccessToken = access;
  cachedRefreshToken = refresh;
  await Promise.all([
    Preferences.set({ key: ACCESS_KEY, value: access }),
    Preferences.set({ key: REFRESH_KEY, value: refresh }),
  ]);
}

// 登出 / refresh 失败时一次性清两个
export async function removeTokens(): Promise<void> {
  cachedAccessToken = null;
  cachedRefreshToken = null;
  await Promise.all([
    Preferences.remove({ key: ACCESS_KEY }),
    Preferences.remove({ key: REFRESH_KEY }),
  ]);
}
