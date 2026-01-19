<script setup lang="ts">
import { VModal, VButton } from '@vup/ui';
import { ref } from 'vue';

const dialogVisible = ref(false);

const handleClose = () => {
  dialogVisible.value = false;
};
</script>

<template>
  <div>
    <VButton @click="dialogVisible = true">Open</VButton>
  </div>
  <VModal v-model="dialogVisible" title="Tips" width="500" :before-close="handleClose">
    <div class="p-4">This is a modal content</div>
    <template #footer>
      <div class="dialog-footer">
        <VButton @click="dialogVisible = false">Cancel</VButton>
        <VButton type="primary" @click="dialogVisible = false"> Confirm </VButton>
      </div>
    </template>
  </VModal>
</template>
