<script setup lang="ts">
import { ElTag } from 'element-plus';
</script>

<template>
  <ElTag v-bind="$attrs">
    <slot />
  </ElTag>
</template>

<style scoped></style>
