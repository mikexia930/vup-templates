<script setup lang="ts">
import { ElDialog } from 'element-plus';
</script>

<template>
  <ElDialog v-bind="$attrs">
    <slot />
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </ElDialog>
</template>
