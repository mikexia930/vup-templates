<script setup lang="ts">
import { ElCard } from 'element-plus';
</script>

<template>
  <ElCard v-bind="$attrs">
    <slot />
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </ElCard>
</template>

<style scoped></style>
