<script setup lang="ts">
import { ElCheckboxGroup, ElCheckbox, ElCheckboxButton } from 'element-plus';
import type { VCheckboxGroupProps } from './types';

const props = defineProps<VCheckboxGroupProps>();
</script>

<template>
  <ElCheckboxGroup v-bind="$attrs">
    <template v-for="option in options" :key="option.value">
      <ElCheckbox v-if="!isButton" :label="option.value" :value="option.value">
        <slot :name="option.value" :option="option">
          <span>{{ option.label }}</span>
        </slot>
      </ElCheckbox>
      <ElCheckboxButton v-else :label="option.value" :value="option.value">
        <slot :name="option.value" :option="option">
          <span>{{ option.label }}</span>
        </slot>
      </ElCheckboxButton>
    </template>
    <slot />
  </ElCheckboxGroup>
</template>

<style scoped></style>
