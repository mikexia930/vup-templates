# @vup/ui

UI 组件库，默认基于 Element
Plus 的部分组件封装，提供常用业务组件与方法型 API。如果你希望替换为其它组件库，可按需替换对应实现。

`@vup/ui` 的定位是 Element Plus 的 V 前缀适配层：业务应用统一使用 `V*`
组件，避免直接和 `El*` 耦合。除自定义业务组件外，组件 props / events /
slots 默认遵循 Element Plus 官方文档。

## 安装

```bash
pnpm add @vup/ui
```

默认已内置 Element Plus 相关依赖，业务应用通常不需要再单独安装 `element-plus` 与
`@element-plus/icons-vue`。

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

## 可用组件

### 基础组件

| VUP 组件  | Element Plus |
| --------- | ------------ |
| `VButton` | `ElButton`   |
| `VIcon`   | `ElIcon`     |
| `VLink`   | `ElLink`     |
| `VText`   | `ElText`     |

### 表单组件

| VUP 组件         | Element Plus      |
| ---------------- | ----------------- |
| `VInput`         | `ElInput`         |
| `VInputNumber`   | `ElInputNumber`   |
| `VSelect`        | `ElSelect`        |
| `VOption`        | `ElOption`        |
| `VCheckbox`      | `ElCheckbox`      |
| `VCheckboxGroup` | `ElCheckboxGroup` |
| `VRadio`         | `ElRadio`         |
| `VRadioGroup`    | `ElRadioGroup`    |
| `VSwitch`        | `ElSwitch`        |
| `VDatePicker`    | `ElDatePicker`    |
| `VTimePicker`    | `ElTimePicker`    |
| `VUpload`        | `ElUpload`        |
| `VForm`          | `ElForm`          |
| `VFormItem`      | `ElFormItem`      |
| `VCascader`      | `ElCascader`      |
| `VColorPicker`   | `ElColorPicker`   |
| `VRate`          | `ElRate`          |
| `VSlider`        | `ElSlider`        |
| `VTransfer`      | `ElTransfer`      |

### 数据展示

| VUP 组件            | Element Plus         |
| ------------------- | -------------------- |
| `VTable`            | `ElTable`            |
| `VTableColumn`      | `ElTableColumn`      |
| `VTag`              | `ElTag`              |
| `VTree`             | `ElTree`             |
| `VPagination`       | `ElPagination`       |
| `VBadge`            | `ElBadge`            |
| `VAvatar`           | `ElAvatar`           |
| `VCard`             | `ElCard`             |
| `VCarousel`         | `ElCarousel`         |
| `VCarouselItem`     | `ElCarouselItem`     |
| `VCollapse`         | `ElCollapse`         |
| `VCollapseItem`     | `ElCollapseItem`     |
| `VDescriptions`     | `ElDescriptions`     |
| `VDescriptionsItem` | `ElDescriptionsItem` |
| `VEmpty`            | `ElEmpty`            |
| `VImage`            | `ElImage`            |
| `VProgress`         | `ElProgress`         |
| `VResult`           | `ElResult`           |
| `VSkeleton`         | `ElSkeleton`         |
| `VSkeletonItem`     | `ElSkeletonItem`     |
| `VTimeline`         | `ElTimeline`         |
| `VTimelineItem`     | `ElTimelineItem`     |

### 反馈组件

| VUP 组件        | Element Plus     |
| --------------- | ---------------- |
| `VDialog`       | `ElDialog`       |
| `VDrawer`       | `ElDrawer`       |
| `VPopconfirm`   | `ElPopconfirm`   |
| `VPopover`      | `ElPopover`      |
| `VTooltip`      | `ElTooltip`      |
| `VAlert`        | `ElAlert`        |
| `VMessage`      | `ElMessage`      |
| `VMessageBox`   | `ElMessageBox`   |
| `VNotification` | `ElNotification` |
| `VLoading`      | `ElLoading`      |

### 导航组件

| VUP 组件          | Element Plus       |
| ----------------- | ------------------ |
| `VMenu`           | `ElMenu`           |
| `VMenuItem`       | `ElMenuItem`       |
| `VSubMenu`        | `ElSubMenu`        |
| `VTabs`           | `ElTabs`           |
| `VTabPane`        | `ElTabPane`        |
| `VBreadcrumb`     | `ElBreadcrumb`     |
| `VBreadcrumbItem` | `ElBreadcrumbItem` |
| `VDropdown`       | `ElDropdown`       |
| `VDropdownMenu`   | `ElDropdownMenu`   |
| `VDropdownItem`   | `ElDropdownItem`   |
| `VSteps`          | `ElSteps`          |
| `VStep`           | `ElStep`           |

### 布局组件

| VUP 组件     | Element Plus  |
| ------------ | ------------- |
| `VContainer` | `ElContainer` |
| `VHeader`    | `ElHeader`    |
| `VAside`     | `ElAside`     |
| `VMain`      | `ElMain`      |
| `VFooter`    | `ElFooter`    |
| `VRow`       | `ElRow`       |
| `VCol`       | `ElCol`       |
| `VSpace`     | `ElSpace`     |
| `VDivider`   | `ElDivider`   |

### 自定义业务组件

| 组件         | 说明                       |
| ------------ | -------------------------- |
| `VFileList`  | 文件列表、上传、选择与分页 |
| `VFileModal` | 基于弹窗的文件选择器       |

同时导出文件类型：

```ts
import type { IFileSelectItem, VFileProps } from '@vup/ui';
import { EFileType, FileTypeSuffixes } from '@vup/ui';
```

## 注意事项

- 组件全局注册使用文件名作为组件名（如 `VButton`、`VModal`）。
- 模板中建议统一使用 `V*` 组件，避免和 `El*` 混用，保持 UI 层抽象一致。
- Element Plus 官方文档：https://element-plus.org/ ，具体用法请参考官方文档。
