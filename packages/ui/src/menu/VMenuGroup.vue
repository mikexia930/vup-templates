<script setup lang="ts">
import { ElMenuItemGroup } from 'element-plus';
import VMenuItem from './VMenuItem.vue';
import type { VMenuGroupProps } from './types';

const props = defineProps<{
  group: VMenuGroupProps;
}>();
</script>

<template>
  <ElMenuItemGroup>
    <template #title>
      <span>{{ group.label }}</span>
    </template>
    <template v-for="item in group.items" :key="item.key">
      <VMenuItem :item="item" />
    </template>
  </ElMenuItemGroup>
</template>

<style scoped></style>
