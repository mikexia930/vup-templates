# 🚀 Vue Project Templates - 多框架开发模板集合

一个基于 pnpm
monorepo 的多框架开发模板集合，包含 Vue、Nuxt、VitePress、NestJS、UniApp、Capacitor、WXT 等多种技术栈的完整开发模板，让你快速开始不同类型的项目开发。

## ✨ 特性

- 🏗️ **Monorepo 架构** - 基于 pnpm workspace 的多包管理
- 🎯 **多框架支持** - Vue、Nuxt、VitePress、NestJS、UniApp 等
- 🔧 **TypeScript** - 完整的类型支持
- ⚡ **现代化工具链** - Vite、ESLint、Prettier、Tailwind CSS
- 📦 **统一依赖管理** - 共享依赖，减少重复安装
- 🌍 **国际化支持** - 多语言开发模板
- 🚀 **一键部署** - 集成 Vercel、Docker 等部署方案
- 📱 **跨平台开发** - Web、移动端、桌面端全覆盖
- 🔄 **版本管理** - 集成 Changeset 进行版本控制
- 🎨 **代码规范** - 统一的 ESLint 和 Prettier 配置

## 🛠️ 技术栈

### 前端框架

| 技术      | 版本 | 说明                    |
| --------- | ---- | ----------------------- |
| Vue       | 3.5+ | 渐进式JavaScript框架    |
| Nuxt      | 3.0+ | Vue.js全栈框架          |
| VitePress | 2.0+ | Vue驱动的静态站点生成器 |
| UniApp    | 3.0+ | 跨平台应用开发框架      |
| Capacitor | 7.0+ | 混合应用开发平台        |
| WXT       | 3.0+ | 浏览器扩展开发框架      |

### 后端框架

| 技术   | 版本  | 说明              |
| ------ | ----- | ----------------- |
| NestJS | 11.0+ | Node.js企业级框架 |

### 开发工具

| 技术         | 版本 | 说明                         |
| ------------ | ---- | ---------------------------- |
| TypeScript   | 5.0+ | JavaScript的超集             |
| Vite         | 6.0+ | 下一代前端构建工具           |
| pnpm         | 8.0+ | 快速、节省磁盘空间的包管理器 |
| ESLint       | 9.0+ | 代码质量检查工具             |
| Prettier     | 3.0+ | 代码格式化工具               |
| Tailwind CSS | 3.0+ | 实用优先的CSS框架            |
| Changeset    | 2.0+ | 版本管理和发布工具           |

## 📁 项目结构

```
project-vue/
├── _shared/                    # 共享资源
│   ├── assets/                # 共享静态资源
│   └── styles/                # 共享样式文件
├── apps/                      # 应用目录
│   ├── vue-template/          # Vue 3 + Vite 模板
│   ├── nuxt-template/         # Nuxt 3 全栈模板
│   ├── vitepress-template/    # VitePress 文档模板
│   ├── nest-template/         # NestJS 后端模板
│   ├── uniapp-template/       # UniApp 跨平台模板
│   ├── capacitor-template/    # Capacitor 混合应用模板
│   └── wxt-template/          # WXT 浏览器扩展模板
├── .github/                   # GitHub 配置
│   └── workflows/             # GitHub Actions 工作流
├── .changeset/                # Changeset 版本管理
├── eslint.config.js           # ESLint 配置
├── prettier.config.js         # Prettier 配置
├── tailwind.config.js         # Tailwind CSS 配置
├── postcss.config.js          # PostCSS 配置
├── tsconfig.json              # TypeScript 配置
├── pnpm-workspace.yaml        # pnpm workspace 配置
└── package.json               # 根目录依赖
```

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd project-vue
```

### 2. 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 3. 选择模板并启动

```bash
# Vue 3 模板
cd apps/vue-template
pnpm dev

# Nuxt 3 模板
cd apps/nuxt-template
pnpm dev

# VitePress 文档模板
cd apps/vitepress-template
pnpm dev

# NestJS 后端模板
cd apps/nest-template
pnpm dev

# UniApp 跨平台模板
cd apps/uniapp-template
pnpm dev

# Capacitor 混合应用模板
cd apps/capacitor-template
pnpm dev

# WXT 浏览器扩展模板
cd apps/wxt-template
pnpm dev
```

### 4. 构建生产版本

```bash
# 构建所有应用
pnpm build:all

