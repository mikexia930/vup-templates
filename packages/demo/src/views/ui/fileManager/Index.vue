<script setup lang="ts">
import { VFileModal, EFileType, VFileTypeSuffixes, VButton } from '@vup/ui';
import type { VFileProps, IFileSelectItem } from '@vup/ui';
import { ref } from 'vue';

const fileProps: VFileProps = {
  type: EFileType.IMAGE,
  suffixes: VFileTypeSuffixes[EFileType.IMAGE],
  limit: 1,
  selected: [],
  list: [],
  pagination: {
    total: 0,
    size: 10,
    page: 1,
  },
};

const fileModalRef = ref<InstanceType<typeof VFileModal>>();
const handleOpenFileModal = () => {
  fileModalRef.value?.open();
};

const handleSelected = (selected: IFileSelectItem[]) => {
  console.log(selected);
};
</script>

<template>
  <div>
    <VButton @click="handleOpenFileModal">Open</VButton>
  </div>
  <VFileModal ref="fileModalRef" v-bind="fileProps" @selected="handleSelected" />
</template>
