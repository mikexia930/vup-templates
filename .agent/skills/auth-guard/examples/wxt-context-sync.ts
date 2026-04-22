// 范例：apps/<wxt-extension>/src/common/utils/authSync.ts
//
// 适用：wxt（浏览器扩展）
// 角色：跨 context 同步登录态 + popup/options 内的登录守卫
//
// 与传统 SPA 的区别：
//   - 浏览器扩展无传统路由（无 vue-router/Nuxt）
//   - popup / options / background / content 各 context 内存独立，
//     必须用 storage + 消息共享登录态
//   - 通常 popup / options 内有 vue-router 子路由，可在自己的入口加守卫
//
// 关键设计：
//   - 监听 browser.storage.onChanged：当 access_token 变化时，所有 context 同步缓存
//   - 收到 'auth:logout' 消息：所有 context 清缓存 + 跳登录页
//   - background 是事实源（推荐 HTTP 请求统一从 background 发）
//
// AI 使用：把以下函数加入 src/common/utils/authSync.ts
//   各 entrypoint 入口（popup/options/background）都要 setupAuthSync()

import { browser } from 'wxt/browser';
import { syncTokenFromStorage, removeAccessToken } from './tokenStorage';

// 登录态变化的回调（业务方可订阅）
type AuthChangeListener = (isLoggedIn: boolean) => void;
const listeners = new Set<AuthChangeListener>();

export function onAuthChange(listener: AuthChangeListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notifyChange(isLoggedIn: boolean) {
  listeners.forEach((fn) => fn(isLoggedIn));
}

// 在每个 entrypoint 入口调用一次
export async function setupAuthSync() {
  // 1. 启动时从 storage 同步缓存
  await syncTokenFromStorage();

  // 2. 监听 storage 变化（其他 context 改了 token，本 context 同步）
  browser.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    if (!changes.access_token) return;

    const newValue = changes.access_token.newValue as string | undefined;
    notifyChange(!!newValue);
  });

  // 3. 监听全局登出消息（任何 context 都可以触发）
  browser.runtime.onMessage.addListener((message: { type: string }) => {
    if (message?.type === 'auth:logout') {
      void removeAccessToken();
      notifyChange(false);
    }
  });
}

// 触发全局登出（任何 context 都可以调用）
export async function broadcastLogout() {
  await removeAccessToken();
  await browser.runtime.sendMessage({ type: 'auth:logout' });
}

// ============ popup / options 内 vue-router 守卫 ============
//
// 如果 popup / options 用了 vue-router，可在路由配置追加守卫：
//
// import { getAccessToken } from './tokenStorage';
//
// router.beforeEach((to) => {
//   if (to.path === '/login') return true;
//   if (getAccessToken()) return true;
//   return { path: '/login', query: { redirect: to.fullPath } };
// });
//
// 入口（如 entrypoints/popup/main.ts）：
//   import { setupAuthSync } from '@/common/utils/authSync';
//   await setupAuthSync();
//   // ... 创建 Vue app
