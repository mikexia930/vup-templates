<script setup lang="ts">
import { ElBadge } from 'element-plus';
</script>

<template>
  <ElBadge v-bind="$attrs">
    <slot />
  </ElBadge>
</template>

<style scoped></style>
