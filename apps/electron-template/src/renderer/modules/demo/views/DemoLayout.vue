<script setup lang="ts">
import DemoFeatures from '../components/DemoFeatures.vue';
import DemoHero from '../components/DemoHero.vue';
import DemoQuickStart from '../components/DemoQuickStart.vue';
import DemoRuntime from '../components/DemoRuntime.vue';
import DemoStructure from '../components/DemoStructure.vue';
import { useDemoRuntimeStore } from '../stores/useDemoRuntimeStore';

const { locale, t } = useI18n();
const demoRuntimeStore = useDemoRuntimeStore();

const navigationItems = [
  { id: 'hero', labelKey: 'overview' },
  { id: 'quickstart', labelKey: 'quickstart' },
  { id: 'features', labelKey: 'features' },
  { id: 'structure', labelKey: 'structure' },
  { id: 'runtime', labelKey: 'runtime' },
] as const;

onMounted(() => {
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale === 'zh-CN' || savedLocale === 'en-US') {
    demoRuntimeStore.setLanguage(savedLocale);
  }
  locale.value = demoRuntimeStore.demoLanguage;
  void demoRuntimeStore.loadRuntimeInfo();
});

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>

<template>
  <main class="bg-neutral-1 text-neutral-9 min-h-screen">
    <header
      class="border-neutral-3 bg-neutral-1/95 sticky top-0 z-10 border-b backdrop-blur-md backdrop-saturate-150"
    >
      <div
        class="mx-auto flex min-h-[68px] w-full max-w-[1200px] items-center gap-4 px-6 max-[820px]:px-4"
      >
        <strong
          class="text-neutral-8 mr-auto flex items-center gap-3 text-[19px] font-[850] whitespace-nowrap"
        >
          <span
            class="from-primary-5 to-info-5 text-neutral-0 grid size-[38px] place-items-center rounded-lg bg-linear-to-br text-[18px] font-[850]"
          >
            E
          </span>
          {{ t('demo.layout.title') }}
        </strong>
        <nav aria-label="Demo navigation" class="flex items-center gap-1 max-[820px]:hidden">
          <button
            v-for="item in navigationItems"
            :key="item.id"
            type="button"
            class="text-neutral-7 hover:bg-primary-0 hover:text-primary-6 rounded-md px-3 py-2 text-sm font-semibold"
            @click="scrollToSection(item.id)"
          >
            {{ t(`demo.layout.nav.${item.labelKey}`) }}
          </button>
        </nav>
        <span class="bg-primary-0 text-primary-6 rounded-full px-3 py-1 text-xs font-bold"
          >v2.0.0</span
        >
      </div>
    </header>

    <div class="mx-auto w-full max-w-[1200px] px-6 max-[820px]:px-4">
      <DemoHero id="hero" />
      <DemoQuickStart />
      <DemoFeatures />
      <DemoStructure />
      <DemoRuntime
        :active-tab="demoRuntimeStore.activeTab"
        :counter="demoRuntimeStore.counter"
        :counter-history="demoRuntimeStore.counterHistory"
        :demo-language="demoRuntimeStore.demoLanguage"
        :is-loading-runtime="demoRuntimeStore.isLoadingRuntime"
        :runtime-info="demoRuntimeStore.runtimeInfo"
        @load-runtime-info="demoRuntimeStore.loadRuntimeInfo"
        @reset-counter="demoRuntimeStore.resetCounter"
        @set-active-tab="demoRuntimeStore.setActiveTab"
        @set-language="demoRuntimeStore.setLanguage"
        @update-counter="demoRuntimeStore.updateCounter"
      />
    </div>
  </main>
</template>
