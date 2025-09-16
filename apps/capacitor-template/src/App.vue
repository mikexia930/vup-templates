<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup lang="ts" name="App">
console.log('App');
</script>

<style lang="scss" scoped>
.app {
  @apply text-red-500;
}
</style>
