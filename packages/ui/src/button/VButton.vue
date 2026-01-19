<script setup lang="ts">
import { ElButton } from 'element-plus';
</script>

<template>
  <ElButton v-bind="$attrs">
    <slot />
  </ElButton>
</template>

<style scoped></style>
