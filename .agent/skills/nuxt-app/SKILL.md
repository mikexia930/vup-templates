---
name: nuxt-app
description: >-
  Use when implementing features in nuxt-template projects (Nuxt 4 SSR/SSG).
  Covers nuxt-specific concerns: file-system routing, auto-imports,
  useFetch/$fetch/ofetch, middleware, server routes, Nuxt modules. For
  cross-platform concerns, load the corresponding capability skills.
---

# nuxt-app

基于 `nuxt-template` 的 Nuxt 4 应用开发。**只管 Nuxt 平台特有的事**。

## 适用场景

- SSR / SSG 网站、SEO 敏感页面、内容型应用
- 对应目录：`apps/<nuxt-app>/`

## 何时被加载

- new-project Phase 7 选定 nuxt 栈
- new-feature 在 nuxt 项目中加新页面 / 功能
- maintenance 修 nuxt 项目 bug

## 引用的 capability skills

| 能力         | 加载哪个 skill                            | Nuxt 特殊说明          |
| ------------ | ----------------------------------------- | ---------------------- |
| HTTP 请求    | ❌ **不用 http-client**                   | Nuxt 用 ofetch，见下方 |
| Token 存储   | `token-storage`（nuxt.ts: useCookie）     |                        |
| 登录 / 登出  | `auth-login`（nuxt-login.ts）             |                        |
| 路由守卫     | `auth-guard`（nuxt-middleware.ts）        |                        |
| API 文件组织 | `api-layer`（Nuxt 例外段）                |                        |
| 权限         | `permission-rbac`（部分适用）             | 动态路由需适配         |
| UI 组件      | `vup-ui`（@vup/ui 或 @element-plus/nuxt） |                        |

## Nuxt 平台特有约定

### 1. HTTP 请求：ofetch（不用 @vup/http）

Nuxt 使用 ofetch / `$fetch` / `useFetch`，**不使用 axios / @vup/http**。

```typescript
// SSR 安全的请求方式
const { data } = await useFetch('/api/users');

// 在 composable / store 中
const data = await $fetch('/api/users');
```

适配层在 `src/api/request.ts`（ofetch.create），详见基座已有代码。

### 2. 文件系统路由

```
src/pages/
├── index.vue           → /
├── login.vue           → /login
├── users/
│   ├── index.vue       → /users
│   └── [id].vue        → /users/:id
└── demo.vue            → /demo
```

- 路由由文件系统自动生成，**不手动写 routes**
- 动态参数用 `[id].vue`，catch-all 用 `[...slug].vue`

### 3. auto-import

Nuxt 自动导入：

- `vue` API（ref / computed / watch ...）
- `nuxt` API（useFetch / useRuntimeConfig / navigateTo / useCookie ...）
- `composables/` 目录下所有导出
- `utils/` 目录下所有导出
- `components/` 目录下所有组件

**不需要手动 import 以上内容。**

### 4. middleware（路由中间件）

```
src/middleware/
├── auth.global.ts      → 全局守卫（.global 后缀）
└── admin.ts            → 命名中间件（页面用 definePageMeta 引用）
```

全局中间件详见 `auth-guard` skill 的 `nuxt-middleware.ts`。

### 5. server routes（API routes）

```
src/server/
├── api/
│   └── hello.get.ts    → GET /api/hello
└── middleware/
    └── auth.ts         → 服务端中间件
```

注意：server routes 跑在 Nitro（Node 端），与前端代码完全隔离。

### 6. 环境变量

```bash
# nuxt.config.ts runtimeConfig
NUXT_PUBLIC_API_BASE=https://api.example.com   # 客户端可见
NUXT_SECRET_KEY=xxx                             # 仅服务端可见
```

客户端读取：`useRuntimeConfig().public.apiBase`
服务端读取：`useRuntimeConfig().secretKey`

### 7. Nuxt modules

基座已配置：

- `@pinia/nuxt` — Pinia 状态管理
- `@nuxtjs/i18n` — 国际化
- `@element-plus/nuxt` — Element Plus 按需导入

### 8. 模块化（与 Vue 不同）

Nuxt 的 `pages/` `components/` `composables/` 是框架约定目录，
**不能移入 modules/**。模块化体现在：

- 业务 store 按模块拆分到 `stores/<module>/`
- 业务 API 按模块拆分到 `api/<module>.ts`
- 详见 `.agent/rules/module-structure.md` Nuxt 例外段

## 实现新页面的步骤

1. 与用户确认页面路径和功能
2. 在 `src/pages/` 创建对应 `.vue` 文件（路由自动生成）
3. 按 `api-layer` skill 创建 API 文件（放 `src/api/`）
4. 如需状态管理，在 `src/stores/` 创建 store
5. 每完成一个文件 Gate 一次

## 关键决策点（AI 必须问用户）

1. **SSR 还是 SSG**：`nuxt generate` 还是 `nuxt build`？
2. **是否需要 server routes**：前后端分离还是 Nuxt 全栈？
3. **SEO 要求**：哪些页面需要 SSR（useFetch），哪些纯客户端（`<ClientOnly>`）？

## 产出位置

- 页面：`apps/<nuxt>/src/pages/`
- API：`apps/<nuxt>/src/api/<resource>.ts`
- Store：`apps/<nuxt>/src/stores/<module>/`
- Middleware：`apps/<nuxt>/src/middleware/`

## 资源

```
nuxt-app/
└── SKILL.md            本文件
```

Nuxt 官方文档：https://nuxt.com/docs
