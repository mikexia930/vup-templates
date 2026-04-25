<script setup lang="ts">
import DemoFeatures from '../components/DemoFeatures.vue';
import DemoHero from '../components/DemoHero.vue';
import DemoQuickStart from '../components/DemoQuickStart.vue';
import DemoRuntime from '../components/DemoRuntime.vue';
import DemoStructure from '../components/DemoStructure.vue';
import { useDemoRuntimeStore } from '../stores/useDemoRuntimeStore';

const { locale, t } = useI18n();
const demoRuntimeStore = useDemoRuntimeStore();
const isDrawerOpen = ref(false);

const navigationItems = [
  { id: 'hero', labelKey: 'overview' },
  { id: 'quickstart', labelKey: 'quickstart' },
  { id: 'features', labelKey: 'features' },
  { id: 'structure', labelKey: 'structure' },
  { id: 'runtime', labelKey: 'runtime' },
] as const;

onMounted(() => {
  locale.value = demoRuntimeStore.demoLanguage;
});

function closeDrawer() {
  isDrawerOpen.value = false;
}
</script>

<template>
  <main
    class="bg-neutral-1 text-neutral-9 h-[100dvh] min-h-screen overflow-x-hidden overflow-y-auto [-webkit-overflow-scrolling:touch]"
  >
    <header
      class="border-neutral-3 bg-neutral-1/95 sticky top-0 z-10 border-b backdrop-blur-md backdrop-saturate-150"
    >
      <div
        class="mx-auto flex min-h-[72px] w-[min(100%,1200px)] items-center gap-[20px] px-[max(24px,env(safe-area-inset-left,0px))] pt-[env(safe-area-inset-top,0px)] max-[840px]:min-h-[64px] max-[840px]:px-[max(16px,env(safe-area-inset-left,0px))] max-[520px]:gap-[12px]"
      >
        <div class="mr-auto flex min-w-0 items-center">
          <strong
            class="leading-xs text-neutral-9 flex items-center gap-[12px] text-[20px] font-extrabold whitespace-nowrap max-[520px]:text-[18px]"
          >
            <span
              class="from-primary-5 to-primary-4 grid size-[40px] place-items-center rounded-xl bg-linear-to-br text-[18px] font-extrabold text-white max-[840px]:size-[36px] max-[840px]:text-[17px]"
            >
              C
            </span>
            {{ t('demo.layout.title') }}
          </strong>
        </div>
        <nav
          class="ml-auto flex items-center gap-[4px] max-[840px]:hidden"
          aria-label="Demo navigation"
        >
          <a
            v-for="item in navigationItems"
            :key="item.id"
            class="text-neutral-6 hover:bg-primary-0 hover:text-primary-6 rounded-lg px-[12px] py-[9px] text-sm font-semibold no-underline"
            :href="`#${item.id}`"
          >
            {{ t(`demo.layout.nav.${item.labelKey}`) }}
          </a>
        </nav>
        <span
          class="bg-primary-0 text-primary-6 rounded-full px-[12px] py-[7px] text-sm font-bold whitespace-nowrap max-[840px]:py-[6px] max-[840px]:text-[13px] max-[520px]:hidden"
        >
          v2.0.0
        </span>
        <button
          class="border-neutral-3 hidden size-[44px] shrink-0 cursor-pointer place-items-center rounded-xl border bg-white p-[10px] shadow-sm max-[840px]:grid"
          type="button"
          :aria-expanded="isDrawerOpen"
          :aria-label="t('demo.layout.menu')"
          @click="isDrawerOpen = true"
        >
          <span class="bg-neutral-9 block h-[2px] w-[22px] rounded-full"></span>
          <span class="bg-neutral-9 block h-[2px] w-[22px] rounded-full"></span>
          <span class="bg-neutral-9 block h-[2px] w-[22px] rounded-full"></span>
        </button>
      </div>
    </header>

    <div class="bg-neutral-1 grid w-full">
      <DemoHero id="hero" />
      <DemoQuickStart id="quickstart" />
      <DemoFeatures id="features" />
      <DemoStructure id="structure" />
      <DemoRuntime
        id="runtime"
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
    </div>

    <div
      class="bg-neutral-9/40 fixed inset-0 z-40 transition-opacity duration-200"
      :class="isDrawerOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'"
      @click="closeDrawer"
    ></div>
    <aside
      class="fixed top-0 right-0 z-40 h-screen w-[min(82vw,320px)] bg-white px-[18px] pt-[calc(env(safe-area-inset-top,0px)+16px)] pb-[calc(env(safe-area-inset-bottom,0px)+18px)] transition duration-200"
      :class="
        isDrawerOpen
          ? 'translate-x-0 shadow-[-18px_0_40px_rgba(15,23,42,0.18)]'
          : 'pointer-events-none invisible translate-x-[calc(100%+48px)]'
      "
      aria-label="Demo navigation"
    >
      <div class="border-neutral-3 flex items-center justify-between gap-[12px] border-b pb-[14px]">
        <strong>{{ t('demo.layout.title') }}</strong>
        <button
          class="bg-neutral-2 text-neutral-6 size-[36px] cursor-pointer rounded-lg border-0 text-[24px] leading-none"
          type="button"
          :aria-label="t('demo.layout.closeMenu')"
          @click="closeDrawer"
        >
          ×
        </button>
      </div>
      <nav class="grid pt-[12px]">
        <a
          v-for="item in navigationItems"
          :key="item.id"
          class="border-neutral-3 text-neutral-9 border-b px-[2px] py-[15px] text-[16px] font-bold no-underline"
          :href="`#${item.id}`"
          @click="closeDrawer"
        >
          {{ t(`demo.layout.nav.${item.labelKey}`) }}
        </a>
      </nav>
    </aside>
  </main>
</template>
