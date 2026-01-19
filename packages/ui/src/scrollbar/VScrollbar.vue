<script setup lang="ts">
import { ElScrollbar } from 'element-plus';
</script>

<template>
  <ElScrollbar v-bind="$attrs">
    <slot />
  </ElScrollbar>
</template>
