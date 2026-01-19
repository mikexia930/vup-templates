<script setup lang="ts">
import { ref } from 'vue';
import { VInput } from '@vup/ui';

const inputValue = ref('');
</script>

<template>
  <div style="width: 300px">
    <VInput v-model="inputValue" placeholder="Please input" />
  </div>
</template>
