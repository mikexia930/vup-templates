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
  <!-- icon 填「前缀后面的名字」：若 CSS 为 .icon-shuidi，则 icon="shuidi" -->
  <VIconFont icon="shuidi" />
  <VIconFont icon="shuidi" size="20px" color="#409eff" />
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

## Props

组件渲染为
`<i>`，最终类名为：`[fontfamily, `${prefix}-${icon}`, customClass]`（空值会省略）；内联样式为
`font-size`、`color`。

| 属性          | 类型               | 默认值       | 说明                                                                                                                                                                                                                                    |
| ------------- | ------------------ | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `icon`        | `string`           | —            | **必填。** 图标在 Font class 里的名称，即 `.${prefix}-${icon}` 中 **横线之后** 那一段。例如 CSS 为 `.icon-add` 时传 `icon="add"`，不要写成 `icon="icon-add"`（否则会变成 `icon-icon-add`）。                                            |
| `size`        | `string \| number` | `'16px'`     | 图标大小。传 `number` 时按像素处理，会渲染为 `${size}px`；传 `string` 时原样作为 `font-size`（如 `'1.2em'`）。                                                                                                                          |
| `color`       | `string`           | `'inherit'`  | 图标颜色，对应 CSS `color`。                                                                                                                                                                                                            |
| `prefix`      | `string`           | `'icon'`     | **需与 iconfont 下载产物一致：** 在 iconfont.cn 使用 **Font class** 生成代码时，每个图标类名形如 `.前缀-名称`（常见前缀为 `icon`）。`prefix` 必须与当前 `iconfont.css` 里该前缀一致。                                                   |
| `fontfamily`  | `string`           | `'iconfont'` | **需与 iconfont 下载产物一致：** Font class 样式里会有一个 **基础类**（通常名为 `iconfont`），用于设置 `font-family`。`fontfamily` 必须与 `iconfont.css` 中该基础类 **类名** 一致；若在平台上改过项目/类名，替换资源后需同步改此 prop。 |
| `customClass` | `string`           | —            | 额外类名，用于布局或覆盖样式。                                                                                                                                                                                                          |

### 与 iconfont.cn 下载设置的关系

- 替换 `src/assets/` 下的 `iconfont.css` 与字体文件后，应用打开 **Font class**
  面板里生成的 CSS：其中的 **基础类**（如
  `.iconfont { font-family: "iconfont" ... }`）对应
  `fontfamily`；**每个图标的类名前缀**（如 `.icon-xxx` 里的 `icon`）对应
  `prefix`。
- 若只使用本包自带资源且未改生成选项，一般 **无需传**
  `prefix`、`fontfamily`，使用默认值即可。

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
- 若新 CSS 中基础类名或图标类前缀与默认不同，在业务中传入对应的
  `fontfamily`、`prefix`

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
