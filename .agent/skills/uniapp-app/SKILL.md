---
name: uniapp-app
description: >-
  Use when implementing features in uniapp-template projects (uni-app + Vue3).
  Covers uniapp-specific concerns: pages.json routing, conditional compilation,
  multi-platform APIs (H5/WeChat Mini/Alipay Mini/App), platform storage,
  lifecycle hooks, and the template's modular architecture (modules / common /
  libs). For cross-platform concerns shared with other stacks, load the
  corresponding capability skills.
---

# uniapp-app

基于 `uniapp-template`
的多端应用开发。**只管 uni-app 平台特有的事 + 本模板已固化的架构约定**。

## 适用场景

- 微信 / 支付宝 / 抖音 / 百度 / QQ / 小红书 / 飞书 / 快手 / 京东小程序
- H5 移动端页面
- App（通过 uni-app 打包，iOS / Android / 鸿蒙）
- 一套代码多端发布
- 对应目录：`apps/<uniapp-app>/`

## 何时被加载

- new-project Phase 7 选定 uniapp 栈
- new-feature 在 uniapp 项目中加功能
- maintenance 修 uniapp 项目 bug

## 引用的 capability skills

| 能力         | 加载哪个 skill                                   | uniapp 特殊说明                                      |
| ------------ | ------------------------------------------------ | ---------------------------------------------------- |
| HTTP 请求    | ❌ **不用 http-client**                          | 模板已自带 `libs/http/` + `common/api/` 三层封装     |
| Token 存储   | `token-storage`（uniapp.ts: uni.setStorageSync） |                                                      |
| 登录 / 登出  | `auth-login`（流程通用，路由跳转用 uni API）     |                                                      |
| 路由守卫     | ❌ **不用 auth-guard**                           | uni-app 无 vue-router，用 onShow / addInterceptor    |
| API 文件组织 | ❌ **不用 api-layer**                            | 本模板用模块内 `modules/<name>/api/` 而非 `src/api/` |
| UI 组件      | 平台组件 / uView / Vant Weapp（需用户选）        |                                                      |

## 模板架构（已固化，不要改）

### 分层职责

| 层             | 路径                  | 职责                                       |
| -------------- | --------------------- | ------------------------------------------ |
| **页面入口层** | `src/pages/`          | 薄入口，仅引用 `modules/` 下的业务组件     |
| **业务模块层** | `src/modules/<name>/` | 自治模块：UI + API + 类型 + store + i18n   |
| **业务通用层** | `src/common/`         | 全局业务策略（默认 HTTP 实例、401 处理等） |
| **基建抽象层** | `src/libs/`           | 与业务无关的基建（HTTP 封装、工具等）      |

### 标准目录

```
apps/<uniapp-app>/src/
├── pages/                    页面入口（薄入口）
│   └── index/index.vue       仅 import + 渲染 modules 下组件
├── modules/                  业务模块
│   └── <name>/
│       ├── index.vue         模块主组件
│       ├── index.ts          模块 Public API（能力出口）
│       ├── api/              接口函数（按资源分文件）
│       ├── common/           模块内测试数据 / 展示配置
│       ├── types/            接口入参/出参类型
│       ├── stores/           Pinia store（useXxxStore.ts）
│       └── locales/          模块 i18n（自动聚合，命名空间=模块名）
│           ├── zh-CN.ts
│           └── en-US.ts
├── common/                   全局业务策略
│   └── api/index.ts          默认 http 实例 + 业务策略
├── libs/                     基建抽象层
│   └── http/                 基于 uni.request 的封装
├── locales/                  全局 i18n
│   ├── index.ts              i18n 实例 + 切换/存储
│   ├── zh-CN.ts              聚合器（common + 自动扫描 modules/*）
│   ├── en-US.ts
│   └── common/               全局通用文案
├── static/                   静态资源（uniapp 强制约定，引用走 /static/xxx）
├── App.vue
├── main.ts                   注册 Pinia + i18n
├── manifest.json             应用配置
├── pages.json                路由 + 页面配置
└── uni.scss                  全局样式变量
```

