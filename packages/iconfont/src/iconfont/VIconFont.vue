<script setup lang="ts">
import type { VIconFontProps } from './types';
import { computed } from 'vue';

import '../assets/iconfont.css';

defineOptions({
  name: 'VIconFont',
});

const props = withDefaults(defineProps<VIconFontProps>(), {
  size: '16px',
  color: 'inherit',
});

// 计算样式
const iconStyle = computed(() => {
  return {
    fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
    color: props.color,
  };
});

// 计算类名
// iconfont.css 中的类名格式是：.icon-{name}
const iconClass = computed(() => {
  return ['iconfont', `icon-${props.icon}`, props.customClass].filter(Boolean);
});
</script>

<template>
  <i :class="iconClass" :style="iconStyle" />
</template>

<style scoped>
.v-icon-font {
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
  vertical-align: middle;
  /* 防止图标闪烁 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
