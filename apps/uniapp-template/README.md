# 📱 UniApp 跨平台应用开发模板

基于 UniApp + Vue 3 +
TypeScript 的跨平台应用开发模板，支持 H5、小程序、App 等多端开发。

## ✨ 特性

- 🚀 **Vue 3** - 渐进式 JavaScript 框架
- 📱 **UniApp** - 跨平台应用开发框架
- 🔧 **TypeScript** - JavaScript 的超集，提供类型安全
- ⚡ **Vite** - 下一代前端构建工具
- 🌍 **多语言支持** - 基于 vue-i18n，支持模块化自动聚合
- 🧩 **模块化架构** - `modules/` 自治模块（业务、i18n、API 各自归属）
- 🌐 **HTTP 封装** - 三层架构（libs / common / module），跨端兼容
- 📦 **pnpm** - 快速、节省磁盘空间的包管理器

## 🛠️ 技术栈

| 技术       | 版本 | 说明                         |
| ---------- | ---- | ---------------------------- |
| UniApp     | 3.0+ | 跨平台应用开发框架           |
| Vue        | 3.5+ | 渐进式 JavaScript 框架       |
| TypeScript | 5.0+ | JavaScript 的超集            |
| Vite       | 6.0+ | 下一代前端构建工具           |
| vue-i18n   | 9.0+ | Vue.js 国际化插件            |
| pnpm       | 8.0+ | 快速、节省磁盘空间的包管理器 |

## 🚀 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
# H5 开发
pnpm dev

# 微信小程序开发
pnpm dev:mp-weixin

# 支付宝小程序开发
pnpm dev:mp-alipay

# 百度小程序开发
pnpm dev:mp-baidu

# 字节跳动小程序开发
pnpm dev:mp-toutiao

# QQ 小程序开发
pnpm dev:mp-qq

# App 开发
# 使用 HBuilderX 导入项目，或按目标平台执行自定义命令
pnpm dev:custom
```

### 3. 构建生产版本

```bash
# H5 构建
pnpm build:h5

# 微信小程序构建
pnpm build:mp-weixin

# 支付宝小程序构建
pnpm build:mp-alipay

# 百度小程序构建
pnpm build:mp-baidu

# 字节跳动小程序构建
pnpm build:mp-toutiao

# QQ 小程序构建
pnpm build:mp-qq

# App 构建
# 使用 HBuilderX 云打包，或按目标平台执行自定义构建
pnpm build:custom
```

## 📱 支持平台

### H5

- 现代浏览器
- 移动端浏览器
- PWA 支持

### 小程序

- 微信小程序
- 支付宝小程序
- 百度小程序
- 字节跳动小程序
- QQ 小程序

### App

- iOS
- Android

## 📁 项目结构

```
uniapp-template/
├── src/
│   ├── pages/                 # 页面入口（薄入口，仅引用模块）
│   │   └── index/index.vue
│   ├── modules/               # 业务模块（自治：UI + API + 类型 + store + i18n）
│   │   └── demo/
│   │       ├── index.vue      # 模块主组件
│   │       ├── api/           # 模块接口函数
│   │       ├── common/        # 模块内测试数据 / 展示配置
│   │       ├── types/         # 模块类型定义
│   │       ├── stores/        # 模块 Pinia store
│   │       └── locales/       # 模块 i18n（自动聚合）
│   ├── common/                # 业务通用层
│   │   └── api/               # HTTP 默认实例 + 业务策略
│   │       └── index.ts
│   ├── libs/                  # 基建抽象层
│   │   └── http/              # 基于 uni.request 的 HTTP 封装
│   │       ├── request.ts
│   │       ├── types.ts
│   │       └── index.ts
│   ├── locales/               # 全局 i18n
│   │   ├── index.ts           # i18n 实例 + 切换/存储
│   │   ├── zh-CN.ts           # 聚合器（common + 自动扫描 modules/*）
│   │   ├── en-US.ts
│   │   └── common/            # 全局通用文案
│   │       ├── zh-CN.ts
│   │       └── en-US.ts
│   ├── static/                # 静态资源（uniapp 强制约定，引用走 /static/xxx）
│   ├── App.vue                # 应用根组件
│   ├── main.ts                # 应用入口
│   ├── manifest.json          # 应用配置
│   ├── pages.json             # 页面配置
│   └── uni.scss               # 全局样式
├── auto-imports.d.ts          # unplugin-auto-import 生成的类型
├── index.html                 # H5 入口文件
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### 分层职责

