<script setup lang="ts">
import { ElText } from 'element-plus';
</script>

<template>
  <ElText v-bind="$attrs">
    <slot />
  </ElText>
</template>

<style scoped></style>
