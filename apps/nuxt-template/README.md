# Nuxt SSR 应用模板

基于 Nuxt 4 + Vue 3 + TypeScript 的应用模板，面向 SSR /
SSG 网站、内容型应用和需要 Nuxt 文件路由约定的前端项目。

## 技术定位

- **主语是 Nuxt**：保留 `pages/`、`components/`、`stores/`、`api/`
  等 Nuxt 约定目录，不强行迁移到 `modules/`。
- **请求层使用 ofetch**：Nuxt 模板不使用 `@vup/http`，应用侧适配在
  `src/api/request.ts`。
- **i18n 使用 Nuxt 模块**：语言文件使用 `zh-CN` / `en-US`，由 `@nuxtjs/i18n`
  管理本地化路由。
- **样式优先走模板基座**：demo 使用 Tailwind CSS 和
  `_shared/assets/styles/theme` 语义色，覆盖不了的场景才补少量原生 CSS。
- **Nuxt modules 负责集成**：Pinia、i18n、Element Plus 都通过 Nuxt
  modules 注册，不使用 Vue SPA 的 `app.use` 方式。

## 快速开始

```bash
pnpm install
pnpm dev
```

默认开发地址：

```txt
http://localhost:9303
```

构建与预览：

```bash
pnpm build
pnpm generate
pnpm preview
```

质量检查：

```bash
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
```

## 目录结构

```txt
src/
├── api/
│   ├── demo.ts            # demo 业务接口
│   ├── request.ts         # ofetch 应用适配层
│   └── types.ts           # 通用 API 响应类型
├── components/
│   └── demo/              # demo 高内聚区块组件
├── pages/
│   ├── demo.vue           # /demo
│   └── index.vue          # 重定向到 /demo
├── plugins/
│   └── msw.client.ts      # 开发期 mock 启动
├── stores/
│   └── demo/
│       └── index.ts       # demo Pinia 状态
└── app.vue

i18n/
└── locales/
    ├── en-US.json
    └── zh-CN.json
```

## Demo 说明

当前 `/demo` 展示：

- Nuxt 文件路由和单页 demo 入口
- `@nuxtjs/i18n` 语言切换
- Pinia 运行时状态
- ofetch 请求适配层
- `@vup/mock` 拦截 `/api/template-demo/*`
- Nuxt modules 集成方式
- Nuxt 目录结构和职责边界

旧的 `/demo/guide` / `/demo/example`
任务板演示已移除，避免把模板能力展示变成业务表格示例。

## 请求层约定

- HTTP 客户端：ofetch
- 应用适配：`src/api/request.ts`
- 业务接口：`src/api/<domain>.ts`
- 通用响应类型：`src/api/types.ts`

Nuxt 不使用 `@vup/http`，因为 SSR、server routes、runtime
config 和 cookie 行为都更适合交给 Nuxt/ofetch 处理。

## 开发期 Mock

- 共享 mock 包：`@vup/mock`
- 开关：`NUXT_PUBLIC_USE_MOCK=true`
- 默认拦截：`/api/template-demo/*`

Mock 只用于模板演示和联调前验证。真实项目接入后端时，保持业务接口函数位置不变，替换 baseURL 或后端实现即可。

## 国际化

- 语言文件：`i18n/locales/en-US.json`、`i18n/locales/zh-CN.json`
- 默认语言：`en-US`
- 路由策略：`prefix_except_default`

## 验收建议

```bash
pnpm lint
pnpm build
```

重点手工检查：

- `/` 是否重定向到 `/demo`
- 中英文切换
- Runtime 的状态计数和 mock 请求
- 页面在桌面和窄屏下是否自适应

## 相关文档

- [Nuxt](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Nuxt i18n](https://i18n.nuxtjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ofetch](https://github.com/unjs/ofetch)

## 许可证

MIT License
