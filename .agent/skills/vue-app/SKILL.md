---
name: vue-app
description: >-
  Use when implementing features in vue-template projects (Vue3 + Vite SPA).
  Covers vue-specific concerns: router factory, auto-import, layouts, vite
  proxy/env. For cross-platform concerns (HTTP, token, auth, permissions, API
  layer, UI), load the corresponding capability skills instead of
  reimplementing.
---

# vue-app

基于 `vue-template` 的 Vue3 SPA 开发。**只管 Vue 平台特有的事**。

## 适用场景

- 管理后台 / Dashboard / 官网 / Web SPA
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

### 2. 路由工厂

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

export default function router(baseRoute = '/') {
  return createRouter({
    history: createWebHistory(baseRoute),
    routes,
  });
}
```

- 静态路由（登录 / 404）写在 `routes.ts`
- 动态路由通过 `router.addRoute()` 注入（见 `permission-rbac` skill）

### 3. 开发代理

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

### 4. 环境变量

```bash
# .env.development
VITE_API_BASE=http://localhost:3000

# .env.production
VITE_API_BASE=https://api.example.com
```

前端变量前缀必须为 `VITE_`（Vite 约定）。

### 5. 布局

后台类应用推荐使用 `AdminLayout.vue`（见 `admin-layout` pattern）：

```
src/layouts/
└── AdminLayout.vue     侧边栏 + 顶栏 + 内容区
```

### 6. i18n（模块化自动聚合）

#### 目录结构

```
src/locales/
├── index.ts              # i18n 实例
├── zh-CN.ts              # 聚合器：common + 自动扫描 modules/*
├── en-US.ts
└── common/               # 全局通用文案（命名空间 `common`）
    ├── zh-CN.ts
    └── en-US.ts

src/modules/<name>/locales/   # 模块文案（命名空间 = 模块名，自动注册）
├── zh-CN.ts
└── en-US.ts
```

#### 命名空间约定

| 文案位置                               | 调用方式                      |
| -------------------------------------- | ----------------------------- |
| `src/locales/common/<lang>.ts`         | `t('common.xxx')`             |
| `src/modules/<name>/locales/<lang>.ts` | `t('<name>.xxx')`（自动注册） |

聚合器使用 `import.meta.glob('../modules/*/locales/<lang>.ts')`
编译期静态扫描，**新增模块零改动自动生效**。

#### 文件命名规范

**必须用 BCP 47 中划线格式**：`zh-CN.ts` /
`en-US.ts`，**不要**用 Java/POSIX 下划线（`zh_CN`）。

理由：BCP 47 是 W3C / IETF 标准，与 HTML `lang` 属性、HTTP
`Accept-Language`、`navigator.language`、`Intl` API 全部对齐。

#### ⚠️ import.meta.glob 不支持 alias

聚合器中**必须用相对路径** `../modules/...`，不能用 `@/modules/...`。Vite 的
`import.meta.glob` 是编译期静态分析，不解析路径别名。

#### 使用

```typescript
const { t } = useI18n(); // useI18n 已 auto-import
t('common.empty.title');
t('demo.layout.title');
```

#### 添加新模块文案

直接在 `modules/<name>/locales/` 下补 `zh-CN.ts` / `en-US.ts` 即可，**无需在
`locales/index.ts` 注册**。

### 7. 构建

```bash
pnpm --filter <app-name> build     # 产物输出到 .output/
```

已配置 `manualChunks`：`vendor`（vue/router/pinia）和
`utils`（lodash-es/dayjs）自动拆包。

## 实现新模块的步骤

1. 与用户确认模块名（中英文对照）
2. 创建 `src/modules/<name>/`，含 `views/` `components/` `stores/` `api/`
   `locales/`；如存在模块级共享领域类型，再创建 `types/`
3. 在 `router/routes.ts` 添加路由（或由 permission-rbac 动态注入）
4. 按 `api-layer` skill 创建 API 文件；接口请求 / 响应类型跟 `api`
   走，只有模块级共享类型才放 `types/`
5. 按 `vup-ui` skill 选择 UI 组件
6. 在 `locales/<lang>.ts` 写文案，**无需手动注册**（自动聚合）
7. 每完成一个文件 Gate 一次

## 关键决策点（AI 必须问用户）

1. **后台布局**：用 `admin-layout` pattern 还是自定义布局？
2. **路由模式**：静态路由（简单项目）还是动态路由（RBAC 权限项目）？
3. **是否需要专项能力**：若用户提到 mock / pwa / qiankun，优先引导到 `examples/`
   或对应专项 skill，而不是默认塞进 `vue-template`

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
