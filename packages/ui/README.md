# @vup/ui

UI 组件库，默认基于 Element
Plus 的部分组件封装，提供常用业务组件与方法型 API。如果你希望替换为其它组件库，可按需替换对应实现。

## 安装

```bash
pnpm add @vup/ui
```

## 全局注册

```ts
import { createApp } from 'vue';
import App from './App.vue';
import VUI from '@vup/ui';

const app = createApp(App);
app.use(VUI);
app.mount('#app');
```

## 按需使用

```vue
<script setup lang="ts">
import { VButton } from '@vup/ui';
</script>

<template>
  <VButton type="primary">Primary</VButton>
</template>
```

## 方法型 API

```ts
import { VMessage, VMessageBox, VNotification, VLoading } from '@vup/ui';

VMessage.success('ok');
VNotification({ title: '提示', message: '内容' });
```

## 注意事项

- 组件全局注册使用文件名作为组件名（如 `VButton`、`VModal`）。
- Element Plus 官方文档：https://element-plus.org/ ，具体用法请参考官方文档。
