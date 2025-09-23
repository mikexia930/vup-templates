# Vue 3 开发模板

基于 Vue 3 + TypeScript +
Vite 的现代化前端开发模板，开箱即用，让你告别繁琐的配置，专注业务逻辑的开发。

## 🚀 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Vite** - 下一代前端构建工具
- **Vue Router** - Vue.js 官方路由管理器
- **Pinia** - Vue 3 官方状态管理库
- **Vue i18n** - Vue.js 国际化插件
- **Tailwind CSS** - 实用优先的 CSS 框架
- **SCSS** - CSS 预处理器，增强样式编写能力
- **ESLint** - 可插拔的 JavaScript 代码检查工具
- **Prettier** - 代码格式化工具
- **pnpm** - 快速、节省磁盘空间的包管理器

## 📚 文档地址

- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Vue Router 官方文档](https://router.vuejs.org/)
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [Vue i18n 官方文档](https://vue-i18n.intlify.dev/)
- [Tailwind CSS 官方文档](https://tailwindcss.com/)
- [SCSS 官方文档](https://sass-lang.com/)
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

启动开发服务器，支持热重载，访问 http://localhost:9301

### 构建项目

```bash
pnpm build
```

构建生产版本，输出到 `.output` 目录

### 代码检查

```bash
pnpm lint
```

运行 ESLint 检查代码质量

```bash
pnpm lint:fix
```

自动修复 ESLint 发现的问题

### 代码格式化

```bash
pnpm format
```

使用 Prettier 格式化代码

```bash
pnpm format:check
```

检查代码格式是否符合 Prettier 规范

## 📁 项目结构

```
vue-template/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 资源文件
│   ├── components/        # 组件
│   ├── locales/           # 国际化文件
│   ├── router/            # 路由配置
│   ├── stores/            # Pinia 状态管理
│   ├── views/             # 页面组件
│   ├── App.vue            # 根组件
│   └── main.ts            # 入口文件
├── .eslintrc-auto-import.json  # ESLint 自动导入配置
├── auto-imports.d.ts      # 自动导入类型声明
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript 配置
├── vite.config.js         # Vite 配置
└── README.md              # 项目说明
```

## ✨ 特性

- 🎯 **TypeScript 支持** - 完整的类型安全
- 🚀 **Vite 构建** - 极速的开发体验
- 🎨 **Tailwind CSS** - 实用优先的样式框架
- 🌍 **国际化支持** - 多语言切换
- 📱 **响应式设计** - 适配各种设备
- 🔧 **代码规范** - ESLint + Prettier
- 📦 **自动导入** - 无需手动导入 Vue API
- 🏪 **状态管理** - Pinia 状态管理
- 🛣️ **路由管理** - Vue Router 路由系统

## 🎨 样式系统

项目使用 Tailwind CSS 作为主要样式框架，配合 SCSS 预处理器：

- 使用 `@apply` 指令在 SCSS 中应用 Tailwind 类
- 支持响应式设计
- 自定义主题配置
- 组件级别的样式隔离

## 🌍 国际化

项目内置了中英文国际化支持：

- 使用 Vue i18n 进行国际化
- 支持语言切换
- 类型安全的翻译键
- 懒加载语言包

## 📱 响应式设计

- 移动端优先的设计理念
- 适配各种屏幕尺寸
- 触摸友好的交互设计
- 优化的移动端性能

## 🔧 开发工具

- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **TypeScript** - 类型检查
- **Vite HMR** - 热模块替换
- **自动导入** - 无需手动导入常用 API

## 📄 许可证

MIT License
