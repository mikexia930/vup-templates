<template>
  <div class="title font-bold">1-{{ t('hello') }}</div>
  <div></div>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

console.log('Index');
</script>

<style lang="scss" scoped>
.title {
  @apply text-green-500 text-2xl;
}
</style>
