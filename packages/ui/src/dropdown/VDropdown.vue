<script setup lang="ts">
import { ElDropdown } from 'element-plus';
</script>

<template>
  <ElDropdown v-bind="$attrs">
    <slot />
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </ElDropdown>
</template>

<style scoped></style>
