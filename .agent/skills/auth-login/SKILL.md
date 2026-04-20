---
name: auth-login
description: >-
  Use when implementing login / logout / refresh-token flow for any frontend
  app. Covers Pinia auth-store with login/logout actions, automatic 401 retry
  with refresh token, concurrent 401 deduplication via shared Promise, and
  graceful logout fallback when refresh fails. Loaded with token-storage skill
  (provides token persistence) and http-client skill (provides request layer).
  Route guarding and unauthenticated redirect are handled by auth-guard skill.
---

# auth-login

登录 / 登出 / refresh token 流程。**只管"发请求 + 写 token +
401 自动续期"**，不管路由守卫（那是 `auth-guard` skill 的事）。

## 适用范围

- vue / electron / capacitor / wxt：完整方案（含 refresh）
- nuxt：用 cookie + middleware，方案不同（详见 `examples/nuxt-login.ts`）
- uniapp：登录流程通用，路由方案不同（auth-guard 处理）

## 何时被加载

- 实现登录页 / 登出按钮
- 配置 401 自动续期
- new-project Phase 7 涉及用户认证模块

## 必须遵守

1. **token 操作必须走 token-storage skill** 提供的函数（`setTokens` /
   `removeTokens`），禁止直接 `localStorage.setItem`
2. **401 自动 refresh 必须做并发去重**：多个请求同时 401 时只发一次 refresh
3. **refresh 接口本身的请求必须跳过 401 拦截**：避免无限循环
4. **refresh 失败必须兜底**：清两个 token + 跳登录页（路由跳转由 auth-guard 处理）

## 接口契约（标准约定）

如后端实际接口与此不同，必须停下问用户：

```
POST /api/auth/login
Req:  { username: string, password: string }
Res:  { code: 0, data: { accessToken, refreshToken }, message }

POST /api/auth/refresh
Req:  { refreshToken: string }
Res:  { code: 0, data: { accessToken, refreshToken }, message }
  ↑ 推荐 refresh token 轮换：每次刷新都返回新的 refresh token

POST /api/auth/logout
Req:  {}（请求头带 Authorization）
Res:  { code: 0, data: null, message }

GET /api/auth/me
Req:  {}（请求头带 Authorization）
Res:  { code: 0, data: { id, username, ... }, message }
```

## 实现步骤

### Step 1：定义 auth API 函数

在 `src/modules/auth/api/auth.ts`
导出 4 个函数：`login / logout / refreshTokens / fetchUserInfo`。

### Step 2：实现 Pinia auth-store

参考 `examples/auth-store.ts`：

- state：`userInfo` / `isLoggedIn` （token 不放 store，从 token-storage 读）
- actions：`login / logout / refreshTokens / fetchUserInfo / initFromStorage`

### Step 3：完整 request.ts（含 refresh 拦截器）

直接参考
`examples/request-with-refresh.ts`，这是合并了 http-client 基础 + 本 skill
refresh 拦截器的**最终形态**，可直接复制到 `apps/<app>/src/api/request.ts`。

关键能力：

- 401 → 触发 refresh → 用新 token 重放原请求
- 多个请求并发 401 → 共享同一个 refresh Promise（去重）
- refresh 失败 → 调用 auth-store 的 logout（清 token + 触发跳登录）

### Step 4：在应用入口初始化

main.ts 在 router 挂载前调用
`useAuthStore().initFromStorage()`，从 token-storage 恢复登录状态。

## 401 自动 refresh 关键模式

### 并发去重（用 Promise 共享）

```typescript
let refreshing: Promise<string> | null = null;

async function getOrCreateRefreshPromise() {
  if (refreshing) return refreshing;
  refreshing = doRefresh().finally(() => {
    refreshing = null;
  });
  return refreshing;
}
```

所有 401 的请求都 `await getOrCreateRefreshPromise()`，拿到同一个新 token。

### 防无限循环

```typescript
// refresh 接口本身的请求必须跳过 401 拦截
if (originalRequest.url?.includes('/api/auth/refresh')) {
  return Promise.reject(error);
}

// 已经重试过的请求不再重试
if (originalRequest._retry) {
  return Promise.reject(error);
}
originalRequest._retry = true;
```

### 失败兜底

refresh 失败（refresh token 也过期）→ 真正登出：

```typescript
try {
  const newToken = await getOrCreateRefreshPromise();
  // 重放原请求
} catch (refreshError) {
  await useAuthStore().logout(); // 清 token + 跳登录由 auth-guard 处理
  return Promise.reject(refreshError);
}
```

## 关键决策点（AI 必须问用户）

1. **是否启用 refresh token**：
   - 启用：本 skill 完整方案
   - 不启用：删除 refresh 部分，401 直接 logout
2. **后端接口字段名**：是否符合标准约定（驼峰 / accessToken）？
3. **refresh token 轮换**：refresh 接口是否返回新 refresh token？
4. **登录后是否立即拉用户信息**：还是延迟到首次进入需要的页面？
5. **登出是否调用后端接口**：还是仅前端清 token？（影响是否需要 logout API）

## 产出位置

- API 函数：`apps/<app>/src/modules/auth/api/auth.ts`
- Store：`apps/<app>/src/stores/auth.ts`（全局 store，不放 modules）
- 拦截器：`apps/<app>/src/api/request.ts`（扩展现有文件）
- 入口初始化：`apps/<app>/src/main.ts`

## 引用关系

本 skill 引用：

- `token-storage` skill — 提供 `setTokens / removeTokens / getRefreshToken` 等
- `http-client` skill — 提供基础 request 实例（被本 skill 用拦截器扩展）

本 skill 被引用：

- `auth-guard` skill — 路由守卫调用 store 判断登录态、触发 logout
- `login-page` pattern — 登录页 UI 调用 `authStore.login()`

## 资源

```
auth-login/
├── SKILL.md
└── examples/
    ├── auth-store.ts              Pinia store + actions（vue/electron/capacitor 共用）
    ├── request-with-refresh.ts    完整 request.ts（http-client 基础 + 401 refresh）
    └── nuxt-login.ts              Nuxt 特殊方案（cookie + ofetch）
```
