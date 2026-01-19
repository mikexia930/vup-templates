<script setup lang="ts">
import { ElCheckbox } from 'element-plus';
</script>

<template>
  <ElCheckbox v-bind="$attrs">
    <slot />
  </ElCheckbox>
</template>

<style scoped></style>
