# Nuxt SSR 应用开发模板

基于 Nuxt +
TypeScript 的现代化全栈应用开发模板，支持 SSR、SSG、多语言和完整的开发工具链。

## 🔄 当前模板增量说明

本模板已同步 demo 规范，重点包括：

- demo 路由改为 `demo/guide` + `demo/example`
- 请求层采用 Nuxt 约定：`src/api/request.ts`（ofetch 适配）+
  `src/api/demo.ts`（业务接口）
- 状态模型拆分到 `src/stores/demo/index.ts`
- UI 组件采用 `@element-plus/nuxt` 集成后的 Element Plus 组件
- 术语约定：`/demo/*` 用于页面路由，`/api/template-demo/*` 用于演示接口

## ✅ Element Plus（Nuxt 模式）

Nuxt 项目不要按 Vue SPA 方式手动 `app.use(ElementPlus)`，应通过
`@element-plus/nuxt` 模块接入。

当前已完成：

- 依赖：`@element-plus/nuxt`
- 配置：`nuxt.config.ts` 的 `modules` 中已包含 `@element-plus/nuxt`

## 🚀 技术栈

### 核心框架

- **Nuxt 4** - 基于 Vue 3 的全栈框架
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Vite** - 下一代前端构建工具

### 状态管理

- **Pinia** - Vue 3 官方状态管理库

### 国际化

- **@nuxtjs/i18n** - Nuxt 官方国际化模块

### 样式系统

- **Tailwind CSS** - 实用优先的 CSS 框架
- **SCSS** - CSS 预处理器，增强样式编写能力

### 开发工具

- **ESLint** - 可插拔的 JavaScript 代码检查工具
- **Prettier** - 代码格式化工具
- **pnpm** - 快速、节省磁盘空间的包管理器

## 📚 文档地址

### 核心技术

- [Nuxt 官方文档（Nuxt 4）](https://nuxt.com/)
- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)

### 状态管理

- [Pinia 官方文档](https://pinia.vuejs.org/)
- [@nuxtjs/i18n 官方文档](https://i18n.nuxtjs.org/)

### 样式系统

- [Tailwind CSS 官方文档](https://tailwindcss.com/)
- [SCSS 官方文档](https://sass-lang.com/)

### 开发工具

- [ESLint 官方文档](https://eslint.org/)
- [Prettier 官方文档](https://prettier.io/)
- [pnpm 官方文档](https://pnpm.io/)

## 🛠️ 使用方式

### 安装依赖

```bash
pnpm install
```

### 开发服务器

```bash
pnpm dev
```

启动开发服务器，支持热重载，访问 http://localhost:9303

### 构建项目

```bash
# 构建生产版本
pnpm build

# 生成静态站点
pnpm generate

# 预览构建结果
pnpm preview
```

### 代码检查

```bash
# 检查代码质量
pnpm lint

# 自动修复问题
pnpm lint:fix
```

### 代码格式化

```bash
# 格式化代码
pnpm format

# 检查格式
pnpm format:check
```

## 📁 项目结构

```txt
nuxt-template/
├── src/
│   ├── assets/             # 静态资源
│   │   └── images/         # 图片资源
│   ├── components/         # Vue 组件
│   │   └── demo/
│   │       └── DemoTaskBoard.vue
│   ├── composables/        # 组合式函数
│   ├── layouts/            # 布局组件
│   ├── middlewares/        # 中间件
│   ├── pages/              # 页面组件
│   │   ├── demo.vue        # 演示布局页
│   │   ├── demo/
│   │   │   ├── guide.vue   # /demo/guide
│   │   │   └── example.vue # /demo/example
│   │   └── index.vue       # 首页
│   ├── api/                # 请求层（request/types + 业务接口）
│   ├── stores/
│   │   └── demo/
│   │       └── index.ts    # demo 业务 store
│   ├── utils/              # 工具函数
│   └── app.vue             # 根组件
├── i18n/                   # 国际化文件
│   └── locales/            # 语言包
│       ├── zh-CN.json      # 中文语言包
│       └── en-US.json      # 英文语言包
├── public/                 # 公共静态资源
│   ├── favicon.ico         # 网站图标
│   └── robots.txt          # 搜索引擎配置
├── nuxt.config.ts          # Nuxt 配置
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
└── README.md               # 项目说明
```

## ✨ 特性

### 模板特性

- ✅ **Nuxt 目录约定保留**：`pages/components/composables` 不强行迁移
- ✅ **Demo 结构统一**：`/demo/guide` + `/demo/example`
- ✅ **请求层分离**：`src/api/request.ts`（适配层）+
  `src/api/demo.ts`（业务接口）
- ✅ **状态模型分离**：`src/stores/demo/index.ts`
- ✅ **UI 接入正确**：通过 `@element-plus/nuxt` 使用 Element Plus

## 🌍 国际化

- 语言文件：`i18n/locales/en-US.json`、`i18n/locales/zh-CN.json`
- 默认语言：`en-US`
- 路由策略：`prefix_except_default`

## 📄 页面路由

- `pages/index.vue` → `/`（重定向到 `/demo/guide`）
- `pages/demo.vue` → `/demo`（layout）
- `pages/demo/guide.vue` → `/demo/guide`
- `pages/demo/example.vue` → `/demo/example`

## 🔧 请求层约定（Nuxt）

- HTTP 客户端：`ofetch`
- 应用侧适配：`src/api/request.ts`
- 业务接口：`src/api/demo.ts`（后续可按模块继续拆分）
- 通用类型：`src/api/types.ts`

### 开发期 Mock（MSW）

- 共享 mock 包：`@vup/mock`
- 开关：`NUXT_PUBLIC_USE_MOCK=true`
- 启用后会拦截 `/api/template-demo/*`，默认用于模板演示与联调前验证
- 语义说明：页面路径与接口前缀刻意分离，避免“页面 demo”和“接口 demo”命名歧义

## 🧪 验收建议

```bash
pnpm lint
pnpm build
```

重点手工检查：

- demo guide/example 路由切换
- 中英文切换
- 示例任务板（筛选、状态切换、模拟错误）

## 📄 许可证

MIT License
