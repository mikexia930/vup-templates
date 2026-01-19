<script setup lang="ts">
import { VSelect } from '@vup/ui';
import type { VSelectProps } from '@vup/ui';

const options: VSelectProps['options'] = [
  {
    label: 'Option Group 1',
    value: '1',
    children: [
      {
        label: 'Option 1-1',
        value: '1-1',
      },
    ],
  },
  {
    label: 'Option Group 2',
    value: '2',
    children: [
      {
        label: 'Option 2-1',
        value: '2-1',
      },
    ],
  },
  {
    label: 'Option 3',
    value: '3',
  },
  {
    label: 'Option 4',
    value: '4',
  },
];

const value = ref('');
</script>

<template>
  <div class="w-200">
    <VSelect :options="options" v-model="value" filterable clearable placeholder="Select">
      <template #header>
        <span>Header</span>
      </template>
      <template #footer>
        <span>Footer</span>
      </template>
      <template #1-1>
        <div class="flex items-center justify-between gap-2">
          <span>Custom 1-1 left </span>
          <span>Custom 1-1 right</span>
        </div>
      </template>
    </VSelect>
  </div>
</template>

<style scoped></style>
