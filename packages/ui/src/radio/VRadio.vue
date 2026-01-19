<script setup lang="ts">
import { ElRadio } from 'element-plus';
</script>

<template>
  <ElRadio v-bind="$attrs">
    <slot />
  </ElRadio>
</template>

<style scoped></style>
