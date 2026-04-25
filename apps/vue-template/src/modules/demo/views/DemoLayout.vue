<script setup lang="ts">
import DemoFeatures from '../components/DemoFeatures.vue';
import DemoFooter from '../components/DemoFooter.vue';
import DemoHero from '../components/DemoHero.vue';
import DemoNav from '../components/DemoNav.vue';
import DemoQuickStart from '../components/DemoQuickStart.vue';
import DemoRuntime from '../components/DemoRuntime.vue';
import DemoStructure from '../components/DemoStructure.vue';
import DemoToast from '../components/DemoToast.vue';
import { useDemoRuntimeStore } from '../stores/useDemoRuntimeStore';

const { locale } = useI18n();
const demoRuntimeStore = useDemoRuntimeStore();

onMounted(() => {
  locale.value = demoRuntimeStore.demoLanguage;
});
</script>

<template>
  <div class="bg-neutral-1 text-neutral-9 min-h-screen font-sans">
    <DemoNav />
    <main id="top">
      <DemoHero @copy-command="demoRuntimeStore.copyText" />
      <DemoQuickStart
        :copied-text="demoRuntimeStore.copiedText"
        @copy-command="demoRuntimeStore.copyText"
      />
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

    <DemoFooter />
    <DemoToast :show="Boolean(demoRuntimeStore.copiedText)" />
  </div>
</template>