### Demo 与样式原则

- demo 应体现 uni-app 的最佳实践：`pages.json` 薄页面入口、`modules/<name>/`
  自治模块、`common/api` + `libs/http`
  请求链路、Pinia、i18n 自动聚合和 uni 平台 API。
- `uniapp-template` **不默认使用 Tailwind CSS**。uni-app 目标包含 H5 / 小程序 /
  App，样式优先使用 `scss` + `rpx` +
  uni 原生组件，避免 Tailwind 在小程序/App 端的类名、选择器和动态 class 兼容成本。
- 页面风格可以贴近移动端参考页，但实现方式不要照搬 Web 模板的 Tailwind 写法。
- demo 内部展示数据放在 `modules/demo/common`
  或组件内部；只有真正全局通用能力才放进 `src/common`。模块自己的可复用能力通过
  `modules/<name>/index.ts` 显式暴露。
- demo 默认不依赖真实后端，也不默认接入 MSW；`modules/demo/api/*`
  可使用模块内测试数据模拟异步请求。真实项目接后端时再替换为 `http.get` /
  `http.post`，并要求后端返回符合 `ApiResponse`。

### 添加新模块的标准流程

1. 建 `src/modules/<name>/index.vue`
2. 建 `src/modules/<name>/index.ts` 作为模块 Public API
3. 按需建 `api/` `types/` `stores/` `locales/` 子目录
4. 在 `pages.json` 注册一个对应页面（如需）
5. 在 `src/pages/<route>/index.vue` 写薄入口引用模块组件
6. **i18n 不用注册**——`modules/<name>/locales/*.ts` 会被自动聚合

## HTTP 请求（已固化）

### 三层架构

```
modules/<name>/api/xxx.ts        ← 接口函数（http.get / http.post）
  ↓
common/api/index.ts              ← 业务策略（默认实例 + token / 错误提示 / 401）
  ↓
libs/http/                       ← 抽象层（uni.request 封装：拦截器 / 取消 / 类型）
  ↓
uni.request                      ← 跨端兼容（H5 / 小程序 / App）
```

### 标准用法

```typescript
// modules/demo/api/template.ts
import { http } from '@/common/api';
import type { TemplateInfo } from '../types/template';

export function fetchTemplateInfo() {
  return http.get<TemplateInfo>('/api/template-demo/info');
}
```

模板 demo 为了开箱即用，默认可以先返回 `modules/demo/common/mock-data.ts`
里的测试数据；这只是 demo 行为，不改变真实业务 API 的分层约定。

### 已实现能力

- Promise + 完整类型推导
- 拦截器（自动注入 token / Accept-Language，自动 unwrap
  `{ code, data, message }`）
- 取消队列：`http.cancel(key)` / `http.cancelAll(scope)` /
  `http.isCanceled(err)`
- 三种并发模式：`parallel` / `takeLatest`（GET 默认）/ `takeFirst`
- 业务码 `code === 0` 为成功，自定义可传 `isSuccessCode`
- `silent` 跳过全局错误回调；`skipAuth` 跳过 token 注入
- 401 自动触发 `onUnauthorized`（清 token + 跳登录）

### ⚠️ 跨端限制

- **不支持 PATCH**：uni.request 在小程序端不支持 PATCH，封装层主动移除了 patch 方法。如需"局部更新"语义，用 PUT 或与后端约定
  `POST + X-HTTP-Method-Override`
- **小程序并发上限**：微信小程序最大 10 个并发请求，超出排队
- **不要引入 axios**：axios 在小程序端无法工作

### 配置 baseURL

```bash
# .env / .env.development / .env.production
VITE_API_BASE_URL=https://api.example.com
```

## i18n（模块化自动聚合）

### 命名空间约定

| 文案位置                               | 调用方式                      |
| -------------------------------------- | ----------------------------- |
| `src/locales/common/<lang>.ts`         | `t('common.xxx')`             |
| `src/modules/<name>/locales/<lang>.ts` | `t('<name>.xxx')`（自动注册） |

