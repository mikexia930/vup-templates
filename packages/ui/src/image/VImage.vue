<script setup lang="ts">
import { ElImage } from 'element-plus';
</script>

<template>
  <ElImage v-bind="$attrs">
    <slot />
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </ElImage>
</template>

<style scoped></style>
