<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="flex h-screen items-center justify-center gap-6 p-4">
    <VButton @click="router.push('/iconfont')">IconFont Demo</VButton>
    <VButton @click="router.push('/ui')">UI Demo</VButton>
  </div>
</template>

<style lang="scss" scoped></style>
