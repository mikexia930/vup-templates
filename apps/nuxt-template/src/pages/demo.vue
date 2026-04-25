<script setup lang="ts">
import { useDemoRuntimeStore } from '~/stores/demo';

const demoRuntimeStore = useDemoRuntimeStore();
const { locale } = useI18n();

useHead({
  title: 'Nuxt Template Demo',
});

onMounted(() => {
  if (locale.value === 'en-US' || locale.value === 'zh-CN') {
    demoRuntimeStore.setLanguage(locale.value);
  }
});
</script>

<template>
  <main id="top" class="bg-neutral-1 text-neutral-9 min-h-screen">
    <DemoNav />
    <DemoHero />
    <DemoQuickStart />
    <DemoFeatures />
    <DemoStructure />
    <DemoRuntime
      :active-tab="demoRuntimeStore.activeTab"
      :counter="demoRuntimeStore.counter"
      :counter-history="demoRuntimeStore.counterHistory"
      :demo-language="demoRuntimeStore.demoLanguage"
      :is-requesting="demoRuntimeStore.isRequesting"
      :task-response="demoRuntimeStore.taskResponse"
      @load-tasks="demoRuntimeStore.loadTasks"
      @reset-counter="demoRuntimeStore.resetCounter"
      @set-active-tab="demoRuntimeStore.setActiveTab"
      @set-language="demoRuntimeStore.setLanguage"
      @update-counter="demoRuntimeStore.updateCounter"
    />
  </main>
</template>
