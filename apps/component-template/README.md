# Vue 组件库模板

基于 Vue 3 + TypeScript + Vite Library
Mode 的组件库模板，专注发布可复用 Vue 组件。如果要开发
`http`、`socket`、`utils`、SDK 这类纯 TypeScript 基建包，请使用
`package-template`。

## 技术定位

- **主语是 Vue 组件库**：模板用于开发 `.vue` 组件、组件类型和样式。
- **Vite 负责构建**：使用 Vite Library Mode 处理 Vue SFC、CSS 和类型声明。
- **Vue 是 peer dependency**：组件库不打包 Vue，交给消费方项目提供。
- **入口只导出组件**：`src/index.ts` 汇总
  `src/components/`，不混入纯 TS 基建库示例。

## 快速开始

```bash
pnpm install
pnpm dev
```

构建与检查：

```bash
pnpm type-check
pnpm build
pnpm lint
pnpm format:check
```

## 目录结构

```txt
component-template/
├── src/
│   ├── components/
│   │   ├── Input/
│   │   │   ├── Input.vue       # 组件实现
│   │   │   ├── types.ts        # 组件公开类型
│   │   │   └── index.ts        # 组件入口
│   │   └── index.ts            # 组件统一导出
│   ├── index.ts                # 包入口
│   └── vue-shim.d.ts
├── vite.config.ts              # Vite Library Mode
├── package.json
└── tsconfig.json
```

## 组件约定

每个组件独立成目录：

```txt
src/components/<Name>/
├── <Name>.vue
├── types.ts
└── index.ts
```

约定：

- `<Name>.vue` 是真实组件实现，使用 `script setup` 和
  `defineOptions({ name })`。
- `types.ts` 只放组件公开类型，例如 Props、Emits、Size、Variant。
- `index.ts` 导出真实 Vue 组件和公开类型，不写假组件占位。
- `src/components/index.ts` 做 barrel export。
- `src/index.ts` 只作为包入口，不承载组件实现。

示例：

```typescript
// src/components/Input/index.ts
export { default as VInput } from './Input.vue';
export type { InputEmit, InputProps } from './types';
```

## 使用方式

```typescript
import { VInput } from 'your-component-lib';
import type { InputProps } from 'your-component-lib';
```

```vue
<template>
  <VInput v-model:value="value" clearable placeholder="请输入内容" />
</template>
```

## 构建产物

Vite 构建输出到 `.output/`：

```txt
.output/
├── index.es.js
├── index.cjs
├── index.d.ts
└── component.css
```

`package.json` 的入口字段必须和真实产物一致：

```json
{
  "main": "./.output/index.cjs",
  "module": "./.output/index.es.js",
  "types": "./.output/index.d.ts",
  "exports": {
    ".": {
      "types": "./.output/index.d.ts",
      "import": "./.output/index.es.js",
      "require": "./.output/index.cjs"
    }
  }
}
```

## 发布

发布前确认：

- `pnpm type-check` 通过。
- `pnpm build` 生成
  `.output/index.es.js`、`.output/index.cjs`、`.output/index.d.ts`。
- `package.json` 的 `name`、`version`、`peerDependencies`、`exports` 正确。

```bash
pnpm publish:npm
pnpm publish:beta
```

## 相关文档

- [Vue 3](https://vuejs.org/)
- [Vite Library Mode](https://vite.dev/guide/build.html#library-mode)
- [vite-plugin-dts](https://github.com/qmhc/vite-plugin-dts)
