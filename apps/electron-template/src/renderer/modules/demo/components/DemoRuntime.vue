<script setup lang="ts">
import DemoSectionTitle from './DemoSectionTitle.vue';
import type { DemoRuntimeResponse } from '../api/types';
import type { DemoLanguage, RuntimeTab } from '../types/demo';

const props = defineProps<{
  activeTab: RuntimeTab;
  counter: number;
  counterHistory: number[];
  demoLanguage: DemoLanguage;
  isLoadingRuntime: boolean;
  runtimeInfo: DemoRuntimeResponse | null;
}>();

const emit = defineEmits<{
  loadRuntimeInfo: [];
  resetCounter: [];
  setActiveTab: [tab: RuntimeTab];
  setLanguage: [language: DemoLanguage];
  updateCounter: [delta: number];
}>();

const { locale, t } = useI18n();

const runtimeRows = computed(() => {
  if (!props.runtimeInfo) return [];
  return [
    ['Electron', props.runtimeInfo.electron],
    ['Chrome', props.runtimeInfo.chrome],
    ['Node', props.runtimeInfo.node],
    ['Platform', props.runtimeInfo.platform],
    ['App', props.runtimeInfo.appVersion],
  ];
});

const historyText = computed(() =>
  props.counterHistory.length ? props.counterHistory.join(', ') : t('demo.runtime.state.empty')
);

function switchLanguage(language: DemoLanguage) {
  locale.value = language;
  emit('setLanguage', language);
}
</script>

<template>
  <section id="runtime" class="grid gap-6 py-16">
    <DemoSectionTitle
      :description="t('demo.runtime.description')"
      :title="t('demo.runtime.title')"
    />

    <article
      class="border-neutral-4 bg-neutral-0 grid grid-cols-[220px_1fr] gap-5 rounded-xl border p-5 max-[780px]:grid-cols-1"
    >
      <div class="grid gap-2">
        <button
          type="button"
          class="min-h-[44px] rounded-lg font-bold"
          :class="
            activeTab === 'bridge' ? 'bg-primary-5 text-neutral-0' : 'bg-neutral-2 text-neutral-7'
          "
          @click="emit('setActiveTab', 'bridge')"
        >
          {{ t('demo.runtime.tabs.bridge') }}
        </button>
        <button
          type="button"
          class="min-h-[44px] rounded-lg font-bold"
          :class="
            activeTab === 'state' ? 'bg-primary-5 text-neutral-0' : 'bg-neutral-2 text-neutral-7'
          "
          @click="emit('setActiveTab', 'state')"
        >
          {{ t('demo.runtime.tabs.state') }}
        </button>
        <button
          type="button"
          class="min-h-[44px] rounded-lg font-bold"
          :class="
            activeTab === 'i18n' ? 'bg-primary-5 text-neutral-0' : 'bg-neutral-2 text-neutral-7'
          "
          @click="emit('setActiveTab', 'i18n')"
        >
          {{ t('demo.runtime.tabs.i18n') }}
        </button>
      </div>

      <div v-if="activeTab === 'bridge'" class="grid min-h-[190px] content-start gap-4">
        <button
          type="button"
          class="bg-primary-5 text-neutral-0 min-h-[42px] w-fit rounded-lg px-4 font-bold disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="isLoadingRuntime"
          @click="emit('loadRuntimeInfo')"
        >
          {{
            isLoadingRuntime ? t('demo.runtime.bridge.loading') : t('demo.runtime.bridge.action')
          }}
        </button>
        <div v-if="runtimeRows.length" class="grid grid-cols-2 gap-3">
          <div
            v-for="[label, value] in runtimeRows"
            :key="label"
            class="bg-neutral-1 grid gap-1 rounded-lg p-4"
          >
            <span class="text-neutral-7 text-sm">{{ label }}</span>
            <strong class="text-neutral-8">{{ value }}</strong>
          </div>
        </div>
        <p v-else class="text-neutral-7 text-sm">{{ t('demo.runtime.bridge.empty') }}</p>
      </div>

      <div v-else-if="activeTab === 'state'" class="grid min-h-[190px] content-start gap-4">
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            class="border-primary-2 bg-neutral-0 text-primary-6 min-h-[40px] rounded-lg border px-4 font-bold"
            @click="emit('updateCounter', -1)"
          >
            -
          </button>
          <strong class="text-primary-6 min-w-16 text-center font-mono text-[44px]">{{
            counter
          }}</strong>
          <button
            type="button"
            class="border-primary-5 bg-primary-5 text-neutral-0 min-h-[40px] rounded-lg border px-4 font-bold"
            @click="emit('updateCounter', 1)"
          >
            +
          </button>
          <button
            type="button"
            class="text-neutral-7 min-h-[40px] rounded-lg px-4 font-bold"
            @click="emit('resetCounter')"
          >
            {{ t('demo.runtime.state.reset') }}
          </button>
        </div>
        <p class="text-neutral-7 text-sm">
          {{ t('demo.runtime.state.history', { history: historyText }) }}
        </p>
      </div>

      <div v-else class="grid min-h-[190px] content-start gap-4">
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            class="border-primary-2 min-h-[40px] rounded-lg border px-4 font-bold"
            :class="
              demoLanguage === 'zh-CN'
                ? 'bg-primary-5 text-neutral-0'
                : 'bg-neutral-0 text-primary-6'
            "
            @click="switchLanguage('zh-CN')"
          >
            中文
          </button>
          <button
            type="button"
            class="border-primary-2 min-h-[40px] rounded-lg border px-4 font-bold"
            :class="
              demoLanguage === 'en-US'
                ? 'bg-primary-5 text-neutral-0'
                : 'bg-neutral-0 text-primary-6'
            "
            @click="switchLanguage('en-US')"
          >
            EN
          </button>
        </div>
        <h3 class="text-neutral-8 text-lg font-extrabold">{{ t('demo.runtime.i18n.title') }}</h3>
        <p class="leading-md text-neutral-7 text-sm">{{ t('demo.runtime.i18n.description') }}</p>
      </div>
    </article>
  </section>
</template>
