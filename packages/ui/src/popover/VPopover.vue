<script setup lang="ts">
import { ElPopover } from 'element-plus';
</script>

<template>
  <ElPopover v-bind="$attrs">
    <slot />
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </ElPopover>
</template>

<style scoped></style>
