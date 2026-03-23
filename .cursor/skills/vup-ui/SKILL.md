---
name: vup-ui
description: >-
  Guide for using @vup/ui component library (Vue3 + Element Plus). Use when
  building UI with V-prefixed components, file manager, or working in
  packages/ui, or when user mentions VButton, VTable, VFileModal, Element Plus
  components, or @vup/ui.
---

# @vup/ui 组件库使用指南

`@vup/ui` 是基于 Element Plus 的封装层，将所有 `El*` 组件以 `V*`
前缀重新导出，并提供自定义业务组件（文件管理器等）。

## 安装与注册

### 全局注册（推荐）

```typescript
// src/main.ts
import VupUI from '@vup/ui';

app.use(VupUI);
// 所有 V* 组件自动全局可用，无需逐个 import
```

### 按需引入

```typescript
import { VButton, VTable, VDialog } from '@vup/ui';
```

## peer 依赖

消费方需自行安装：

```bash
pnpm add element-plus @element-plus/icons-vue
```

## 组件映射

所有 Element Plus 组件均以 `V` 前缀重新导出，Props / Events / Slots 与 Element
Plus 完全一致。

### Basic

| V 组件    | Element Plus |
| --------- | ------------ |
| `VButton` | `ElButton`   |
| `VIcon`   | `ElIcon`     |
| `VLink`   | `ElLink`     |
| `VText`   | `ElText`     |

### Form

| V 组件                         | Element Plus                     |
| ------------------------------ | -------------------------------- |
| `VInput`                       | `ElInput`                        |
| `VInputNumber`                 | `ElInputNumber`                  |
| `VSelect` / `VOption`          | `ElSelect` / `ElOption`          |
| `VCheckbox` / `VCheckboxGroup` | `ElCheckbox` / `ElCheckboxGroup` |
| `VRadio` / `VRadioGroup`       | `ElRadio` / `ElRadioGroup`       |
| `VSwitch`                      | `ElSwitch`                       |
| `VDatePicker`                  | `ElDatePicker`                   |
| `VTimePicker`                  | `ElTimePicker`                   |
| `VUpload`                      | `ElUpload`                       |
| `VForm` / `VFormItem`          | `ElForm` / `ElFormItem`          |
| `VCascader`                    | `ElCascader`                     |
| `VColorPicker`                 | `ElColorPicker`                  |
| `VRate`                        | `ElRate`                         |
| `VSlider`                      | `ElSlider`                       |
| `VTransfer`                    | `ElTransfer`                     |

### Data Display

| V 组件                                | Element Plus                            |
| ------------------------------------- | --------------------------------------- |
| `VTable` / `VTableColumn`             | `ElTable` / `ElTableColumn`             |
| `VTag`                                | `ElTag`                                 |
| `VTree`                               | `ElTree`                                |
| `VPagination`                         | `ElPagination`                          |
| `VBadge`                              | `ElBadge`                               |
| `VAvatar`                             | `ElAvatar`                              |
| `VCard`                               | `ElCard`                                |
| `VCarousel` / `VCarouselItem`         | `ElCarousel` / `ElCarouselItem`         |
| `VCollapse` / `VCollapseItem`         | `ElCollapse` / `ElCollapseItem`         |
| `VDescriptions` / `VDescriptionsItem` | `ElDescriptions` / `ElDescriptionsItem` |
| `VEmpty`                              | `ElEmpty`                               |
| `VImage`                              | `ElImage`                               |
| `VProgress`                           | `ElProgress`                            |
| `VResult`                             | `ElResult`                              |
| `VSkeleton`                           | `ElSkeleton`                            |
| `VTimeline` / `VTimelineItem`         | `ElTimeline` / `ElTimelineItem`         |

### Feedback

