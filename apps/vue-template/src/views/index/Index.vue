<template>
  <div>{{ t('hello') }}</div>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

console.log('Index');
</script>
