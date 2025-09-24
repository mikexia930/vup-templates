# Electron 桌面应用模板

基于 Electron + Vue 3 + TypeScript +
Vite 的现代化桌面应用开发模板，开箱即用，让你快速构建跨平台桌面应用。

## 🚀 技术栈

- **Electron** - 使用 Web 技术构建跨平台桌面应用
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

- [Electron 官方文档](https://www.electronjs.org/)
- [Electron Forge 官方文档](https://www.electronforge.io/)
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
pnpm start
```

启动 Electron 开发服务器，支持热重载，自动打开桌面应用窗口

### 构建应用

```bash
pnpm package
```

构建 Electron 应用，生成可执行文件到 `out/` 目录

### 制作安装包

```bash
pnpm make
```

基于构建结果制作分发包，支持多种格式：

- Windows: `.exe` 安装包
- macOS: `.zip` 压缩包
- Linux: `.deb` 和 `.rpm` 包

### 发布应用

```bash
pnpm publish
```

发布应用到分发平台（需要配置发布平台）

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

## ⚠️ Monorepo 项目注意事项

在 monorepo 项目中，**Electron 的二进制文件可能安装不成功**。如果遇到以下错误：

```
Error: Electron failed to install correctly, please delete node_modules/electron and try installing again
```

**这是 monorepo 项目的常见问题**，请按以下步骤解决：

### 1. 清理并重新安装

```bash
# 删除 Electron 相关文件
rm -rf node_modules/electron

# 重新安装
pnpm install electron --force
```

### 2. 🔥 关键步骤：手动运行 Electron 安装脚本

**这一步非常重要！** Electron 的二进制文件需要手动下载：

```bash
# 进入 Electron 目录
cd node_modules/electron

# 手动运行安装脚本（下载二进制文件）
node install.js
```

**说明**：在 monorepo 环境中，pnpm 的符号链接机制可能导致 Electron 的安装脚本没有正确执行，因此需要手动运行
`install.js` 来下载平台特定的二进制文件。

### 3. 验证安装

```bash
# 检查 Electron 版本（应该显示版本号而不是错误）
npx electron --version
```

### 4. 启动应用

```bash
# 回到项目根目录
cd ../..

# 启动 Electron 应用
pnpm start
```

### 5. 如果仍然失败

如果上述步骤仍然失败，尝试完全清理：

```bash
# 完全清理
rm -rf node_modules pnpm-lock.yaml

# 清理 pnpm 缓存
pnpm store prune

# 重新安装
pnpm install

# 手动运行 Electron 安装脚本
cd node_modules/electron && node install.js

# 回到项目根目录
cd ../..

# 启动应用
pnpm start
```

## 📁 项目结构

```
electron-template/
├── src/
│   ├── main.ts              # 主进程入口
│   ├── preload.ts           # 预加载脚本
│   └── renderer/            # 渲染进程（Vue 应用）
│       ├── assets/          # 资源文件
│       ├── components/      # 组件
│       ├── locales/         # 国际化文件
│       ├── router/          # 路由配置
│       ├── stores/          # Pinia 状态管理
│       ├── views/           # 页面组件
│       ├── App.vue          # 根组件
│       ├── index.ts         # 渲染进程入口
│       └── index.css        # 全局样式
├── .vite/                   # Vite 构建缓存
├── out/                     # 构建输出目录
├── forge.config.ts          # Electron Forge 配置
├── vite.main.config.ts      # 主进程 Vite 配置
├── vite.preload.config.ts   # 预加载脚本 Vite 配置
├── vite.renderer.config.ts  # 渲染进程 Vite 配置
├── package.json             # 项目配置
├── tsconfig.json            # TypeScript 配置
└── README.md                # 项目说明
```

## ✨ 特性

- 🖥️ **跨平台支持** - Windows、macOS、Linux
- 🎯 **TypeScript 支持** - 完整的类型安全
- 🚀 **Vite 构建** - 极速的开发体验
- 🎨 **Tailwind CSS** - 实用优先的样式框架
- 🌍 **国际化支持** - 多语言切换
- 🖥️ **桌面优化** - 适配不同分辨率的显示器
- 🔧 **代码规范** - ESLint + Prettier
- 📦 **自动导入** - 无需手动导入 Vue API
- 🏪 **状态管理** - Pinia 状态管理
- 🛣️ **路由管理** - Vue Router 路由系统（Hash 模式）
- 🔒 **安全配置** - Electron 安全最佳实践

## 🎨 样式系统

项目使用 Tailwind CSS 作为主要样式框架，配合 SCSS 预处理器：

- 使用 `@apply` 指令在 SCSS 中应用 Tailwind 类
- 支持桌面端响应式设计
- 自定义主题配置
- 组件级别的样式隔离

## 🌍 国际化

项目内置了中英文国际化支持：

- 使用 Vue i18n 进行国际化
- 支持语言切换
- 类型安全的翻译键
- 懒加载语言包

## 🛣️ 路由配置

**重要**：Electron 应用必须使用 Hash 模式路由，不能使用 History 模式。

### 原因

- Electron 应用运行在 `file://` 协议下
- History 模式需要服务器支持，但 Electron 没有传统意义上的服务器
- Hash 模式通过 URL 的 hash 部分来管理路由，不依赖服务器

### 配置

```typescript
// router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
  history: createWebHashHistory(), // 使用 Hash 模式
  routes,
});
```

### URL 格式

- Hash 模式：`file:///path/to/app/index.html#/docs`
- History 模式：`file:///path/to/app/docs`（在 Electron 中不工作）

## 🖥️ 桌面应用设计

- 桌面端优化的用户界面
- 适配不同分辨率的显示器
- 键盘和鼠标友好的交互设计
- 优化的桌面应用性能

## 🔧 开发工具

- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **TypeScript** - 类型检查
- **Vite HMR** - 热模块替换
- **自动导入** - 无需手动导入常用 API
- **Electron Forge** - 应用打包和分发

## 🚀 构建和分发

### 构建配置

- **主进程**：使用 `vite.main.config.ts` 配置
- **预加载脚本**：使用 `vite.preload.config.ts` 配置
- **渲染进程**：使用 `vite.renderer.config.ts` 配置

### 输出目录

- 开发构建：`.vite/` 目录
- 生产构建：`out/` 目录
- 安装包：`out/make/` 目录

### 支持的平台

- **Windows** - `.exe` 安装包
- **macOS** - `.zip` 压缩包
- **Linux** - `.deb` 和 `.rpm` 包

## 📄 许可证

MIT License
