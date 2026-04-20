---
name: vue-app
description: >-
  Use when implementing features in vue-template projects (Vue3 + Vite SPA).
  Covers vue-specific concerns: router factory, auto-import, qiankun
  compatibility, layouts, vite proxy/env. For cross-platform concerns (HTTP,
  token, auth, permissions, API layer, UI), load the corresponding capability
  skills instead of reimplementing.
---

# vue-app

基于 `vue-template` 的 Vue3 SPA 开发。**只管 Vue 平台特有的事**。

## 适用场景

- 管理后台 / Dashboard / 官网 / Web SPA
- qiankun 微前端子应用
- 对应目录：`apps/<vue-app>/`

## 何时被加载

- new-project Phase 7 选定 vue 栈
- new-feature 在 vue 项目中加新模块 / 页面
- maintenance 修 vue 项目 bug

## 引用的 capability skills（不在本 skill 重复）

| 能力                       | 加载哪个 skill                        |
| -------------------------- | ------------------------------------- |
| HTTP 请求                  | `http-client`（@vup/http）            |
| Token 存储                 | `token-storage`（localStorage 实现）  |
| 登录 / 登出 / refresh      | `auth-login`                          |
| 路由守卫                   | `auth-guard`（vue-router beforeEach） |
| API 文件组织               | `api-layer`                           |
| 权限 / 动态路由 / 按钮权限 | `permission-rbac`                     |
| UI 组件                    | `vup-ui`（@vup/ui，V\* 前缀）         |

**AI 在实现上述功能时，必须加载对应 capability skill，不要在本 skill 内重写。**

## Vue 平台特有约定

### 1. auto-import（unplugin-auto-import）

以下 API 已全局可用，**不要手动 import**：

- `vue`：ref / computed / watch / onMounted / ...
- `vue-router`：useRouter / useRoute
- `pinia`：defineStore / storeToRefs
- `vue-i18n`：useI18n

详见 `.agent/rules/typescript.md`。

### 2. 路由工厂（qiankun 兼容）

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

// baseRoute 参数支持 qiankun 传入子路径
export default function router(baseRoute = '/') {
  return createRouter({
    history: createWebHistory(baseRoute),
    routes,
  });
}
```

- 静态路由（登录 / 404）写在 `routes.ts`
- 动态路由通过 `router.addRoute()` 注入（见 `permission-rbac` skill）

### 3. qiankun 微前端

`main.ts` 默认包含 qiankun 子应用兼容代码（`vite-plugin-qiankun`）。

若不需要微前端：

- 删除 `main.ts` 中 qiankun 相关代码
- 删除 `vite.config.js` 中 `qiankun()` 插件
- `router/index.ts` 的 `baseRoute` 参数简化为固定值

### 4. 开发代理

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: process.env.VITE_API_BASE || 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

### 5. 环境变量

```bash
# .env.development
VITE_API_BASE=http://localhost:3000
VITE_ENABLE_MOCK=true

# .env.production
VITE_API_BASE=https://api.example.com
```

前端变量前缀必须为 `VITE_`（Vite 约定）。

### 6. 布局

后台类应用推荐使用 `AdminLayout.vue`（见 `admin-layout` pattern）：

```
src/layouts/
└── AdminLayout.vue     侧边栏 + 顶栏 + 内容区
```

### 7. i18n

- 全局文案：`src/locales/`
- 模块文案：`src/modules/<name>/locales/`（跟模块走）
- 使用 `vue-i18n`，auto-import 后直接 `const { t } = useI18n()`

### 8. 构建

```bash
pnpm --filter <app-name> build     # 产物输出到 .output/
```

已配置 `manualChunks`：`vendor`（vue/router/pinia）和
`utils`（lodash-es/dayjs）自动拆包。

## 实现新模块的步骤

1. 与用户确认模块名（中英文对照）
2. 创建 `src/modules/<name>/`，含 `views/` `components/` `stores/` `api/`
   `types/`
3. 在 `router/routes.ts` 添加路由（或由 permission-rbac 动态注入）
4. 按 `api-layer` skill 创建 API 文件
5. 按 `vup-ui` skill 选择 UI 组件
6. 每完成一个文件 Gate 一次

## 关键决策点（AI 必须问用户）

1. **是否需要 qiankun 微前端**：保留还是删除兼容代码？
2. **后台布局**：用 `admin-layout` pattern 还是自定义布局？
3. **是否启用 mock**：`VITE_ENABLE_MOCK=true`（默认开启）？
4. **路由模式**：静态路由（简单项目）还是动态路由（RBAC 权限项目）？

## 产出位置

- 模块代码：`apps/<app>/src/modules/<name>/`
- 全局 store：`apps/<app>/src/stores/`（仅 auth / permission / app）
- 路由：`apps/<app>/src/router/routes.ts`
- 布局：`apps/<app>/src/layouts/`

## 资源

```
vue-app/
└── SKILL.md            本文件（无 examples，平台特有内容已内嵌）
```

跨平台能力全部引用 capability skills，不在此重复。
