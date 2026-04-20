// 范例：apps/<wxt-extension>/src/shared/utils/tokenStorage.ts
//
// 适用：wxt（浏览器扩展）
// 底层：browser.storage.local
//
// ⚠️ 关键：扩展必须用 browser.storage，不能用 localStorage
//   原因 1：service worker（background）没有 localStorage
//   原因 2：popup / content / options / background 各 context 需共享数据
//   原因 3：localStorage 在某些 context 下不持久（content script 在页面刷新时丢）
//
// ⚠️ 多 entrypoint 注意：每个 entrypoint（background / popup / options / ...）
//   都需要在自己的入口 await syncTokenFromStorage() 一次。
//   或者推荐：所有 HTTP 请求统一从 background 发，其他 context 通过
//   browser.runtime.sendMessage 转发。
//
// 调用时机：
//   - syncTokenFromStorage：每个 entrypoint 入口 await 一次
//   - getAccessToken：每次 HTTP 请求自动调用（同步读缓存）
//   - setAccessToken：登录成功后 await 调用
//   - removeAccessToken：登出 / 收到 401 时 await 调用

import { browser } from 'wxt/browser';

const KEY = 'access_token';

// 每个 context 各自维护缓存（无法共享内存）
let cachedToken: string | null = null;

export function getAccessToken(): string | null {
  return cachedToken;
}

export async function setAccessToken(token: string): Promise<void> {
  cachedToken = token;
  await browser.storage.local.set({ [KEY]: token });
}

export async function removeAccessToken(): Promise<void> {
  cachedToken = null;
  await browser.storage.local.remove(KEY);
}

export async function syncTokenFromStorage(): Promise<void> {
  const result = await browser.storage.local.get(KEY);
  cachedToken = (result[KEY] as string) ?? null;
}

// 可选：监听其他 context 的变化（保持多 context 缓存一致）
// AI 注意：仅在需要跨 context 实时同步时启用
//
// browser.storage.onChanged.addListener((changes, area) => {
//   if (area === 'local' && changes[KEY]) {
//     cachedToken = (changes[KEY].newValue as string) ?? null;
//   }
// });
