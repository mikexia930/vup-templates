<script setup lang="ts">
import { ElLink } from 'element-plus';
</script>

<template>
  <ElLink v-bind="$attrs">
    <slot />
  </ElLink>
</template>

<style scoped></style>
