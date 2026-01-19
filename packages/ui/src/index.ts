import 'element-plus/dist/index.css';
import '../../../_shared/assets/styles/theme.scss';

import './theme.scss';

import VModal from './modal/VModal.vue';
import VIconFont from './iconfont/VIconFont.vue';
import VButton from './button/VButton.vue';
import VMenu from './menu/VMenu.vue';
import VMessage from './message/VMessage';
import VMessageBox from './messageBox/VMessageBox';
import VDrawer from './drawer/VDrawer.vue';
import VInput from './input/VInput.vue';
import VText from './text/VText.vue';
import VScrollbar from './scrollbar/VScrollbar.vue';
import VSelect from './select/VSelect.vue';
import VRadioGroup from './radio/VRadioGroup.vue';
import VRadio from './radio/VRadio.vue';
import VCheckboxGroup from './checkbox/VCheckboxGroup.vue';
import VCheckbox from './checkbox/VCheckbox.vue';
import VPopover from './popover/VPopover.vue';
import VTooltip from './tooltip/VTooltip.vue';
import VNotification from './notification/VNotification';
import VLoading from './loading/VLoading';
import VPopconfirm from './popconfirm/VPopconfirm.vue';
import VPagination from './pagination/VPagination.vue';
import VTag from './tag/VTag.vue';
import VEmpty from './empty/VEmpty.vue';
import VCard from './card/VCard.vue';
import VBadge from './badge/VBadge.vue';
import VImage from './image/VImage.vue';
import VSwitch from './switch/VSwitch.vue';
import VUpload from './upload/VUpload.vue';
import VInputNumber from './inputNumber/VInputNumber.vue';
import VDatePicker from './datepicker/VDatePicker.vue';
import VLink from './link/VLink.vue';
import VDropdown from './dropdown/VDropdown.vue';
import VFileModal from './fileManager/VFileModal.vue';
import VFileList from './fileManager/VFileList.vue';
import { EFileType, VFileTypeSuffixes } from './fileManager/types';

export {
  EFileType,
  VBadge,
  VButton,
  VCard,
  VCheckbox,
  VCheckboxGroup,
  VDatePicker,
  VDrawer,
  VDropdown,
  VEmpty,
  VFileList,
  VFileModal,
  VFileTypeSuffixes,
  VIconFont,
  VImage,
  VInput,
  VInputNumber,
  VLink,
  VLoading,
  VMenu,
  VMessage,
  VMessageBox,
  VModal,
  VNotification,
  VPagination,
  VPopconfirm,
  VPopover,
  VRadio,
  VRadioGroup,
  VScrollbar,
  VSelect,
  VSwitch,
  VTag,
  VText,
  VTooltip,
  VUpload,
};

export type { VIconFontProps } from './iconfont/types';
export type { VMenuProps } from './menu/types';
export type { VSelectProps } from './select/types';
export type { VRadioGroupProps } from './radio/types';
export type { VCheckboxGroupProps } from './checkbox/types';
export type { IFileSelectItem, VFileProps } from './fileManager/types';
