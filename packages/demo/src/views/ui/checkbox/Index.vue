<script setup lang="ts">
import { ref } from 'vue';
import { VCheckboxGroup } from '@vup/ui';
import type { VCheckboxGroupProps } from '@vup/ui';

const options: VCheckboxGroupProps['options'] = [
  {
    label: 'Option 1',
    value: '1',
  },
  {
    label: 'Option 2',
    value: '2',
  },
];

const value = ref<string[]>(['1']);
</script>

<template>
  <div class="flex flex-col gap-6">
    <VCheckboxGroup is-button :options="options" v-model="value" />
    <VCheckboxGroup :options="options" v-model="value" />
  </div>
</template>

<style scoped></style>