| 层             | 路径              | 职责                                             |
| -------------- | ----------------- | ------------------------------------------------ |
| **页面入口层** | `pages/`          | 薄入口，仅引用 `modules/` 下的业务组件           |
| **业务模块层** | `modules/<name>/` | 自治模块：UI 组件 + API + 类型 + i18n            |
| **业务通用层** | `common/`         | 跨模块共享的业务逻辑（默认 HTTP 实例、业务策略） |
| **基建抽象层** | `libs/`           | 与业务无关的基建（HTTP 封装、工具等）            |

## 🔧 开发工具

### 代码检查

```bash
# 检查代码质量
pnpm lint

# 自动修复代码问题
pnpm lint:fix
```

### 代码格式化

```bash
# 格式化代码
pnpm format

# 检查代码格式
pnpm format:check
```

### 类型检查

```bash
# TypeScript 类型检查
pnpm type-check
```

## 📱 平台特定配置

### 微信小程序

1. 在微信开发者工具中导入项目
2. 选择 `dist/dev/mp-weixin` 目录
3. 配置 AppID

### 支付宝小程序

1. 在支付宝开发者工具中导入项目
2. 选择 `dist/dev/mp-alipay` 目录
3. 配置 AppID

### App 开发

1. 安装 HBuilderX
2. 导入项目
3. 配置证书和签名

## 🌍 多语言配置

### 架构概览

locales 采用**模块化 + 自动聚合**：

```
locales/
├── index.ts              # i18n 实例 + 切换/存储
├── zh-CN.ts              # 聚合器：common + 自动扫描 modules/*
├── en-US.ts              # 同上
└── common/               # 全局通用文案（命名空间 `common`）
    ├── zh-CN.ts
    └── en-US.ts

modules/<name>/locales/   # 模块文案（命名空间自动等于模块名）
├── zh-CN.ts
└── en-US.ts
```

聚合器使用 `import.meta.glob('../modules/*/locales/zh-CN.ts')`
**编译期静态扫描**，新增模块零改动自动生效。

### 命名空间约定

| 来源                             | 调用方式          | 示例                         |
| -------------------------------- | ----------------- | ---------------------------- |
| `locales/common/*.ts`            | `t('common.xxx')` | `t('common.title')`          |
| `modules/demo/locales/*.ts`      | `t('demo.xxx')`   | `t('demo.hero.description')` |
| 新增 `modules/user/locales/*.ts` | `t('user.xxx')`   | 自动生效，无需手动注册       |

### 添加新语言

1. 在 `src/locales/` 创建 `xx-XX.ts`（参考 `zh-CN.ts` 写法）
2. 在 `src/locales/common/` 创建对应 `xx-XX.ts`
3. 在每个 `modules/<name>/locales/` 下创建对应 `xx-XX.ts`
4. 在 `src/locales/index.ts` 的 `messages` 中注册

### 使用多语言

```vue
<script setup lang="ts">
// useI18n 已通过 unplugin-auto-import 自动注册，无需 import
const { t } = useI18n();
</script>

<template>
  <text>{{ t('demo.hero.description') }}</text>
  <text>{{ t('common.title') }}</text>
</template>
```

## 📦 构建和部署

### H5 部署

```bash
# 构建 H5 版本
pnpm build:h5

# 部署到静态服务器
# 将 dist/build/h5 目录上传到服务器
```

### 小程序发布

1. 构建对应平台的小程序
2. 在对应开发者工具中预览
3. 提交审核发布

### App 发布

1. 构建 App 版本
2. 在 HBuilderX 中打包
3. 上传到应用商店

## 🎯 最佳实践

### 1. 页面开发

- 使用 Vue 3 Composition API
- 合理使用 TypeScript 类型
- 遵循 UniApp 组件规范

### 2. 样式开发

- 优先使用 uni-app 原生组件语义（`view` / `text` / `button` / `image`）
- 优先使用 `scss` + `rpx`，保障 H5 / 小程序 / App 多端稳定
- 不默认接入 Tailwind CSS；如项目只面向 H5，可由业务自行评估引入
- 遵循移动端设计规范，避免 Web-only 选择器或动态 class 影响小程序/App

