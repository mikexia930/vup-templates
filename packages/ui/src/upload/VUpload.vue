<script setup lang="ts">
import { ElUpload } from 'element-plus';
</script>

<template>
  <ElUpload v-bind="$attrs">
    <slot />
    <!-- 透传所有具名插槽 -->
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </ElUpload>
</template>
