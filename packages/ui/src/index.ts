import 'element-plus/dist/index.css';
import '../../../_shared/assets/styles/theme.scss';
import type { App, Component } from 'vue';

import './theme.scss';

// Custom components
import VFileModal from './fileManager/VFileModal.vue';
import VFileList from './fileManager/VFileList.vue';
import { EFileType, FileTypeSuffixes } from './fileManager/types';

// ============================================================
// Plugin install (global registration)
// ============================================================

import {
  ElButton,
  ElIcon,
  ElLink,
  ElText,
  ElInput,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElCheckbox,
  ElCheckboxGroup,
  ElRadio,
  ElRadioGroup,
  ElSwitch,
  ElDatePicker,
  ElTimePicker,
  ElUpload,
  ElForm,
  ElFormItem,
  ElCascader,
  ElColorPicker,
  ElRate,
  ElSlider,
  ElTransfer,
  ElTable,
  ElTableColumn,
  ElTag,
  ElTree,
  ElPagination,
  ElBadge,
  ElAvatar,
  ElCard,
  ElCarousel,
  ElCarouselItem,
  ElCollapse,
  ElCollapseItem,
  ElDescriptions,
  ElDescriptionsItem,
  ElEmpty,
  ElImage,
  ElProgress,
  ElResult,
  ElSkeleton,
  ElTimeline,
  ElTimelineItem,
  ElDialog,
  ElDrawer,
  ElPopconfirm,
  ElPopover,
  ElTooltip,
  ElAlert,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElTabs,
  ElTabPane,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElSteps,
  ElStep,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElFooter,
  ElRow,
  ElCol,
  ElSpace,
  ElDivider,
} from 'element-plus';

// ============================================================
// Element Plus re-exports (V prefix)
// ============================================================

// --- Basic ---
export { ElButton as VButton } from 'element-plus';
export { ElIcon as VIcon } from 'element-plus';
export { ElLink as VLink } from 'element-plus';
export { ElText as VText } from 'element-plus';

// --- Form ---
export { ElInput as VInput } from 'element-plus';
export { ElInputNumber as VInputNumber } from 'element-plus';
export { ElSelect as VSelect } from 'element-plus';
export { ElOption as VOption } from 'element-plus';
export { ElCheckbox as VCheckbox } from 'element-plus';
export { ElCheckboxGroup as VCheckboxGroup } from 'element-plus';
export { ElRadio as VRadio } from 'element-plus';
export { ElRadioGroup as VRadioGroup } from 'element-plus';
export { ElSwitch as VSwitch } from 'element-plus';
export { ElDatePicker as VDatePicker } from 'element-plus';
export { ElTimePicker as VTimePicker } from 'element-plus';
export { ElUpload as VUpload } from 'element-plus';
export { ElForm as VForm } from 'element-plus';
export { ElFormItem as VFormItem } from 'element-plus';
export { ElCascader as VCascader } from 'element-plus';
export { ElColorPicker as VColorPicker } from 'element-plus';
export { ElRate as VRate } from 'element-plus';
export { ElSlider as VSlider } from 'element-plus';
export { ElTransfer as VTransfer } from 'element-plus';

// --- Data Display ---
export { ElTable as VTable } from 'element-plus';
export { ElTableColumn as VTableColumn } from 'element-plus';
export { ElTag as VTag } from 'element-plus';
export { ElTree as VTree } from 'element-plus';
export { ElPagination as VPagination } from 'element-plus';
export { ElBadge as VBadge } from 'element-plus';
export { ElAvatar as VAvatar } from 'element-plus';
export { ElCard as VCard } from 'element-plus';
export { ElCarousel as VCarousel } from 'element-plus';
export { ElCarouselItem as VCarouselItem } from 'element-plus';
export { ElCollapse as VCollapse } from 'element-plus';
export { ElCollapseItem as VCollapseItem } from 'element-plus';
export { ElDescriptions as VDescriptions } from 'element-plus';
export { ElDescriptionsItem as VDescriptionsItem } from 'element-plus';
export { ElEmpty as VEmpty } from 'element-plus';
export { ElImage as VImage } from 'element-plus';
export { ElProgress as VProgress } from 'element-plus';
export { ElResult as VResult } from 'element-plus';
export { ElSkeleton as VSkeleton } from 'element-plus';
export { ElTimeline as VTimeline } from 'element-plus';
export { ElTimelineItem as VTimelineItem } from 'element-plus';

