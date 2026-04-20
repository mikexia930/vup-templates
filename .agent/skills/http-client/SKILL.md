---
name: http-client
description: >-
  Use when implementing HTTP request layer in vue / electron / capacitor / wxt
  apps. Standard practice: use the shared @vup/http package, never re-wrap
  axios. Guides AI to create the per-app adapter (src/api/request.ts) and
  module-level API functions. Token storage is delegated to the token-storage
  skill; locale and router behavior are delegated to each stack skill.
---

# http-client

`@vup/http` 跨平台接入。**核心原则：用 `@vup/http`，不重复造轮子**。

## 适用范围

仅适用以下 4 个 stack（基座已声明 `@vup/http` 依赖或将按需引入）：

- **vue** / **electron** / **capacitor**：基座已默认接入
- **wxt**：按需接入（需要发请求时引入 `@vup/http`）

## 不适用范围（走各自 stack skill）

- **nuxt**：使用 `ofetch`（Nuxt 原生 + SSR 友好），见 `nuxt-app` skill
- **uniapp**：基座未规定方案，详见 `uniapp-app` skill 与用户确认
- **qiankun**：是微前端主应用，子应用各自处理 HTTP
- **mcp**：是 MCP 服务，与 HTTP client 无关

## 何时被加载

- new-project Phase 7 实现 API 层（4 个适用 stack 之一）
- new-feature 在 vue/electron/capacitor/wxt 项目中加新模块的接口
- maintenance 改 HTTP 相关 bug

## 必须遵守

1. **统一使用 `@vup/http`**：通过 `createHttpClient`
   创建实例，**禁止重新封装 axios**
2. **应用侧只写薄适配层**：每个 app 在 `src/api/request.ts` 写约 30 行
3. **平台细节委托其他 skill**：
   - token 存取 → `token-storage` skill
   - locale 来源 → 各 stack skill 的 i18n 章节
   - 401 路由跳转 → 各 stack skill 的 router 章节
4. **业务接口跟模块走**：模块接口写在 `src/modules/<name>/api/<name>.ts`
5. 详细请求治理规则见 `.agent/rules/http-request-governance.md`
6. 包能力详细 API 见 `packages/http/README.md`

## 实现步骤

### Step 1：确认 app 已声明依赖

应用 `package.json` 必须有：

```json
{
  "dependencies": {
    "@vup/http": "workspace:*"
  }
}
```

如缺失（如 wxt 默认无），跟用户确认后追加并 `pnpm install`。

### Step 2：创建适配层 src/api/request.ts

参考 `examples/request.ts` 的结构。**不要直接复制**，需要：

- token 函数从 `@/shared/utils/tokenStorage` 导入（先按 token-storage
  skill 实现该文件）
- locale 来源按当前 app 的 i18n 方案实现
- 401 跳转按当前 app 的路由方案实现

### Step 3：创建通用类型 src/api/types.ts（如不存在）

```typescript
// 直接从 @vup/http re-export，避免类型定义漂移
export type { ApiResponse } from '@vup/http';

// 可在此扩展项目特定的通用类型，如分页
export interface PageResult<T> {
  list: T[];
  total: number;
  page: number;
  size: number;
}
```

### Step 4：实现模块接口

参考 `examples/module-api/user.ts`。每个模块在
`src/modules/<name>/api/<name>.ts` 导出具名函数。

## 关键决策点（AI 必须问用户）

1. **baseURL 来源**：环境变量名是什么？（VITE_API_BASE / 自定义）
2. **401 行为**：直接跳 `/login`？弹窗 refresh token？还是 toast 提示？
3. **业务错误码约定**：成功码是 `0` 还是别的？需要自定义 `isSuccessCode` 吗？
4. **是否启用 strictResponse**：默认 `true`（推荐），允许放宽吗？

## 产出位置

- 适配层：`apps/<app>/src/api/request.ts`
- 通用类型：`apps/<app>/src/api/types.ts`
- 模块接口：`apps/<app>/src/modules/<name>/api/<name>.ts`

## 引用关系

本 skill 引用：

- `token-storage` skill — 由它提供
  `getAccessToken / setAccessToken / removeAccessToken`
- `.agent/rules/http-request-governance.md` — 始终生效的请求治理规范
- `packages/http/README.md` — `@vup/http` 包的完整 API

本 skill 被引用：

- `vue-app` / `electron-app` / `capacitor-app` / `wxt-extension` stack
  skills（实现 HTTP 层时加载）
- `api-layer` skill（组织模块接口时加载）
- `crud-page` pattern（实现增删改查时加载）

## 资源

```
http-client/
├── SKILL.md
└── examples/
    ├── request.ts              通用适配层骨架（4 stack 共用）
    └── module-api/
        └── user.ts             典型模块接口写法
```
