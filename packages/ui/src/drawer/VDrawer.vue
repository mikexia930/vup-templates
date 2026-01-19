<script setup lang="ts">
import { ElDrawer } from 'element-plus';
</script>

<template>
  <ElDrawer v-bind="$attrs">
    <slot />
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </ElDrawer>
</template>