聚合器使用 `import.meta.glob('../modules/*/locales/<lang>.ts')`
编译期静态扫描，**新增模块零改动自动生效**。

### ⚠️ import.meta.glob 不支持 alias

聚合器中**必须用相对路径** `../modules/...`，不能用 `@/modules/...`。Vite 的
`import.meta.glob` 是编译期静态分析，不解析路径别名。

### 添加新语言

1. 在 `src/locales/` 创建 `xx-XX.ts`（参考 `zh-CN.ts` 写法）
2. 在 `src/locales/common/` 创建对应 `xx-XX.ts`
3. 在每个 `modules/<name>/locales/` 下创建对应 `xx-XX.ts`
4. 在 `src/locales/index.ts` 的 `messages` 中注册

## State 管理（Pinia）

模板已接入 Pinia。**setup 风格 store 文件名约定**：`useXxxStore.ts`，放
`modules/<name>/stores/`。

```typescript
// modules/demo/stores/useDemoTemplateStore.ts
export const useDemoTemplateStore = defineStore('demo-template', () => {
  const info = ref<TemplateInfo | null>(null);
  const isLoading = ref(false);

  async function loadInfo() {
    isLoading.value = true;
    try {
      info.value = await fetchTemplateInfo();
    } finally {
      isLoading.value = false;
    }
  }

  return { info, isLoading, loadInfo };
});
```

`defineStore` / `ref` / `computed` 等通过 `unplugin-auto-import`
自动注入，无需 import。

## Auto-Import

模板配置了 `unplugin-auto-import`，**Vue / Pinia /
vue-i18n 的 API 全部自动注入**：

- Vue：`ref` `computed` `watch` `onMounted` `nextTick` 等
- Pinia：`defineStore` `storeToRefs` 等
- vue-i18n：`useI18n`

生成的全局类型在 `auto-imports.d.ts`（项目根目录）。如果 TS 报"Cannot find
name"，检查 `tsconfig.json` 的 `include` 是否包含此文件。

## uni-app 平台特有约定

### 路由：pages.json（非 vue-router）

uni-app 路由由 `pages.json` 声明式配置，**不使用 vue-router**：

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": { "navigationBarTitleText": "首页" }
    },
    {
      "path": "pages/login/index",
      "style": { "navigationBarTitleText": "登录" }
    }
  ],
  "tabBar": {
    "list": [
      { "pagePath": "pages/index/index", "text": "首页" },
      { "pagePath": "pages/mine/index", "text": "我的" }
    ]
  }
}
```

页面跳转用 uni API：

```typescript
uni.navigateTo({ url: '/pages/user/detail?id=1' });
uni.redirectTo({ url: '/pages/login/index' });
uni.reLaunch({ url: '/pages/index/index' });
uni.switchTab({ url: '/pages/index/index' });
```

### 路由守卫替代方案

uni-app 无 `beforeEach`。替代方案：

- **拦截器**（推荐）：`uni.addInterceptor('navigateTo', { invoke(args) { ... } })`
- **页面 onShow**：在需要登录的页面 onShow 里检查 token
- **混入 / composable**：抽取 `useAuthCheck()` 在页面 setup 调用

### 条件编译（核心特性）

```typescript
// #ifdef MP-WEIXIN
// 仅微信小程序执行
wx.login({
  /* ... */
});
// #endif

// #ifdef H5
// 仅 H5 执行
window.location.href = '/login';
// #endif

