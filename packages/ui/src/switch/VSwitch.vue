<script setup lang="ts">
import { ElSwitch } from 'element-plus';
</script>

<template>
  <ElSwitch v-bind="$attrs">
    <slot />
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </ElSwitch>
</template>

<style scoped></style>
