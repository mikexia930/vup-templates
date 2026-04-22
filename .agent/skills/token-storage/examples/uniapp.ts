// 范例：apps/<uniapp-app>/src/common/utils/tokenStorage.ts
//
// 适用：uniapp（H5 / 小程序 / App 多端）
// 底层：uni.setStorageSync / uni.getStorageSync / uni.removeStorageSync
//
// 多端兼容性：
//   - H5：底层是 localStorage（同源限制）
//   - 小程序：使用平台 storage API（微信 / 支付宝 / 抖音等各有限制）
//   - App：使用原生 storage（持久化最可靠）
//
// 调用时机：
//   - getAccessToken：每次请求时调用（同步可读）
//   - setAccessToken：登录成功后调用
//   - removeAccessToken：登出 / 收到 401 时调用
//   - syncTokenFromStorage：同步 API，noop
//
// AI 注意：
//   - uni.setStorageSync 在小程序端有大小限制（通常 10MB），仅存 token 没问题
//   - 小程序端 storage 卸载小程序后会清除，跟用户预期一致

const KEY = 'access_token';

export function getAccessToken(): string | null {
  const value = uni.getStorageSync(KEY);
  return value ? String(value) : null;
}

export function setAccessToken(token: string): void {
  uni.setStorageSync(KEY, token);
}

export function removeAccessToken(): void {
  uni.removeStorageSync(KEY);
}

export async function syncTokenFromStorage(): Promise<void> {
  // uni.setStorageSync 同步可读，无需 sync
}
