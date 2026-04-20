---
name: component-lib
description: >-
  Use when developing reusable component libraries or utility packages with
  component-template (Vue3 + Vite library mode). Covers component structure,
  typed props/emits, barrel exports, library build config, and npm publishing.
---

# component-lib

基于 `component-template` 的组件库 / 工具库开发。**可发布到 npm 的独立包**。

## 适用场景

- 可复用 Vue 组件库
- 纯 TypeScript 工具库
- 业务组件抽离成独立包
- 对应目录：`apps/<component-lib>/`

## 何时被加载

- new-project Phase 7 选定 component 栈
- new-feature 给组件库加新组件 / 工具
- maintenance 修组件库 bug

## component-template 特有约定

### 1. 目录结构

```
apps/<component-lib>/
├── src/
│   ├── index.ts                   统一导出入口
│   ├── components/                Vue 组件
│   │   ├── index.ts               组件统一导出
│   │   └── <Name>/
│   │       ├── <Name>.vue         组件实现
│   │       ├── <Name>.ts          组件逻辑（可选，复杂组件拆出）
│   │       ├── types.ts           Props / Emits 类型
│   │       └── index.ts           组件入口（导出组件 + 类型）
│   └── libs/                      纯 TS 工具
│       ├── index.ts               工具统一导出
│       └── <util>/
│           └── index.ts
├── package.json                   含 exports / types / main 字段
└── vite.config.ts                 Vite library mode 构建
```

### 2. 组件开发规范

```vue
<!-- src/components/Input/Input.vue -->
<template>
  <input
    :type="type"
    :value="value"
    :disabled="disabled"
    :placeholder="placeholder"
    @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
import type { InputProps } from './types';

withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'medium',
});

defineEmits<{
  'update:value': [value: string | number];
  change: [value: string | number];
}>();
</script>
```

关键点：

- **类型单独拆到 `types.ts`**：让消费方能 import type
- **Props 用 `interface` + `withDefaults`**
- **Emits 用 typed 定义**

### 3. 导出规范

```typescript
// src/components/index.ts — barrel 导出
export { default as VInput } from './Input/Input.vue';
export type { InputProps, InputEmit } from './Input/types';

// src/index.ts — 总入口
export * from './libs';
export * from './components';
```

### 4. package.json 关键字段

```json
{
  "main": "./.output/index.js",
  "module": "./.output/index.mjs",
  "types": "./.output/index.d.ts",
  "exports": {
    ".": {
      "types": "./.output/index.d.ts",
      "import": "./.output/index.mjs",
      "require": "./.output/index.js"
    }
  },
  "peerDependencies": {
    "vue": "^3.0.0"
  }
}
```

- `peerDependencies`：Vue 是 peer，不打包进产物
- `types`：指向类型声明入口
- `exports`：双格式（ESM + CJS）

### 5. 构建 & 发布

```bash
pnpm --filter <component> dev           # watch 模式
pnpm --filter <component> build         # Vite library mode 构建
pnpm --filter <component> type-check    # 类型检查
pnpm --filter <component> publish:npm   # 发布到 npm
pnpm --filter <component> publish:beta  # 发布 beta 版
```

## 实现新组件的步骤

1. 与用户确认组件名 + Props + Emits + 基本交互
2. 创建 `src/components/<Name>/` 目录
3. 先写 `types.ts`（Props / Emits interface）
4. 再写 `<Name>.vue`（模板 + script setup）
5. 写 `index.ts`（导出组件 + 类型）
6. 在 `src/components/index.ts` 追加 barrel 导出
7. 每完成一个组件 Gate 一次

## 关键决策点（AI 必须问用户）

1. **组件还是工具库**：Vue 组件 / 纯 TS 工具 / 两者都有？
2. **是否发布 npm**：公开包还是 monorepo 内部使用（`workspace:*`）？
3. **是否需要样式**：组件带样式还是 headless（只提供逻辑）？
4. **依赖策略**：Vue 是 peer，还有其他 peer dependencies？

## 产出位置

- 组件：`apps/<component>/src/components/<Name>/`
- 工具：`apps/<component>/src/libs/<util>/`
- 导出入口：`apps/<component>/src/index.ts`

## 资源

```
component-lib/
└── SKILL.md            本文件
```

Vite Library Mode：https://vitejs.dev/guide/build.html#library-mode
