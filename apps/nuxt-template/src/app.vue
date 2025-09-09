<template>
  <div>
    <img src="@shared/assets/images/logo.svg" alt="Logo" class="w-10 h-10" />
    <div class="base-style">1</div>
    <div class="info">23</div>
  </div>
  <NuxtPage />
</template>

<script setup lang="ts">
console.log('App');
</script>

<style scoped lang="scss">
.info {
  @apply text-green-500;
}
</style>
