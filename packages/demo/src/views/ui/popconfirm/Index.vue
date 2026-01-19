<script setup lang="ts">
import { VPopconfirm, VButton } from '@vup/ui';
</script>

<template>
  <VPopconfirm title="This is a popconfirm">
    <template #reference>
      <VButton>Click me</VButton>
    </template>
  </VPopconfirm>
</template>

<style scoped></style>
