# Capacitor 移动端应用模板

基于 Capacitor + Vue 3 的移动端应用模板，面向 iOS / Android 真机打包与运行。  
核心目标是：保留 Vue 开发体验，同时具备移动端工程化能力（平台添加、同步、原生工程打开）。

## 技术定位

- **主语是 Capacitor**：这是移动端应用模板，不是普通 Web 页模板。
- **UI 层实现是 `@vup/ui-mobile`**：基于 Ionic Vue 的 `VM*` 组件封装层。
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
│       ├── views/            # demo 页面（layout / guide / example）
│       ├── components/
│       ├── stores/           # 模块内业务 store
│       ├── api/
│       ├── types/
│       └── locales/          # 模块内文案
├── App.vue
└── main.ts
```

> 旧 `src/views/*` 示例页已迁移到 `src/modules/demo/*`。

## UI 约定（移动端）

- 使用 `@vup/ui-mobile` 提供的 `VM*` 组件。
- 业务代码优先 `VM*`，避免直接散用 `Ion*`。
- 语言切换为全局操作，位于 demo 顶部区域，不与 tab 逻辑耦合。

## 开发期 Mock（MSW）

- 共享 mock 包：`@vup/mock`
- 开关：`VITE_ENABLE_MOCK=true`
- 适用于移动端 Web 调试阶段的接口模拟（后续业务 API 接入后可直接复用）

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

## 平台要求

- **iOS**：macOS + Xcode
- **Android**：Android Studio + SDK + Java
