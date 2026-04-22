// 范例：apps/<app>/src/stores/auth.ts
//
// 适用：vue / electron / capacitor 共用
// 角色：全局 auth store（管登录状态 + 用户信息）
//
// 关键设计：
//   - token 不放 store，从 token-storage 读（避免双源不一致）
//   - userInfo 才放 store（需要响应式）
//   - login / logout 是 actions，封装完整流程
//
// AI 使用：参考结构与命名风格，按当前 app 的接口契约调整

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  getAccessToken,
  setTokens,
  removeTokens,
  syncTokenFromStorage,
} from '@/common/utils/tokenStorage';
import {
  login as loginApi,
  logout as logoutApi,
  refreshTokens as refreshApi,
  fetchUserInfo as meApi,
} from '@/modules/auth/api/auth';

export interface UserInfo {
  id: number;
  username: string;
  // ...其他字段按 me 接口实际返回
}

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref<UserInfo | null>(null);

  // 登录状态：以 token 是否存在为准（避免 store 状态与 token 不一致）
  const isLoggedIn = computed(() => !!getAccessToken());

  // 应用启动时调用：从 token-storage 恢复登录态
  // capacitor / wxt 的 storage 是异步的，此处必须 await
  async function initFromStorage() {
    await syncTokenFromStorage();
    if (getAccessToken()) {
      // 已登录：拉一下用户信息（异常时静默清登录态）
      try {
        await fetchUserInfo();
      } catch {
        await logout();
      }
    }
  }

  async function login(username: string, password: string) {
    const { accessToken, refreshToken } = await loginApi({ username, password });
    await setTokens(accessToken, refreshToken);
    await fetchUserInfo();
  }

  async function logout() {
    // 后端 logout 失败不阻塞前端清理（用户可能已经无网络）
    try {
      if (getAccessToken()) await logoutApi();
    } catch {
      // 静默：前端清理优先
    }
    await removeTokens();
    userInfo.value = null;
    // 路由跳转由 auth-guard skill 触发（监听 isLoggedIn 或拦截路由）
  }

  async function fetchUserInfo() {
    userInfo.value = await meApi();
  }

  // 由 refresh-interceptor 调用，仅刷新 token，不动 userInfo
  async function refreshTokens() {
    const refresh = await refreshApi();
    await setTokens(refresh.accessToken, refresh.refreshToken);
    return refresh.accessToken;
  }

  return {
    userInfo,
    isLoggedIn,
    initFromStorage,
    login,
    logout,
    fetchUserInfo,
    refreshTokens,
  };
});
