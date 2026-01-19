<script setup lang="ts">
import type { VMenuIconProps } from './types';
import VIconFont from '../iconfont/VIconFont.vue';
import VIcon from '../icon/VIcon.vue';

defineProps<{
  icon?: VMenuIconProps | undefined;
  label: string;
}>();
</script>

<template>
  <div>
    <template v-if="icon">
      <VIconFont v-if="icon.type === 'iconfont'" :icon="icon.name" />
      <VIcon v-if="icon.type === 'icon'" :icon="icon.name" />
    </template>
    <span>{{ label }}</span>
  </div>
</template>

<style scoped></style>
