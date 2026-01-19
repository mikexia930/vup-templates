<script setup lang="ts">
import { ElTooltip } from 'element-plus';
</script>

<template>
  <ElTooltip v-bind="$attrs">
    <slot />
  </ElTooltip>
</template>

<style scoped></style>
