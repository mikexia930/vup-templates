<script setup lang="ts">
import { VMessageBox, VButton } from '@vup/ui';

const handleClick = () => {
  VMessageBox.confirm('This is a confirm message', 'Confirm', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
  });
};
</script>

<template>
  <div>
    <VButton @click="handleClick">Open</VButton>
  </div>
</template>