// --- Feedback ---
export { ElDialog as VDialog } from 'element-plus';
export { ElDrawer as VDrawer } from 'element-plus';
export { ElMessage as VMessage } from 'element-plus';
export { ElMessageBox as VMessageBox } from 'element-plus';
export { ElNotification as VNotification } from 'element-plus';
export { ElPopconfirm as VPopconfirm } from 'element-plus';
export { ElPopover as VPopover } from 'element-plus';
export { ElTooltip as VTooltip } from 'element-plus';
export { ElAlert as VAlert } from 'element-plus';
export { ElLoading as VLoading } from 'element-plus';

// --- Navigation ---
export { ElMenu as VMenu } from 'element-plus';
export { ElMenuItem as VMenuItem } from 'element-plus';
export { ElSubMenu as VSubMenu } from 'element-plus';
export { ElTabs as VTabs } from 'element-plus';
export { ElTabPane as VTabPane } from 'element-plus';
export { ElBreadcrumb as VBreadcrumb } from 'element-plus';
export { ElBreadcrumbItem as VBreadcrumbItem } from 'element-plus';
export { ElDropdown as VDropdown } from 'element-plus';
export { ElDropdownMenu as VDropdownMenu } from 'element-plus';
export { ElDropdownItem as VDropdownItem } from 'element-plus';
export { ElSteps as VSteps } from 'element-plus';
export { ElStep as VStep } from 'element-plus';

// --- Layout ---
export { ElContainer as VContainer } from 'element-plus';
export { ElHeader as VHeader } from 'element-plus';
export { ElAside as VAside } from 'element-plus';
export { ElMain as VMain } from 'element-plus';
export { ElFooter as VFooter } from 'element-plus';
export { ElRow as VRow } from 'element-plus';
export { ElCol as VCol } from 'element-plus';
export { ElSpace as VSpace } from 'element-plus';
export { ElDivider as VDivider } from 'element-plus';

// ============================================================
// Custom components & types
// ============================================================

export { EFileType, FileTypeSuffixes, VFileList, VFileModal };

export type { IFileSelectItem, VFileProps } from './fileManager/types';

const components: Record<string, Component> = {
  VFileList,
  VFileModal,
  VButton: ElButton,
  VIcon: ElIcon,
  VLink: ElLink,
  VText: ElText,
  VInput: ElInput,
  VInputNumber: ElInputNumber,
  VSelect: ElSelect,
  VOption: ElOption,
  VCheckbox: ElCheckbox,
  VCheckboxGroup: ElCheckboxGroup,
  VRadio: ElRadio,
  VRadioGroup: ElRadioGroup,
  VSwitch: ElSwitch,
  VDatePicker: ElDatePicker,
  VTimePicker: ElTimePicker,
  VUpload: ElUpload,
  VForm: ElForm,
  VFormItem: ElFormItem,
  VCascader: ElCascader,
  VColorPicker: ElColorPicker,
  VRate: ElRate,
  VSlider: ElSlider,
  VTransfer: ElTransfer,
  VTable: ElTable,
  VTableColumn: ElTableColumn,
  VTag: ElTag,
  VTree: ElTree,
  VPagination: ElPagination,
  VBadge: ElBadge,
  VAvatar: ElAvatar,
  VCard: ElCard,
  VCarousel: ElCarousel,
  VCarouselItem: ElCarouselItem,
  VCollapse: ElCollapse,
  VCollapseItem: ElCollapseItem,
  VDescriptions: ElDescriptions,
  VDescriptionsItem: ElDescriptionsItem,
  VEmpty: ElEmpty,
  VImage: ElImage,
  VProgress: ElProgress,
  VResult: ElResult,
  VSkeleton: ElSkeleton,
  VTimeline: ElTimeline,
  VTimelineItem: ElTimelineItem,
  VDialog: ElDialog,
  VDrawer: ElDrawer,
  VPopconfirm: ElPopconfirm,
  VPopover: ElPopover,
  VTooltip: ElTooltip,
  VAlert: ElAlert,
  VMenu: ElMenu,
  VMenuItem: ElMenuItem,
  VSubMenu: ElSubMenu,
  VTabs: ElTabs,
  VTabPane: ElTabPane,
  VBreadcrumb: ElBreadcrumb,
  VBreadcrumbItem: ElBreadcrumbItem,
  VDropdown: ElDropdown,
  VDropdownMenu: ElDropdownMenu,
  VDropdownItem: ElDropdownItem,
  VSteps: ElSteps,
  VStep: ElStep,
  VContainer: ElContainer,
  VHeader: ElHeader,
  VAside: ElAside,
  VMain: ElMain,
  VFooter: ElFooter,
  VRow: ElRow,
  VCol: ElCol,
  VSpace: ElSpace,
  VDivider: ElDivider,
};

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
};
