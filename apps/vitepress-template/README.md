# VitePress 静态站点开发模板

基于 VitePress +
TypeScript 的现代化静态站点开发模板，支持多语言、主题定制和完整的开发工具链。

## 🚀 技术栈

### 核心框架

- **VitePress** - 基于 Vite 的静态站点生成器
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Vite** - 下一代前端构建工具

### 样式系统

- **Tailwind CSS** - 实用优先的 CSS 框架
- **SCSS** - CSS 预处理器，增强样式编写能力

### 开发工具

- **ESLint** - 可插拔的 JavaScript 代码检查工具
- **Prettier** - 代码格式化工具
- **pnpm** - 快速、节省磁盘空间的包管理器

### 功能特性

- **静态生成** - 预渲染的静态 HTML 页面
- **多语言支持** - 内置中英文国际化
- **主题定制** - 可定制的主题系统
- **组件支持** - Vue 组件在 Markdown 中使用
- **搜索功能** - 内置全文搜索
- **SEO 优化** - 自动生成 meta 标签

## 📚 文档地址

### 核心技术

- [VitePress 官方文档](https://vitepress.dev/)
- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)

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

启动开发服务器，支持热重载，访问 http://localhost:5173

### 构建项目

```bash
# 构建生产版本
pnpm build

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
```

## 📁 项目结构

```
vitepress-template/
├── src/
│   ├── .vitepress/         # VitePress 配置
│   │   ├── config.mts      # 配置文件
│   │   └── theme/          # 主题文件
│   │       ├── components/ # 自定义组件
│   │       ├── layouts/    # 布局组件
│   │       └── styles/     # 样式文件
│   ├── public/             # 静态资源
│   │   ├── favicon.ico     # 网站图标
│   │   └── images/         # 图片资源
│   ├── en/                 # 英文内容
│   │   ├── index.md        # 英文首页
│   │   └── docs.md         # 英文文档
│   ├── index.md            # 中文首页
│   ├── docs.md             # 中文文档
│   └── components/         # Vue 组件
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
└── README.md               # 项目说明
```

## ✨ 特性

### 核心特性

- 🎯 **TypeScript 支持** - 完整的类型安全
- 🚀 **VitePress 框架** - 静态站点生成
- 🎨 **Tailwind CSS** - 实用优先的样式框架
- 🌍 **多语言支持** - 内置中英文国际化
- 📱 **响应式设计** - 适配各种设备
- 🔧 **代码规范** - ESLint + Prettier

### VitePress 特性

- 📄 **Markdown 支持** - 丰富的 Markdown 功能
- 🎨 **主题定制** - 可定制的主题系统
- 🔍 **搜索功能** - 内置全文搜索
- 📦 **组件支持** - Vue 组件在 Markdown 中使用
- 🛣️ **路由系统** - 基于文件的路由
- 📊 **SEO 优化** - 自动生成 meta 标签

### 开发特性

- 🔧 **热重载** - 开发时自动重新加载
- 📦 **模块化** - 清晰的代码组织结构
- 🛠️ **工具链** - 完整的开发工具支持
- 📝 **代码规范** - ESLint + Prettier
- 🏗️ **构建优化** - 生产环境优化

## 🌍 多语言支持

### 语言配置

- **默认语言**：中文
- **支持语言**：中文、英文
- **路由策略**：基于路径的语言切换

### 内容结构

```
src/
├── index.md          # 中文首页 (/)
├── docs.md           # 中文文档 (/docs)
├── en/
│   ├── index.md      # 英文首页 (/en/)
│   └── docs.md       # 英文文档 (/en/docs)
```

### 使用方式

```markdown
<!-- 中文内容 -->

# 欢迎使用 VitePress

这是一个基于 VitePress 的静态站点模板。

<!-- 英文内容 -->

# Welcome to VitePress

This is a static site template based on VitePress.
```

## 🎨 主题定制

