# Vue 组件规范

## 必须使用 Composition API + script setup

```vue
<!-- ✅ 正确 -->
<script setup lang="ts">
const props = defineProps<{ title: string; count?: number }>();
const emit = defineEmits<{ update: [value: string]; close: [] }>();
</script>

<!-- ❌ 禁止 Options API -->
<script>
export default { props: ['title'], ... }
</script>

<!-- ❌ 禁止非类型化 props -->
<script setup>
defineProps(['title', 'count']);
</script>
```

## 组件使用

- 使用 `V*` 前缀组件（`<VButton>`、`<VTable>`），不要直接用 `<ElButton>`
- 自定义业务组件也用 PascalCase：`<UserFormDialog>`、`<OrderList>`
- 全局注册的 V\* 组件无需 import；模块内组件需显式 import

## 样式

- **Tailwind 优先**：能用 utility class 解决的不写自定义 CSS
- 必须用 `<style scoped>`，禁止无 scoped 的全局样式污染
- 动态样式用 `:class` 或 `:style` 绑定，不要用 JavaScript 操作 DOM 样式

## 事件处理函数

- 命名用 `handle` 前缀：`handleSubmit`、`handleDelete`、`handleSearch`
- 异步操作需加 loading 状态防止重复提交

## ⚠️ 组件拆分标准（强制执行）

> **前端开发的核心能力是组件化。**
> 每一个独立的 UI 功能都应该是一个独立的组件，不允许把所有东西堆在一个文件里。

### 必须拆组件的情况

- **同一 UI 结构在 2 个以上页面 / 位置出现** → 必须提取为公共组件
- **单个 `<template>` 超过 150 行** → 必须按 UI 区域拆分为子组件
- **一个组件内有 2 个以上独立的交互逻辑**（如表单 + 表格 + 弹窗）→ 必须拆开，每个交互逻辑一个组件
- **弹窗 / 抽屉 / 确认框** → 必须独立为单独组件，不要内联在页面中

### 组件职责原则

- **一个组件只负责一个 UI 职责**（展示 / 输入 / 布局），不要把业务逻辑塞进纯展示组件
- **展示组件（Dumb）**：只接收 props、触发 emit，不直接调 API 或操作 store
- **容器组件（Smart）**：负责数据获取、状态管理，把数据传给展示组件
- 页面级 view 充当容器，组合多个子组件；子组件保持独立可复用

### 逻辑复用

- 多个组件共享的状态 / 逻辑 → **必须提取为 composable**，不要在组件间复制代码
- composable 放置位置：模块内共享 → `modules/<name>/composables/`；跨模块共享 →
  `src/common/composables/`
