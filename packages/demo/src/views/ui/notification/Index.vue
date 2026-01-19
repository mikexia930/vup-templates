<script setup lang="ts">
import { VNotification, VButton } from '@vup/ui';

const handleClick = () => {
  VNotification.success('This is a success notification');
};
</script>

<template>
  <div>
    <VButton @click="handleClick">Open</VButton>
  </div>
</template>

<style scoped></style>
