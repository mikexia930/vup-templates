// 范例：apps/<app>/src/router/index.ts（在 createRouter 之后追加守卫）
//
// 适用：vue / electron / capacitor 共用
// 角色：未登录拦截 + 登录后回原路 + 已登录禁止访问 /login
//
// 关键设计：
//   - 登录态判断走 token-storage 的 getAccessToken（不自建状态）
//   - 未登录跳转保留原路径到 query.redirect
//   - 白名单显式声明，避免遗漏导致死循环
//
// AI 使用：把守卫部分追加到当前 app 的 router/index.ts
//   登录页 login 成功后调用：
//     router.push((route.query.redirect as string) || '/')

import { createRouter, createWebHistory } from 'vue-router';
import type { RouteLocationNormalized } from 'vue-router';
import { getAccessToken } from '@/shared/utils/tokenStorage';

// 白名单：无需登录即可访问
const WHITELIST = ['/login', '/register', '/forgot-password'];

// 已登录用户访问这些页面 → 跳首页
const AUTH_ONLY_REDIRECT = ['/login', '/register'];

// 默认登录后跳转目标（如 query.redirect 为空）
const DEFAULT_HOME = '/';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // ...路由配置
  ],
});

router.beforeEach((to: RouteLocationNormalized) => {
  const isLoggedIn = !!getAccessToken();
  const inWhitelist = WHITELIST.includes(to.path);

  // 已登录访问 /login /register → 跳首页（避免登录后还能进登录页）
  if (isLoggedIn && AUTH_ONLY_REDIRECT.includes(to.path)) {
    return DEFAULT_HOME;
  }

  // 白名单 / 已登录 → 放行
  if (inWhitelist || isLoggedIn) return true;

  // 未登录访问受限页 → 跳登录，保留原路径
  return {
    path: '/login',
    query: { redirect: to.fullPath },
  };
});

export default router;

// ============ 登录页配套用法 ============
//
// 在登录页 LoginPage.vue 的 login 成功后：
//
// import { useRoute, useRouter } from 'vue-router';
// import { useAuthStore } from '@/stores/auth';
//
// const route = useRoute();
// const router = useRouter();
// const authStore = useAuthStore();
//
// async function handleLogin() {
//   await authStore.login(form.username, form.password);
//   const redirect = (route.query.redirect as string) || '/';
//   router.replace(redirect);  // 用 replace 避免登录页留在历史栈
// }
