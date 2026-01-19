<script setup lang="ts">
import { ElPopconfirm } from 'element-plus';
</script>

<template>
  <ElPopconfirm v-bind="$attrs">
    <slot />
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </ElPopconfirm>
</template>

<style scoped></style>
