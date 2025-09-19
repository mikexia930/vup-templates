<template>
  <div>
    <img src="@_shared/assets/images/logo.svg" alt="Logo" class="w-10 h-10" />
    <div class="font-bold text-red-500">测试</div>
    <div class="info">23</div>
  </div>
  <NuxtPage />
</template>

<script setup lang="ts">
console.log('App');
</script>

<style scoped lang="scss">
.info {
  @apply text-red-500 font-bold;
}
</style>
