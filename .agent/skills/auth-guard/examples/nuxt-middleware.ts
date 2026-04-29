// 范例：apps/<nuxt-app>/src/middleware/auth.global.ts
//
// 适用：nuxt（SSR + cookie + middleware）
// 角色：未登录拦截 + 登录后回原路 + 已登录禁止访问 /login
//
// 与 vue 系的区别：
//   - 用 defineNuxtRouteMiddleware（而非 router.beforeEach）
//   - 文件名以 .global.ts 结尾 → 自动应用到所有路由
//   - useCookie 同时在 SSR + CSR 可用，无需特殊处理
//   - 用 navigateTo 跳转（而非 router.push）
//
// AI 使用：直接放到 src/middleware/auth.global.ts，全局自动生效

const WHITELIST = ['/login', '/register', '/forgot-password'];
const AUTH_ONLY_REDIRECT = ['/login', '/register'];
const DEFAULT_HOME = '/';

export default defineNuxtRouteMiddleware((to) => {
  const accessToken = useCookie('access_token');
  const isLoggedIn = !!accessToken.value;
  const inWhitelist = WHITELIST.includes(to.path);

  // 已登录访问 /login /register → 跳首页
  if (isLoggedIn && AUTH_ONLY_REDIRECT.includes(to.path)) {
    return navigateTo(DEFAULT_HOME);
  }

  // 白名单 / 已登录 → 放行
  if (inWhitelist || isLoggedIn) return;

  // 未登录访问受限页 → 跳登录，保留原路径
  return navigateTo({
    path: '/login',
    query: { redirect: to.fullPath },
  });
});

// ============ 登录页配套用法 ============
//
// 在登录页 pages/login.vue 的 login 成功后：
//
// const route = useRoute();
// const auth = useAuth();
//
// async function handleLogin() {
//   await auth.login(form.username, form.password);
//   const redirect = (route.query.redirect as string) || '/';
//   await navigateTo(redirect, { replace: true });
// }