### 3. 状态管理

- 简单状态使用 ref/reactive
- 复杂状态考虑 Pinia
- 合理使用 uni.storage

### 4. 性能优化

- 合理使用图片资源
- 避免过深的组件嵌套
- 使用条件编译优化代码

## 🌐 HTTP 请求封装

基于 `uni.request` 的三层架构封装，**完整跨端**（H5 / 小程序 / App）。

### 三层架构

```
业务调用
  ↓
modules/demo/api/template.ts        ← 接口函数（http.get / http.post）
  ↓
common/api/index.ts                  ← 业务策略层（默认 http 实例 + token / 错误提示）
  ↓
libs/http/                           ← 抽象层（uni.request 封装：拦截器 / 取消 / 类型）
  ↓
uni.request                          ← 跨端兼容
```

### 已实现能力

- ✅ Promise 化 + 完整类型推导
- ✅ 拦截器（请求注入 token / Accept-Language，响应业务码 unwrap）
- ✅ HTTP 状态码错误处理（含 401 钩子）
- ✅ 业务码统一处理（`{ code, data, message }`，code===0 成功）
- ✅ 取消队列：`cancel(key)` / `cancelAll(scope)` / `isCanceled(err)`
- ✅ 三种并发模式：
  - `parallel`（非 GET 默认）：并行放行
  - `takeLatest`（GET 默认）：新请求取消同 key 旧请求
  - `takeFirst`：已有同 key 进行中则忽略新请求
- ✅ `silent` 跳过全局错误回调
- ✅ `skipAuth` 跳过 token 注入
- ✅ 标准化错误对象 `HttpError`（含 `status / canceled / timeout / raw`）

### 调用示例

```ts
import { http } from '@/common/api';

// 1. 简单调用
interface UserInfo {
  id: number;
  name: string;
}
const user = await http.get<UserInfo>('/user/info');

// 2. 带配置（登录跳过 token，自己处理错误）
await http.post<LoginResult>(
  '/auth/login',
  { username, password },
  {
    skipAuth: true,
    silent: true,
  }
);

// 3. 取消重复请求（搜索框场景）
const list = await http.get('/search', {
  params: { keyword: 'xxx' },
  cancelKey: 'search-list', // 同 key 旧请求被取消
});

// 4. 切页面取消所有请求
import { http } from '@/common/api';
onUnload(() => http.cancelAll('home-page'));

// 5. 创建独立实例（如调用第三方 API）
import { createHttpClient } from '@/libs/http';
const thirdParty = createHttpClient({ baseURL: 'https://api.x.com' });
```

### 模块内 API 组织约定

demo 默认不依赖真实后端，也不默认接入 MSW。`modules/demo/api/template.ts`
使用模块内测试数据模拟异步请求，保证 H5 / 小程序 / App 默认都能直接演示 Pinia
loading、状态更新和模块 API 边界。

真实项目接入后端时，把 demo API 函数体替换为 `http.get` / `http.post`
即可；后端响应应符合 `ApiResponse` 约定：

```ts
interface ApiResponse<T> {
  code: number;
  data?: T;
  message?: string | null;
}
```

```
modules/demo/
├── api/
│   └── template.ts        # 接口函数（按资源分文件）
├── common/
│   └── mock-data.ts       # demo 内部测试数据，不进入 src/common
└── types/
    └── template.ts        # 接口入参/出参类型
```

### ⚠️ 跨端注意事项

- `uni.request` 在**小程序端不支持 PATCH** 方法，封装层已**主动移除**
  `patch`，避免误用
- 如需"局部更新"语义，建议用 `PUT` 或与后端约定 `POST + X-HTTP-Method-Override`
- 微信小程序最大并发请求数为 10，超出会排队

### 配置 baseURL

在 `.env` / `.env.development` / `.env.production` 中配置：

```
VITE_API_BASE_URL=https://api.example.com
```

## ⚠️ 常见问题

- 如果 HBuilderX /
  CLI 编译版本 与 手机端运行的 SDK 版本不匹配，请在 uniapp 项目目录执行：
  `npx @dcloudio/uvm@latest`

## 📚 相关文档

- [UniApp 官方文档](https://uniapp.dcloud.net.cn/)
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [vue-i18n 官方文档](https://vue-i18n.intlify.dev/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