| V 组件          | Element Plus                 |
| --------------- | ---------------------------- |
| `VDialog`       | `ElDialog`                   |
| `VDrawer`       | `ElDrawer`                   |
| `VMessage`      | `ElMessage`（函数调用）      |
| `VMessageBox`   | `ElMessageBox`（函数调用）   |
| `VNotification` | `ElNotification`（函数调用） |
| `VPopconfirm`   | `ElPopconfirm`               |
| `VPopover`      | `ElPopover`                  |
| `VTooltip`      | `ElTooltip`                  |
| `VAlert`        | `ElAlert`                    |
| `VLoading`      | `ElLoading`（指令/函数）     |

### Navigation

| V 组件                                          | Element Plus                                       |
| ----------------------------------------------- | -------------------------------------------------- |
| `VMenu` / `VMenuItem` / `VSubMenu`              | `ElMenu` / `ElMenuItem` / `ElSubMenu`              |
| `VTabs` / `VTabPane`                            | `ElTabs` / `ElTabPane`                             |
| `VBreadcrumb` / `VBreadcrumbItem`               | `ElBreadcrumb` / `ElBreadcrumbItem`                |
| `VDropdown` / `VDropdownMenu` / `VDropdownItem` | `ElDropdown` / `ElDropdownMenu` / `ElDropdownItem` |
| `VSteps` / `VStep`                              | `ElSteps` / `ElStep`                               |

### Layout

| V 组件                                                    | Element Plus       |
| --------------------------------------------------------- | ------------------ |
| `VContainer` / `VHeader` / `VAside` / `VMain` / `VFooter` | `ElContainer` 系列 |
| `VRow` / `VCol`                                           | `ElRow` / `ElCol`  |
| `VSpace`                                                  | `ElSpace`          |
| `VDivider`                                                | `ElDivider`        |

## 自定义组件

### VFileModal — 文件选择弹窗

通过 `ref` 控制打开/关闭，选择文件后触发 `selected` 事件。

```vue
<template>
  <VButton @click="fileModalRef?.open()">选择文件</VButton>
  <VFileModal
    ref="fileModalRef"
    :type="EFileType.IMAGE"
    :suffixes="['png', 'jpg']"
    :limit="5"
    :selected="selectedFiles"
    :list="fileList"
    :pagination="pagination"
    @selected="onSelected"
  />
</template>
```

**Props（`VFileProps`）：**

| Prop         | 类型                    | 说明                                   |
| ------------ | ----------------------- | -------------------------------------- |
| `type`       | `EFileType`             | 文件类型（`IMAGE` / `MEDIA` / `FILE`） |
| `suffixes`   | `string[]`              | 允许的后缀                             |
| `limit`      | `number`                | 最大选择数量                           |
| `selected`   | `IFileSelectItem[]`     | 已选文件                               |
| `list`       | `IFileSelectItem[]`     | 文件列表数据                           |
| `pagination` | `{ total, size, page }` | 分页信息                               |

**Ref Methods：** `open()` / `close()`

**Events：** `@selected` → `(items: IFileSelectItem[]) => void`

### VFileList — 文件列表

`VFileModal` 内部使用的列表组件，也可独立使用。Props 同 `VFileProps`。

### 类型导出

```typescript
import { EFileType, FileTypeSuffixes } from '@vup/ui';
import type { IFileSelectItem, VFileProps } from '@vup/ui';
```

`EFileType` 枚举值：`IMAGE`、`MEDIA`、`FILE`

`FileTypeSuffixes` 定义每种类型的默认后缀。

## 主题定制

@vup/ui 引入了 `_shared/assets/styles/theme.scss` 和自身的
`theme.scss`，通过 CSS 变量定制主题色、间距等。修改 `_shared/assets/styles/`
下的变量文件即可全局生效。

## 注意事项

- 在模板中统一使用 `V*` 前缀，不要混用 `El*`，保持封装一致性
- `VMessage`、`VMessageBox`、`VNotification`、`VLoading`
  是函数式调用，非组件注册
- uni-app 不能使用本包（不在 workspace 中，且不支持 Element Plus）
