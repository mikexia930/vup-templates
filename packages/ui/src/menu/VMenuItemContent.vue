<script setup lang="ts">
import VIcon from '../icon/VIcon.vue';

defineProps<{
  icon?: string | undefined;
  label: string;
}>();
</script>

<template>
  <div>
    <template v-if="icon">
      <VIcon :icon="icon" />
    </template>
    <span>{{ label }}</span>
  </div>
</template>

<style scoped></style>
