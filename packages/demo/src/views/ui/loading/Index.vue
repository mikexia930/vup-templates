<script setup lang="ts">
import { VLoading, VButton } from '@vup/ui';

let loadingInstance: any = null;

const handleOpen = () => {
  loadingInstance = VLoading.service({
    target: document.getElementById('loading-demo'),
    lock: true,
    text: 'Loading...',
  });
};

const handleClose = () => {
  loadingInstance.close();
};
</script>

<template>
  <div id="loading-demo" class="bg-gray-100" style="width: 200px; height: 200px"></div>
  <VButton @click="handleOpen">Open</VButton>
  <VButton @click="handleClose">Close</VButton>
</template>

<style scoped></style>
