<script setup lang="ts">
import { ElInputNumber } from 'element-plus';
</script>

<template>
  <ElInputNumber v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </ElInputNumber>
</template>

<style scoped></style>
