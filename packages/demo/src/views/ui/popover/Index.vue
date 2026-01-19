<script setup lang="ts">
import { VPopover, VButton } from '@vup/ui';
</script>

<template>
  <VPopover placement="bottom" content="This is a popover">
    <template #reference>
      <VButton>Hover me</VButton>
    </template>
  </VPopover>
</template>

<style scoped></style>