### 自定义主题

```typescript
// .vitepress/theme/index.ts
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './styles/custom.css';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 自定义插槽
    });
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
  },
} satisfies Theme;
```

### 自定义样式

```scss
// .vitepress/theme/styles/custom.scss
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

// 自定义样式
.custom-class {
  @apply bg-white rounded-lg shadow-md p-4;
}
```

## 📄 内容编写

### Markdown 语法

````markdown
# 标题

## 子标题

### 代码块

```typescript
const message = 'Hello VitePress!';
console.log(message);
```
````

### 表格

| 功能     | 描述               |
| -------- | ------------------ |
| 静态生成 | 预渲染的 HTML 页面 |
| 多语言   | 支持中英文切换     |
| 主题定制 | 可定制的主题系统   |

### 链接

[VitePress 官网](https://vitepress.dev/)

### 图片

![VitePress Logo](/images/vitepress.svg)

````

### Vue 组件

```vue
<!-- 在 Markdown 中使用 Vue 组件 -->
<Demo />

<script setup>
import Demo from './components/Demo.vue'
</script>
````

## 🔧 配置管理

### VitePress 配置

```typescript
// .vitepress/config.mts
import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'VitePress 模板',
  description: '基于 VitePress 的静态站点模板',

  // 多语言配置
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
    },
    en: {
      label: 'English',
      lang: 'en-US',
    },
  },

  // 主题配置
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/docs' },
    ],
    sidebar: {
      '/': [{ text: '介绍', link: '/docs' }],
      '/en/': [{ text: 'Introduction', link: '/en/docs' }],
    },
  },
});
```

### TypeScript 配置

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## 🚀 部署

### 静态部署

```bash
# 构建静态站点
pnpm build

# 部署到静态托管服务
# 如 Vercel、Netlify、GitHub Pages 等
```

### Vercel 部署

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".vitepress/dist",
  "framework": "vitepress"
}
```

### Netlify 部署

```toml
[build]
  command = "pnpm build"
  publish = ".vitepress/dist"

[build.environment]
  NODE_VERSION = "18"
```

### GitHub Pages 部署

```yaml
# .github/workflows/deploy.yml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: pnpm install
      - run: pnpm build
      - uses: actions/deploy-pages@v2
        with:
          path: .vitepress/dist
```

## 🔍 搜索功能

### 内置搜索

VitePress 内置了全文搜索功能，无需额外配置：

```typescript
// .vitepress/config.mts
export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local', // 使用本地搜索
    },
  },
});
```

### Algolia 搜索

```typescript
// .vitepress/config.mts
export default defineConfig({
  themeConfig: {
    search: {
      provider: 'algolia',
      options: {
        appId: 'YOUR_APP_ID',
        apiKey: 'YOUR_API_KEY',
        indexName: 'YOUR_INDEX_NAME',
      },
    },
  },
});
```

## 📊 SEO 优化

### Meta 标签

```typescript
// .vitepress/config.mts
export default defineConfig({
  head: [
    [
      'meta',
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    ['meta', { name: 'description', content: '基于 VitePress 的静态站点模板' }],
    [
      'meta',
      { name: 'keywords', content: 'VitePress, Vue, TypeScript, 静态站点' },
    ],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
});
```

### 页面级 SEO

```markdown
---
title: 页面标题
description: 页面描述
keywords: 关键词1, 关键词2
---

# 页面内容
```

## 🚀 快速开始

1. **克隆项目**

   ```bash
   git clone <repository-url>
   cd vitepress-template
   ```

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **启动开发服务器**

   ```bash
   pnpm dev
   ```

4. **访问站点**
   - 打开 http://localhost:5173
   - 查看多语言切换功能
   - 体验响应式设计

5. **构建项目**

   ```bash
   pnpm build
   ```

6. **预览构建结果**
   ```bash
   pnpm preview
   ```

## 📄 许可证

MIT License
