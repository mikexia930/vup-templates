<script setup lang="ts">
import { ElIcon } from 'element-plus';
import { Search, Edit, Delete, Plus, VideoPlay, Document } from '@element-plus/icons-vue';
import { computed } from 'vue';

const props = defineProps<{
  icon: string;
}>();

const iconComponent = computed(() => {
  return {
    Search,
    Edit,
    Delete,
    Plus,
    VideoPlay,
    Document,
  }[props.icon];
});
</script>
<template>
  <ElIcon v-bind="$attrs">
    <component :is="iconComponent" />
  </ElIcon>
</template>
