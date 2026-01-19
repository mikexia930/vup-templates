<script setup lang="ts">
import { ref } from 'vue';
import { VRadioGroup } from '@vup/ui';
import type { VRadioGroupProps } from '@vup/ui';

const options: VRadioGroupProps['options'] = [
  {
    label: 'Option 1',
    value: '1',
  },
  {
    label: 'Option 2',
    value: '2',
  },
];

const value = ref('1');
</script>

<template>
  <div class="flex flex-col gap-6">
    <VRadioGroup is-button :options="options" v-model="value" />
    <VRadioGroup :options="options" v-model="value" />
  </div>
</template>

<style scoped></style>
