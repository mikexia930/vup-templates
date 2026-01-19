<script setup lang="ts">
import { ElRadioGroup, ElRadio, ElRadioButton } from 'element-plus';
import type { VRadioGroupProps } from './types';

const props = defineProps<VRadioGroupProps>();
</script>

<template>
  <ElRadioGroup v-bind="$attrs">
    <template v-for="option in options" :key="option.value">
      <ElRadio v-if="!isButton" :label="option.value" :value="option.value">
        <slot :name="option.value" :option="option">
          <span>{{ option.label }}</span>
        </slot>
      </ElRadio>
      <ElRadioButton v-else :label="option.value" :value="option.value">
        <slot :name="option.value" :option="option">
          <span>{{ option.label }}</span>
        </slot>
      </ElRadioButton>
    </template>
    <slot />
  </ElRadioGroup>
</template>

<style scoped></style>