// #ifndef APP-PLUS
// 非 App 环境执行
// #endif
```

平台标识：`H5` / `MP-WEIXIN` / `MP-ALIPAY` / `MP-TOUTIAO` / `MP-BAIDU` / `MP-QQ`
/ `APP-PLUS` / `APP-HARMONY`

### 存储

```typescript
// 同步读写（推荐）
uni.setStorageSync('access_token', token);
const token = uni.getStorageSync('access_token');
uni.removeStorageSync('access_token');
```

详见 `token-storage` skill 的 uniapp.ts。

### 生命周期

页面级（uni-app 特有，无需 import，可在 `<script setup>` 直接用）：

- `onLoad(options)` — 页面加载（接收路由参数）
- `onShow()` — 页面显示（含从后台切回）
- `onHide()` — 页面隐藏
- `onUnload()` — 页面卸载（适合 `http.cancelAll(scope)`）
- `onPullDownRefresh()` — 下拉刷新
- `onReachBottom()` — 触底加载

应用级（在 App.vue 中）：

- `onLaunch()` — 应用启动
- `onShow()` — 应用切前台

### 静态资源

- **`src/static/`**（uniapp 强制约定）：原样拷贝到 dist，引用必须用绝对路径
  `/static/xxx`，**不能用 `@/static/xxx`**
- **`@_shared/assets/`**（monorepo 共享）：通过 vite alias 引用，编译期解析
- **不要建 `src/assets/`**：uniapp 没有特殊语义，且小程序端 import 图片受限

### 环境变量

```bash
VITE_API_BASE_URL=https://api.example.com
```

通过 `import.meta.env.VITE_*` 读取。在 `src/env.d.ts` 补 `ImportMetaEnv`
类型声明。

### Workspace 隔离

uni-app 模板应在 `package.json` 中声明：

```json
{
  "workspaceIsolate": true
}
```

vup-cli 拷贝模板后，根据该标识把生成的应用路径精确写入 `pnpm-workspace.yaml`
排除项（如 `!apps/<appName>`）。原因：

- uniapp 依赖 `@dcloudio/*` 系列，pnpm 严格模式下易冲突
- HBuilderX 兼容性

**影响**：

- ❌ 不能用 `workspace:*` 协议引用 monorepo 包
- ❌ 不能 import monorepo 包的 `package.json exports`
- ✅ **可以**通过 vite alias 直接引用 monorepo 源码文件（如
  `@_shared/assets/...`）

## 实现新页面的步骤

1. 与用户确认页面路径和目标平台
2. 在 `pages.json` 注册新页面
3. 创建 `src/modules/<name>/index.vue`（业务实现）
4. 创建 `src/modules/<name>/index.ts`（模块 Public API）
5. 创建 `src/pages/<route>/index.vue`（薄入口，仅引用模块）
6. 按需补 `modules/<name>/api/` `types/` `stores/` `locales/`
7. 如有平台差异，用条件编译处理
8. 每完成一个文件 Gate 一次

## 关键决策点（AI 必须问用户）

1. **目标平台**：微信 / 支付宝 / 抖音 / 百度 / QQ / H5 / App / 鸿蒙？哪些优先？
2. **UI 框架**：平台原生组件 / uView / Vant Weapp / uni-ui？
3. **小程序登录**：微信 wx.login 授权还是自有账号体系？
4. **是否需要分包**：pages.json subPackages 配置？

> ⚠️ HTTP 方案**不再询问**——模板已固化为 `libs/http/` + `common/api/`
> 的三层架构，基于 `uni.request`。

## 产出位置

- 页面入口：`apps/<uniapp>/src/pages/<name>/index.vue`（薄入口）
- 模块实现：`apps/<uniapp>/src/modules/<name>/`
- 接口函数：`apps/<uniapp>/src/modules/<name>/api/<resource>.ts`
- 配置：`apps/<uniapp>/src/pages.json` + `manifest.json`

模块边界、Public API 和 `common` 归属遵守
`.agent/rules/module-structure.md`；uni-app 额外约定 `index.vue` 是模块主组件。

## 常见问题

- **HBuilderX / CLI 编译版本与手机端 SDK 不匹配**：在项目目录执行
  `npx @dcloudio/uvm@latest`
- **TS 报 "Cannot find name 'useI18n' / 'computed'"**：检查 `tsconfig.json` 的
  `include` 是否包含 `auto-imports.d.ts`
- **import.meta.glob 报 Cannot find
  module**：检查 glob 模式是否用了 alias，必须改为相对路径
- **小程序 PATCH 报错**：uni.request 不支持 PATCH，改用 PUT

## 资源

```
uniapp-app/
└── SKILL.md            本文件
```

uni-app 官方文档：https://uniapp.dcloud.net.cn/
