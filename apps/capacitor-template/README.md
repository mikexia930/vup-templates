# Capacitor 应用模板

基于 Capacitor + Vue 3 的跨端应用模板，面向 Web 预览与 iOS /
Android 真机打包运行。核心目标是：保留 Vue 开发体验，同时具备 Capacitor 原生工程能力（平台添加、同步、原生工程打开）。

## 技术定位

- **主语是 Capacitor**：这是 Capacitor 应用模板，不是普通 Web 页模板。
- **demo 是自适应页面**：同一套页面覆盖桌面 Web 预览、平板和手机窄屏，不做固定手机壳预览。
- **demo 不依赖业务 UI 组件库**：模板能力展示使用原生 HTML/CSS，避免把 UI 依赖作为默认前提。
- **需要移动端组件时可选接入 `@vup/ui-mobile`**：它基于 Ionic Vue，提供 `VM*`
  组件封装层；不需要时可以继续使用原生 HTML/CSS 或自行选择 UI 方案。
- **结构遵循模块化**：业务代码聚合到 `src/modules/<name>/`。

## 快速开始

```bash
pnpm install
pnpm dev
```

本地开发默认端口：`9305`

## 移动端工作流

```bash
# iOS
pnpm ios:add
pnpm ios:build
pnpm ios:open

# Android
pnpm android:add
pnpm android:build
pnpm android:open
```

常用一键命令：

```bash
pnpm ios
pnpm android
```

## 目录结构（当前模板口径）

```txt
src/
├── api/
│   ├── request.ts            # 应用侧请求适配层（基于 @vup/http）
│   └── types.ts
├── locales/                  # 根语言包（全局通用文案）
├── router/                   # 根路由
├── modules/
│   └── demo/
│       ├── views/            # 页面入口
│       ├── components/       # 自适应展示组件
│       ├── stores/           # 模块内运行时状态
│       ├── api/              # 模块接口函数与接口契约类型
│       ├── types/            # 模块级共享类型
│       └── locales/          # 模块内文案
├── App.vue
└── main.ts
```

> 旧 `src/views/*` 示例页已迁移到 `src/modules/demo/*`。

## UI 约定

- demo 页面不使用 `@vup/ui-mobile`
  组件，方便用户直接理解模板结构、响应式布局和 Capacitor 工作流。
- 真实业务需要移动端组件库时，再接入 `@vup/ui-mobile` 提供的 `VM*` 组件。
- 如果项目不需要组件库，可以继续使用原生 HTML/CSS 或按业务自行选择 UI 方案。
- demo 页面必须是响应式页面：桌面优先展示完整信息架构，窄屏收敛为单列与抽屉导航。
- 原生 App 页面需要考虑 `safe-area` 与底部手势区域，避免贴边和被系统手势遮挡。
- 模板 demo 不提供白天 / 黑夜模式切换；如业务需要主题能力，由业务层自行设计。

## 模块约定

- 页面入口只负责组合模块组件，不承载组件内部静态配置。
- API 请求 / 响应类型跟 `api` 走，例如 `src/modules/<name>/api/types.ts`。
- `src/modules/<name>/types` 只放模块内多处共享、且不只属于接口契约的领域类型。
- 模块文案使用 BCP 47 文件名：`zh-CN.ts` / `en-US.ts`。

## 代码质量

```bash
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
pnpm build
```

## 相关文档

- [Capacitor](https://capacitorjs.com/)
- [Ionic Vue](https://ionicframework.com/docs/vue/overview)
- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue i18n](https://vue-i18n.intlify.dev/)
- Mock 接入参考：`vup example mock`（[examples/mock](../../examples/mock/README.md)）

## 平台要求

- **iOS**：macOS + Xcode
- **Android**：Android Studio + SDK + Java
