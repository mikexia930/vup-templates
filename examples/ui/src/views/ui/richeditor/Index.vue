<script setup lang="ts">
import { RichEditor } from '@vup/richeditor';

const modelValue = ref('');
</script>

<template>
  <div>
    <RichEditor v-model="modelValue" />
  </div>
</template>
