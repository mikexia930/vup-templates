<script setup lang="ts">
import { VButton } from '@vup/ui';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="flex items-center justify-center h-screen p-4 gap-6">
    <VButton @click="router.push('/iconfont')">IconFont Demo</VButton>
    <VButton @click="router.push('/ui')">UI Demo</VButton>
  </div>
</template>

<style lang="scss" scoped></style>
