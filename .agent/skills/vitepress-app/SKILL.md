---
name: vitepress-app
description: >-
  Use when building documentation sites with vitepress-template (VitePress).
  Covers markdown content, config, sidebar/nav, i18n, custom theme. Suitable for
  project docs, API docs, product landing pages.
---

# vitepress-app

基于 `vitepress-template`
的文档站点开发。**用 Markdown 写内容，VitePress 自动生成站点**。

## 适用场景

- 项目文档站点
- API 文档
- 产品介绍页 / Landing Page
- 对应目录：`apps/<vitepress-app>/`

## 何时被加载

- new-project Phase 7 选定 vitepress 栈
- new-feature 给文档站加新页面 / 新功能
- maintenance 更新文档内容

## VitePress 平台特有约定

### 1. 目录结构

```
apps/<vitepress-app>/
├── .vitepress/
│   ├── config.mts             VitePress 配置
│   └── theme/                 主题扩展
├── src/
│   ├── index.md               首页（Hero + Features）
│   ├── docs.md                文档页示例
│   ├── en/                    英文版
│   │   ├── index.md
│   │   └── docs.md
│   ├── public/                静态资源
│   │   ├── favicon.ico
│   │   └── images/
├── package.json
└── tsconfig.json
```

### 2. Markdown 即页面

每个 `.md` 文件自动成为一个页面：

```
src/index.md      → /
src/docs.md       → /docs
src/guide/start.md → /guide/start
src/en/index.md   → /en/
```

### 3. Frontmatter

```markdown
---
title: 快速开始
description: 5 分钟上手指南
---

# 快速开始

内容...
```

首页特殊 frontmatter（Hero 布局）：

```markdown
---
layout: home
hero:
  name: 项目名称
  text: 一句话描述
  tagline: 补充说明
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/start
features:
  - title: 特性 1
    details: 描述...
  - title: 特性 2
    details: 描述...
---
```

### 4. 配置（.vitepress/config.mts）

```typescript
import { defineConfig } from 'vitepress';

export default defineConfig({
  title: '项目文档',
  description: '项目描述',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/start' },
      { text: 'API', link: '/api/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '入门',
          items: [
            { text: '快速开始', link: '/guide/start' },
            { text: '安装', link: '/guide/install' },
          ],
        },
      ],
    },
  },
});
```

### 5. 多语言（i18n）

基座已有中英文目录结构（`src/` 中文 + `src/en/` 英文）。

配置多语言：

```typescript
export default defineConfig({
  locales: {
    root: { label: '中文', lang: 'zh-CN' },
    en: { label: 'English', lang: 'en-US' },
  },
});
```

### 6. 自定义主题

VitePress 支持扩展默认主题：

```
.vitepress/
├── theme/
│   ├── index.ts          自定义主题入口
│   └── CustomLayout.vue  自定义布局
```

### 7. Demo 与样式

模板 demo 聚焦 VitePress 文档站能力，不要改成普通 Vue SPA 介绍页。应体现：

- Markdown 文件路由
- home frontmatter
- 中英文目录
- nav/sidebar/search 配置
- theme 扩展和全局组件注册
- 静态构建输出

样式优先使用 Tailwind CSS 与 `_shared/assets/styles/theme`
语义 token；不要维护私有 SCSS 颜色变量、mixin 或自定义 dark/light 演示。

模板默认不保留 GitHub social link，除非用户明确提供项目仓库地址。

### 8. 构建 & 部署

```bash
pnpm --filter <vitepress-app> dev       # 开发预览
pnpm --filter <vitepress-app> build     # 构建静态站点
pnpm --filter <vitepress-app> preview   # 预览构建产物
```

产物在 `.output/`，可部署到 Vercel / Netlify / Nginx 等静态托管服务。

## 实现新页面的步骤

1. 与用户确认页面内容和导航位置
2. 在 `src/` 对应目录创建 `.md` 文件
3. 在 `.vitepress/config.mts` 更新 sidebar / nav
4. 如有多语言，同步创建 `en/` 对应文件
5. 每完成一个页面 Gate 一次

## 关键决策点（AI 必须问用户）

1. **站点定位**：项目文档 / API 文档 / 产品介绍？
2. **是否需要多语言**：中英文双语？
3. **导航结构**：顶部导航 + 侧边栏怎么组织？
4. **是否需要自定义主题**：默认主题够用还是需要品牌定制？
5. **部署方式**：Vercel / GitHub Pages / 自托管？

## 产出位置

- 内容页面：`apps/<vitepress>/src/<path>.md`
- 配置：`apps/<vitepress>/.vitepress/config.mts`
- 静态资源：`apps/<vitepress>/src/public/`

## 资源

```
vitepress-app/
└── SKILL.md            本文件
```

VitePress 官方文档：https://vitepress.dev/