# 或构建指定应用
cd apps/vue-template
pnpm build
```

## 📖 模板说明

### Vue 3 模板

- **技术栈**: Vue 3 + Vite + TypeScript + Pinia + Vue Router
- **特性**: 自动导入、国际化、Tailwind CSS、代码规范
- **适用场景**: SPA 应用、管理后台、企业级前端项目

### Nuxt 3 模板

- **技术栈**: Nuxt 3 + Vue 3 + TypeScript + Tailwind CSS
- **特性**: SSR/SSG、自动路由、服务端渲染
- **适用场景**: 全栈应用、SEO 友好的网站、博客

### VitePress 模板

- **技术栈**: VitePress + Vue 3 + Markdown
- **特性**: 静态站点生成、主题定制、搜索功能
- **适用场景**: 文档网站、技术博客、产品介绍

### NestJS 模板

- **技术栈**: NestJS + TypeScript + Prisma + Docker
- **特性**: 模块化架构、依赖注入、微服务支持
- **适用场景**: API 服务、微服务、企业级后端

### UniApp 模板

- **技术栈**: UniApp + Vue 3 + TypeScript
- **特性**: 跨平台开发、原生性能、丰富组件
- **适用场景**: 移动应用、小程序、H5 应用

### Capacitor 模板

- **技术栈**: Capacitor + Vue 3 + TypeScript
- **特性**: 混合应用、原生插件、跨平台部署
- **适用场景**: 混合移动应用、桌面应用

### WXT 模板

- **技术栈**: WXT + Vue 3 + TypeScript
- **特性**: 浏览器扩展开发、多浏览器支持
- **适用场景**: Chrome 扩展、Firefox 插件、Edge 扩展

## 🔧 开发工具

### 代码规范

```bash
# 检查所有应用代码
pnpm lint:all

# 修复所有应用代码
pnpm lint:fix

# 格式化所有应用代码
pnpm format:all
```

### 版本管理

```bash
# 创建 changeset
pnpm changeset

# 更新版本
pnpm changeset version

# 发布（如果配置了发布）
pnpm changeset publish
```

### 构建和部署

```bash
# 构建所有应用
pnpm build:all

# 部署 VitePress 到 Vercel
pnpm deploy:vitepress

# 启动 NestJS 的 Docker 环境
cd apps/nest-template
pnpm docker:up
```

## 🚀 部署方案

### 前端应用

- **Vercel**: VitePress、Vue、Nuxt 应用
- **Netlify**: 静态站点
- **GitHub Pages**: 文档站点

### 后端应用

- **Docker**: NestJS 应用容器化部署
- **Railway**: 无服务器部署
- **Heroku**: 传统云平台部署

### 移动应用

- **App Store**: iOS 应用
- **Google Play**: Android 应用
- **小程序平台**: 微信、支付宝等

## 🌟 最佳实践

### 1. Monorepo 管理

- 使用 pnpm workspace 管理依赖
- 共享配置和工具链
- 统一的代码规范

### 2. 版本控制

- 使用 Changeset 管理版本
- 语义化版本号
- 自动化发布流程

### 3. 代码质量

- ESLint + Prettier 统一代码风格
- TypeScript 类型安全
- 自动化测试和 CI/CD

### 4. 部署策略

- 环境变量管理
- 自动化部署流程
- 多环境配置

## 📚 文档

- [Vue 3 模板文档](./apps/vue-template/README.md)
- [Nuxt 3 模板文档](./apps/nuxt-template/README.md)
- [VitePress 模板文档](./apps/vitepress-template/README.md)
- [NestJS 模板文档](./apps/nest-template/README.md)
- [UniApp 模板文档](./apps/uniapp-template/README.md)
- [Capacitor 模板文档](./apps/capacitor-template/README.md)
- [WXT 模板文档](./apps/wxt-template/README.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

感谢以下开源项目的支持：

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Nuxt](https://nuxt.com/) - Vue.js 全栈框架
- [VitePress](https://vitepress.dev/) - Vue 驱动的静态站点生成器
- [NestJS](https://nestjs.com/) - Node.js 企业级框架
- [UniApp](https://uniapp.dcloud.net.cn/) - 跨平台应用开发框架
- [Capacitor](https://capacitorjs.com/) - 混合应用开发平台
- [WXT](https://wxt.dev/) - 浏览器扩展开发框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [pnpm](https://pnpm.io/) - 快速、节省磁盘空间的包管理器

---

**Happy Coding! 🎉**
