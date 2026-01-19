<script setup lang="ts">
import { ElSelect, ElOption, ElOptionGroup } from 'element-plus';
import type { VSelectProps } from './types';

const props = defineProps<VSelectProps>();
</script>

<template>
  <ElSelect v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
    <template v-for="item in props.options" :key="item.value">
      <ElOptionGroup v-if="item.children" :key="item.value" :label="item.label">
        <template v-for="child in item.children" :key="child.value">
          <ElOption :label="child.label" :value="child.value" :disabled="child.disabled">
            <slot :name="child.value" :item="child">
              <span>{{ child.label }}</span>
            </slot>
          </ElOption>
        </template>
      </ElOptionGroup>
      <ElOption v-else :label="item.label" :value="item.value" :disabled="item.disabled">
        <slot :name="item.value" :item="item">
          <span>{{ item.label }}</span>
        </slot>
      </ElOption>
    </template>
  </ElSelect>
</template>

<style scoped></style>
