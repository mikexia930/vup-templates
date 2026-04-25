# VitePress Template

基于 VitePress 的文档站模板，适合项目文档、API 文档和产品说明站点。模板重点保留 Markdown 页面、多语言目录、导航/侧边栏、本地搜索和主题扩展能力。

## 技术栈

- VitePress
- Vue 3
- Markdown
- Tailwind CSS + `_shared/assets/styles/theme`

## 快速开始

```bash
pnpm --dir apps/vitepress-template dev
```

默认端口：`9302`

构建和预览：

```bash
pnpm --dir apps/vitepress-template build
pnpm --dir apps/vitepress-template preview
```

构建产物输出到 `.output/`。

## 目录结构

```txt
apps/vitepress-template/
├── .vitepress/
│   ├── config.mts                 # 站点、多语言、导航、侧边栏、搜索配置
│   └── theme/
│       ├── components/Demo.vue     # 首页能力展示组件
│       ├── locales/                # 主题组件文案
│       ├── index.ts                # 默认主题扩展入口
│       └── styles.scss             # Tailwind/theme 与 VitePress token 映射
├── src/
│   ├── index.md                    # 中文首页
│   ├── docs.md                     # 中文文档页
│   ├── en/
│   │   ├── index.md                # 英文首页
│   │   └── docs.md                 # 英文文档页
│   └── public/                     # 静态资源
├── package.json
└── README.md
```

## 页面约定

每个 Markdown 文件对应一个路由：

```txt
src/index.md     -> /
src/docs.md      -> /docs
src/en/index.md  -> /en/
src/en/docs.md   -> /en/docs
```

首页使用 VitePress `layout: home` frontmatter 声明 hero 和 actions，页面下方通过
`<Demo />` 展示模板能力。

## 多语言

模板默认中文为根路径，英文放在 `src/en/`。站点语言、导航、侧边栏和搜索文案都在
`.vitepress/config.mts` 中维护。

主题组件文案放在：

```txt
.vitepress/theme/locales/zh-CN.json
.vitepress/theme/locales/en-US.json
```

## 主题

`.vitepress/theme/index.ts`
扩展 VitePress 默认主题并注册全局组件。样式优先使用 Tailwind CSS 和
`_shared/assets/styles/theme` token，不再维护独立的私有颜色体系。

## 部署

`.output/` 是静态站点产物，可部署到 Vercel、Netlify、Nginx 或其它静态托管服务。
