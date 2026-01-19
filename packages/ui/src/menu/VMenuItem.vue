<script setup lang="ts">
import { ElMenuItem } from 'element-plus';
import type { VMenuItemProps } from './types';
import VMenuItemContent from './VMenuItemContent.vue';

const props = defineProps<{
  item: VMenuItemProps;
}>();
</script>

<template>
  <ElMenuItem :index="item.key" :title="item.label">
    <template #title>
      <slot :name="item.key" :item="item">
        <VMenuItemContent :icon="item.icon" :label="item.label" />
      </slot>
    </template>
  </ElMenuItem>
</template>

<style scoped></style>
