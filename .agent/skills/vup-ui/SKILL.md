---
name: vup-ui
description: >-
  Use when implementing UI in any frontend app. Two packages: @vup/ui (Element
  Plus, V* prefix, for vue/electron/qiankun) and @vup/ui-mobile (Ionic Vue, VM*
  prefix, for capacitor). Guides AI to use V*/VM* components instead of El*/Ion*
  directly, and to use method-based APIs (VMessage, VMToast) for feedback.
---

# vup-ui

基座 UI 组件库使用指引。**核心原则：用 `V*` / `VM*` 前缀组件，不直接用 `El*` /
`Ion*`。**

## 两个包

| 包               | 底层         | 组件前缀 | 适用 stack               | 注册方式        |
| ---------------- | ------------ | -------- | ------------------------ | --------------- |
| `@vup/ui`        | Element Plus | `V*`     | vue / electron / qiankun | `app.use(VUI)`  |
| `@vup/ui-mobile` | Ionic Vue    | `VM*`    | capacitor                | `app.use(VMUI)` |

## 何时被加载

- 实现任何 UI 页面 / 组件
- 选择用哪个反馈 API（VMessage vs VMToast）
- 排查"组件未注册"问题

## 必须遵守

1. **统一用 `V*` / `VM*` 前缀**
   - ❌ `<ElButton>` / `<IonButton>` — 禁止直接用底层库组件名
   - ✅ `<VButton>` / `<VMButton>` — 用基座封装的别名
   - 理由：保持 UI 层抽象一致，未来切换底层库不影响业务代码

2. **全局注册后无需 import**
   - `app.use(VUI)` 后所有 `V*` 组件全局可用
   - 模板中直接写 `<VButton>`、`<VTable>` 即可
   - 如需按需引入（tree-shaking）：`import { VButton } from '@vup/ui'`

3. **方法型 API 按平台选**

   桌面端（@vup/ui）：

   ```typescript
   import { VMessage, VMessageBox, VNotification, VLoading } from '@vup/ui';
   VMessage.success('保存成功');
   VMessageBox.confirm('确认删除？');
   ```

   移动端（@vup/ui-mobile）：

   ```typescript
   import { VMToast, VMAlert, VMLoading } from '@vup/ui-mobile';
   VMToast('保存成功');
   VMAlert('确认删除？');
   ```

4. **自定义组件也用 PascalCase**
   - `<UserFormDialog>`、`<OrderList>` — 业务组件不加 V/VM 前缀
   - V/VM 前缀保留给基座 UI 包

## @vup/ui 可用组件速查

### 基础

`VButton` `VIcon` `VLink` `VText`

### 表单

`VInput` `VInputNumber` `VSelect` `VOption` `VCheckbox` `VCheckboxGroup`
`VRadio` `VRadioGroup` `VSwitch` `VDatePicker` `VTimePicker` `VUpload` `VForm`
`VFormItem` `VCascader` `VColorPicker` `VRate` `VSlider` `VTransfer`

### 数据展示

`VTable` `VTableColumn` `VTag` `VTree` `VPagination` `VBadge` `VAvatar` `VCard`
`VCarousel` `VCarouselItem` `VCollapse` `VCollapseItem` `VDescriptions`
`VDescriptionsItem` `VEmpty` `VImage` `VProgress` `VResult` `VSkeleton`
`VSkeletonItem` `VTimeline` `VTimelineItem`

### 反馈

`VDialog` `VDrawer` `VPopconfirm` `VPopover` `VTooltip` `VAlert` `VMessage`
`VMessageBox` `VNotification` `VLoading`

### 导航

`VMenu` `VMenuItem` `VSubMenu` `VTabs` `VTabPane` `VBreadcrumb`
`VBreadcrumbItem` `VDropdown` `VDropdownMenu` `VDropdownItem` `VSteps` `VStep`

### 布局

`VContainer` `VHeader` `VAside` `VMain` `VFooter` `VRow` `VCol` `VSpace`
`VDivider`

### 自定义业务组件

`VFileModal` `VFileList`

## @vup/ui-mobile 可用组件

详见 `packages/ui-mobile/README.md`。核心：`VM*` 前缀组件 + `VMToast` /
`VMAlert` / `VMLoading` 方法型 API。

## 样式

- **Tailwind 优先**：能用 utility class 解决的不写自定义 CSS（详见
  `.agent/rules/vue-component.md`）
- 主题定制见 `packages/ui/src/theme.scss` 和 `_shared/assets/styles/`
- Element Plus 官方文档：https://element-plus.org/
- Ionic Vue 官方文档：https://ionicframework.com/docs/vue/overview

## 关键决策点（AI 必须问用户）

1. **用哪个 UI 包**：`@vup/ui`（桌面）还是
   `@vup/ui-mobile`（移动）？通常由 stack 决定，不需要额外问
2. **缺失组件怎么处理**：
   - 方案 A：业务层直接用 `El*` / `Ion*`（快速，但破坏抽象）
   - 方案 B：在 `@vup/ui` 包里补一个 `V*` 别名（推荐）
   - 必须停下问用户选 A 还是 B
3. **是否需要自定义主题**：需要时修改 `packages/ui/src/theme.scss`

## 产出位置

- 全局注册：`apps/<app>/src/main.ts`（`app.use(VUI)` 或 `app.use(VMUI)`）
- 主题定制：`packages/ui/src/theme.scss`
- 新增 V\* 组件：`packages/ui/src/index.ts`（补别名 + 全局注册）

## 引用关系

本 skill 被引用：

- 所有 stack skills — 实现 UI 页面时加载
- `crud-page` pattern — 表格 / 表单 / 弹窗组件选择
- `admin-layout` pattern — 菜单 / 布局组件选择
- `login-page` pattern — 表单组件选择

## 资源

```
vup-ui/
└── SKILL.md            本文件（无 examples，直接参考 packages/ui/README.md）
```

详细 API 和用法：

- 桌面端：`packages/ui/README.md`
- 移动端：`packages/ui-mobile/README.md`
- Element Plus 官方：https://element-plus.org/
- Ionic Vue 官方：https://ionicframework.com/docs/vue/overview
