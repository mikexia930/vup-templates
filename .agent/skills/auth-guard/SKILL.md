---
name: auth-guard
description: >-
  Use when implementing route guarding / unauthenticated redirect for any
  frontend app. Covers vue-router beforeEach guard (shared by
  vue/electron/capacitor), Nuxt route middleware, wxt cross-context login state
  sync. Includes "redirect back to original page after login" pattern. Loaded
  with auth-login skill (provides login state) and token-storage skill (reads
  access token).
---

# auth-guard

路由守卫 / 未登录跳转。**只管"拦路 + 重定向"**，不管登录请求 / token 操作（那是
`auth-login` skill 的事）。

## 适用范围

- vue / electron / capacitor：用 vue-router 的 `beforeEach`
- nuxt：用 route middleware
- wxt：用跨 context 消息同步登录态（特殊场景）
- uniapp：用 `pages.json` + `onShow` 拦截（在 `uniapp-app` stack skill 处理）

## 何时被加载

- 实现路由白名单 / 黑名单
- 添加未登录跳登录页
- 配置已登录后访问 /login 跳首页
- new-project Phase 7 涉及多页面应用

## 必须遵守

1. **登录态判断必须读 token-storage**（`getAccessToken()`），不要自建状态
2. **未登录跳转必须保留原路径**（`?redirect=/users`），登录后回到原页面
3. **守卫逻辑放路由配置同级文件**，不要散落到各业务模块
4. **白名单要显式声明**（如 `/login` `/register`），避免遗漏导致死循环

## 标准守卫模式

### 拦截流程

```
用户访问 /users
  ↓
守卫检查：是否在白名单？
  ├─ 是（如 /login）→ 放行
  │   └─ 已登录 → 跳首页（避免登录后还能进登录页）
  └─ 否（如 /users）
      ├─ 已登录 → 放行
      └─ 未登录 → 跳 /login?redirect=/users
                    ↓
            登录成功 → 读 query.redirect → 跳回 /users
```

### 白名单设计

推荐放在常量文件统一管理：

```typescript
export const WHITELIST = ['/login', '/register', '/forgot-password'];
```

## 各 stack 实现要点

### vue / electron / capacitor（vue-router 共用）

- 在 `src/router/index.ts` 用 `router.beforeEach`
- 见 `examples/vue-router-guard.ts`
- 登录页登录成功后用 `router.push(route.query.redirect || '/')`

### nuxt（route middleware）

- 用 `defineNuxtRouteMiddleware`，在 `middleware/auth.global.ts`
- SSR 环境下 cookie 同时在服务端可读
- 见 `examples/nuxt-middleware.ts`

### wxt（跨 context 同步）

- 浏览器扩展无传统路由，但 popup / options 各 entrypoint 需要判断登录态
- 用 `browser.storage.onChanged` 监听 token 变化，跨 context 同步
- 用 `browser.runtime.sendMessage`
  通知其他 context（如 background 触发全局登出）
- 见 `examples/wxt-context-sync.ts`

## 关键决策点（AI 必须问用户）

1. **白名单清单**：除登录页外，还有哪些页面无需登录？（注册/忘记密码/隐私政策/...）
2. **登录后默认跳转**：如果没有 redirect query，跳哪？（首页 `/` 还是 dashboard
   `/home`）
3. **是否需要"已登录禁止访问 /login"**：通常需要（避免用户登录后还看到登录页）
4. **未登录访问受限页时**：直接跳登录，还是先弹提示再跳？

## 产出位置

- vue 系：`apps/<app>/src/router/index.ts`（或拆 `src/router/guard.ts`）
- Nuxt：`apps/<nuxt>/middleware/auth.global.ts`
- wxt：`apps/<wxt>/src/common/utils/authSync.ts`

## 引用关系

本 skill 引用：

- `token-storage` skill — `getAccessToken()` 判断登录态
- `auth-login` skill — 登录页的 `useAuthStore().login()` 后路由跳转配合本 skill

本 skill 被引用：

- `login-page` pattern — 登录页 login 成功后读 redirect query 跳转
- `admin-layout` pattern — 后台页面默认受保护

## 资源

```
auth-guard/
├── SKILL.md
└── examples/
    ├── vue-router-guard.ts        vue-router beforeEach（vue/electron/capacitor 共用）
    ├── nuxt-middleware.ts         Nuxt route middleware
    └── wxt-context-sync.ts        wxt 跨 context 同步登录态
```
