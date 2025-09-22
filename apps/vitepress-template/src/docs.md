# 文档

欢迎来到 VitePress 文档！在这里您将找到构建现代化静态站点的全面指南和参考。

## 快速开始

### 开发服务器

启动开发服务器，支持热重载：

```bash
pnpm dev
```

### 构建项目

构建生产版本：

```bash
pnpm build
```

### 代码检查

运行 ESLint 检查代码质量：

```bash
pnpm lint
```

### 代码格式化

使用 Prettier 格式化代码：

```bash
pnpm format
```

## 技术栈

### 核心技术

- **VitePress** - 基于 Vite 的静态站点生成器
- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Markdown** - 轻量级标记语言

### 开发工具

- **ESLint** - 可插拔的 JavaScript 代码检查工具
- **Prettier** - 代码格式化工具
- **SCSS** - CSS 预处理器，增强样式编写能力
- **Tailwind CSS** - 实用优先的 CSS 框架
- **pnpm** - 快速、节省磁盘空间的包管理器

## 功能特性

### 🚀 性能

- 使用 Vite 实现闪电般的开发体验
- 优化的生产构建
- 静态站点生成 (SSG)
- 自动代码分割

### 🔧 开发体验

- 热模块替换 (HMR)
- Markdown 热重载
- 开箱即用的 TypeScript 支持
- ESLint 和 Prettier 集成

### 📝 内容管理

- Markdown 驱动的内容
- 内置搜索功能
- 自动生成导航
- 多语言支持

### 🎨 主题定制

- 可定制的主题系统
- 使用 Tailwind CSS 快速样式化
- SCSS 满足高级样式需求
- 响应式设计

## 开始使用

1. **安装依赖**：

   ```bash
   pnpm install
   ```

2. **启动开发服务器**：

   ```bash
   pnpm dev
   ```

3. **构建生产版本**：

   ```bash
   pnpm build
   ```

4. **预览生产构建**：
   ```bash
   pnpm preview
   ```

## 项目结构

```
.vitepress/
├── config.mts          # VitePress 配置
├── theme/              # 自定义主题
│   ├── components/     # Vue 组件
│   ├── locales/        # 多语言文件
│   └── styles/         # 样式文件
src/
├── index.md            # 首页
├── docs.md             # 文档页面
└── en/                 # 英文页面
    └── index.md
```

## 需要帮助？

- 查看我们的[首页](/)
- 访问 [VitePress 文档](https://vitepress.dev/)
- 探索 [Vue.js 文档](https://vuejs.org/)
