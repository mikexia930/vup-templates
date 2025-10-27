<script setup lang="ts" name="App">
const { locale } = useI18n();
// 语言切换
const currentLocale = computed(() => locale.value);
const switchLanguage = (lang: string) => {
  locale.value = lang;
};

provide('currentLocale', currentLocale);
provide('switchLanguage', switchLanguage);
</script>

<template>
  <div class="app">
    <router-view />
  </div>
</template>
