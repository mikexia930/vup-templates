---
name: token-storage
description: >-
  Use when implementing access token storage in any frontend app (vue, electron,
  capacitor, wxt, nuxt, uniapp). Defines a unified interface (getAccessToken /
  setAccessToken / removeAccessToken / syncTokenFromStorage) so the same
  http-client adapter can work across platforms. Critical for capacitor (system
  clears localStorage) and wxt (service worker has no localStorage). Loaded by
  http-client and auth skills.
---

# token-storage

跨平台 access token 存储抽象。**核心目标：让所有 stack 用同名函数，http-client /
auth skill 不需要关心底层差异**。

## 适用范围

所有 6 个前端 stack：

- **vue / electron**：`localStorage`（同步、简单）
- **capacitor**：`@capacitor/preferences`（**必须用，避免被系统清**）
- **wxt**：`browser.storage.local`（**必须用，service worker 没 localStorage**）
- **nuxt**：`useCookie`（SSR 友好）
- **uniapp**：`uni.setStorageSync`（同步可用）

## 何时被加载

- 实现 HTTP 适配层（被 `http-client` skill 引用）
- 实现登录登出流程（被 `auth` skill 引用）
- 任何需要读写用户登录态的场景

## 统一接口约定（必须遵守）

所有 stack 的 token-storage 模块必须导出**同名函数**。

### Access token（基础，必须实现）

```typescript
// 读取（同步签名，由内存缓存或同步 API 实现）
export function getAccessToken(): string | null;

// 写入（登录成功后调用）
// 同步实现返回 void，异步实现返回 Promise<void>
export function setAccessToken(token: string): void | Promise<void>;

// 删除（登出 / 401 时调用）
export function removeAccessToken(): void | Promise<void>;

// 启动同步（仅异步实现需要：从持久化加载到内存缓存）
// 同步实现可以 export 一个 noop 保持接口对齐
export function syncTokenFromStorage(): Promise<void>;
```

### Refresh token（可选，按需实现）

如使用 refresh token 自动续期，必须额外导出：

```typescript
export function getRefreshToken(): string | null;
export function setRefreshToken(token: string): void | Promise<void>;
export function removeRefreshToken(): void | Promise<void>;

// 推荐：登录成功一次写两个 token（避免应用层调两次）
export function setTokens(
  access: string,
  refresh: string
): void | Promise<void>;

// 推荐：登出 / refresh 失败时一次清两个
export function removeTokens(): void | Promise<void>;
```

实现要点：

- refresh token 必须与 access token 用**同样的存储介质**（避免一个还在一个丢了）
- 异步实现的 `syncTokenFromStorage` 必须同时加载 access + refresh 到缓存
- 详见 `auth-login` skill 的 401 自动续期方案

**为什么 getAccessToken 必须同步**：`@vup/http` 的 `getAccessToken`
配置项是同步签名（每个请求都会调用），异步会让所有请求变 await，性能不可接受。

## 关键模式：内存缓存 + 启动 sync

异步存储（capacitor / wxt）必须用此模式：

```typescript
// 1. 模块级变量做内存缓存
let cachedToken: string | null = null;

// 2. 启动时从持久化加载（在 main.ts/entrypoint 入口 await 一次）
export async function syncTokenFromStorage() {
  cachedToken = await readFromPersistentStorage();
}

// 3. 同步读：直接读缓存
export function getAccessToken() {
  return cachedToken;
}

// 4. 写：双向同步（缓存 + 持久化）
export async function setAccessToken(token: string) {
  cachedToken = token;
  await writeToPersistentStorage(token);
}
```

## 各 stack 实现要点

### vue / electron（同步 localStorage）

- 直接 `localStorage.getItem / setItem / removeItem`
- `syncTokenFromStorage` 导出一个空 async 函数（接口对齐用）
- 见 `examples/localStorage.ts`

### capacitor（必须用 Preferences）

- ⚠️ **iOS /
  Android 系统会主动清 localStorage**（OS 内存压力时），导致用户登录态凭空丢失
- 用 `@capacitor/preferences`（底层 iOS UserDefaults / Android
  SharedPreferences）
- iOS 还需在 `PrivacyInfo.xcprivacy` 声明（合规要求）
- 异步 API → 必须用"内存缓存 + 启动 sync"模式
- 见 `examples/capacitor.ts`

### wxt（必须用 browser.storage）

- ⚠️ Service worker（background）**没有 localStorage**
- 跨 context（background / popup / content / options）需共享
- 用 `browser.storage.local`（异步）
- 同样需要"内存缓存 + 启动 sync"模式
- 注意每个 entrypoint 都需要在入口 sync 一次
- 见 `examples/wxt.ts`

### nuxt（useCookie，SSR 友好）

- SSR 必须用 cookie（服务端渲染时能读到）
- `useCookie('access_token')` 是 Nuxt 内置 composable
- 同步签名，无需启动 sync
- 见 `examples/nuxt.ts`

### uniapp（uni.setStorageSync）

- `uni.setStorageSync` 是同步 API，不需要内存缓存
- 多端通用（H5 / 小程序 / App）
- 见 `examples/uniapp.ts`

## 安全提示

- `localStorage` 易被 XSS 偷取；如有高安全需求，考虑：
  - 缩短 access token 有效期（15 分钟），配合 refresh token 自动续期（详见
    `auth-login` skill）
  - Electron 场景考虑 `safeStorage`（OS 级加密，不在本 skill 范围）
  - 不要存敏感信息（如完整用户对象、密码哈希）

## 产出位置

- `apps/<app>/src/shared/utils/tokenStorage.ts` —— 统一文件名，方便 http-client
  / auth skill 引用
- 异步实现需在 `main.ts` / 各 entrypoint 入口 await `syncTokenFromStorage()`

## 引用关系

本 skill 被引用：

- `http-client` skill — 它的 request.ts 通过本 skill 提供的 `getAccessToken`
  注入 Authorization 头
- `auth` skill — 登录成功后调用 `setAccessToken`，登出/401 调用
  `removeAccessToken`

## 资源

```
token-storage/
├── SKILL.md
└── examples/
    ├── localStorage.ts       浏览器同步（vue / electron）
    ├── capacitor.ts          Preferences + 内存缓存 + 启动 sync
    ├── wxt.ts                browser.storage + 内存缓存 + 启动 sync
    ├── nuxt.ts               useCookie（SSR）
    └── uniapp.ts             uni.setStorageSync（同步）
```
