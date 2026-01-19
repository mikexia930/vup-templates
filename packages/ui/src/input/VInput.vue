<script setup lang="ts">
import { ElInput } from 'element-plus';
</script>

<template>
  <ElInput v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </ElInput>
</template>

<style scoped></style>
