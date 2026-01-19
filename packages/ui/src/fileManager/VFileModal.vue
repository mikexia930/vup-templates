<script setup lang="ts">
import { ref } from 'vue';
import VModal from '../modal/VModal.vue';
import VButton from '../button/VButton.vue';
import VFileList from './VFileList.vue';
import type { VFileProps } from './types';

defineOptions({ inheritAttrs: false });
const props = defineProps<VFileProps>();

const emit = defineEmits(['selected']);

const visible = ref(false);

const handleCancel = () => {
  visible.value = false;
};

const fileListRef = ref();
const handleSelected = () => {
  emit('selected', fileListRef.value?.selected() || []);
  visible.value = false;
  fileListRef.value = null;
};

defineExpose({
  open: () => {
    visible.value = true;
  },
  close: () => {
    visible.value = false;
  },
});
</script>

<template>
  <VModal v-model="visible" title="文件管理" :width="800" destroy-on-close>
    <div style="height: 680px">
      <VFileList ref="fileListRef" v-bind="props" v-on="$attrs" />
    </div>
    <template #footer>
      <VButton @click="handleCancel">取消</VButton>
      <VButton type="primary" @click="handleSelected">确定</VButton>
    </template>
  </VModal>
</template>
