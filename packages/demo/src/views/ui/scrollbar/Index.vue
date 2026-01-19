<script setup lang="ts">
import { VScrollbar } from '@vup/ui';
</script>

<template>
  <div class="w-200">
    <VScrollbar height="300px">
      <div class="flex flex-col gap-4">
        <p v-for="item in 20" :key="item" class="bg-success-3 text-white p-4">{{ item }}</p>
      </div>
    </VScrollbar>
  </div>
</template>
