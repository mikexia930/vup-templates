<script setup lang="ts">
import { ElEmpty } from 'element-plus';
</script>

<template>
  <ElEmpty v-bind="$attrs">
    <slot />
  </ElEmpty>
</template>

<style scoped></style>
