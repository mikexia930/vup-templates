<script setup lang="ts">
import { VButton } from '@vup/ui';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen p-4">
    <VButton @click="router.push('/ui')">UI Demo</VButton>
  </div>
</template>

<style lang="scss" scoped></style>
