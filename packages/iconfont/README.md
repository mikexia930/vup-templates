# @vup/iconfont

通用 Iconfont 组件与资源包，适用于 Web 与移动端项目。

Iconfont 官网：https://www.iconfont.cn/

## 安装

```bash
pnpm add @vup/iconfont
```

## 使用方式

### 组件方式

```vue
<script setup lang="ts">
import { VIconFont } from '@vup/iconfont';
</script>

<template>
  <VIconFont name="icon-add" />
</template>
```

### 全局注册

在入口文件中注册后，业务组件里无需再单独引入：

```ts
import { createApp } from 'vue';
import App from './App.vue';
import { VIconFont } from '@vup/iconfont';

const app = createApp(App);
app.component('VIconFont', VIconFont);
app.mount('#app');
```

## 替换你自己的 iconfont 资源

你可以直接替换以下目录里的文件（保持文件名一致）：

```
packages/iconfont/src/assets/
  ├─ iconfont.css
  ├─ iconfont.woff
  ├─ iconfont.woff2
  └─ iconfont.ttf
```

替换后请确认：

- `iconfont.css` 中的字体文件路径使用相对路径（例如 `./iconfont.woff2`）
- 组件内的样式引入路径与实际文件保持一致

## 目录结构

```
packages/iconfont/
  ├─ src/iconfont/VIconFont.vue
  ├─ src/assets/
  │  ├─ iconfont.css
  │  ├─ iconfont.woff
  │  ├─ iconfont.woff2
  │  └─ iconfont.ttf
  └─ src/index.ts
```
