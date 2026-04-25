<script setup lang="ts">
import DemoSectionTitle from './DemoSectionTitle.vue';
import type { DemoTaskResponse } from '../api/types';
import type { DemoLanguage, RuntimeTab } from '../types/demo';

const props = defineProps<{
  activeTab: RuntimeTab;
  counter: number;
  counterHistory: string[];
  demoLanguage: DemoLanguage;
  isRequesting: boolean;
  taskResponse: DemoTaskResponse | null;
}>();

const emit = defineEmits<{
  loadTasks: [];
  resetCounter: [];
  setActiveTab: [tab: RuntimeTab];
  setLanguage: [language: DemoLanguage];
  updateCounter: [delta: number];
}>();

const { locale, t } = useI18n();

const historyText = computed(
  () => props.counterHistory.join(', ') || t('demo.runtime.counter.none')
);

function getTabClass(tab: RuntimeTab) {
  const baseClass =
    'min-h-[52px] cursor-pointer rounded-lg border-0 text-[15px] font-bold max-[720px]:min-h-[36px] max-[720px]:text-[13px]';

  if (props.activeTab === tab) {
    return `${baseClass} bg-white text-primary-6 shadow-sm`;
  }

  return `${baseClass} bg-transparent text-neutral-6`;
}

function getLanguageClass(language: DemoLanguage) {
  const baseClass =
    'min-h-[46px] cursor-pointer rounded-lg border border-primary-5 px-[18px] text-[15px] font-bold max-[720px]:min-h-[38px] max-[720px]:text-[14px]';

  if (props.demoLanguage === language) {
    return `${baseClass} bg-primary-5 text-white`;
  }

  return `${baseClass} bg-white text-primary-6`;
}

function switchLanguage(language: DemoLanguage) {
  locale.value = language;
  emit('setLanguage', language);
}
</script>

<template>
  <section class="grid gap-[28px] py-[80px] max-[720px]:gap-[14px] max-[720px]:py-[36px]">
    <DemoSectionTitle
      :description="t('demo.runtime.description')"
      :title="t('demo.runtime.title')"
    />

    <article
      class="border-neutral-3 mx-auto grid w-[min(100%,1200px)] gap-[14px] rounded-xl border bg-white p-[24px] shadow-sm max-[1248px]:w-[calc(100%_-_48px)] max-[720px]:w-[calc(100%_-_32px)] max-[720px]:p-[14px]"
    >
      <div class="bg-neutral-2 grid grid-cols-3 gap-[4px] rounded-xl p-[4px]">
        <button type="button" :class="getTabClass('i18n')" @click="emit('setActiveTab', 'i18n')">
          {{ t('demo.runtime.tabs.i18n') }}
        </button>
        <button type="button" :class="getTabClass('state')" @click="emit('setActiveTab', 'state')">
          {{ t('demo.runtime.tabs.state') }}
        </button>
        <button type="button" :class="getTabClass('http')" @click="emit('setActiveTab', 'http')">
          {{ t('demo.runtime.tabs.http') }}
        </button>
      </div>

      <div
        v-if="activeTab === 'i18n'"
        class="grid min-h-[210px] content-start gap-[10px] max-[720px]:min-h-[148px] min-[720px]:min-h-[190px]"
      >
        <div class="flex flex-wrap items-center gap-[8px]">
          <button type="button" :class="getLanguageClass('zh-CN')" @click="switchLanguage('zh-CN')">
            中文
          </button>
          <button type="button" :class="getLanguageClass('en-US')" @click="switchLanguage('en-US')">
            EN
          </button>
        </div>
        <h3 class="text-neutral-9 m-0 text-[20px] font-extrabold max-[720px]:text-[17px]">
          {{ t('demo.runtime.i18n.title') }}
        </h3>
        <p class="leading-md text-neutral-6 m-0 text-[15px] max-[720px]:text-[13px]">
          {{ t('demo.runtime.i18n.description') }}
        </p>
        <small class="leading-md text-neutral-6 text-[15px] max-[720px]:text-[13px]">
          {{ t('demo.runtime.i18n.current') }}
        </small>
      </div>

      <div
        v-else-if="activeTab === 'state'"
        class="grid min-h-[210px] content-start gap-[10px] max-[720px]:min-h-[148px] min-[720px]:min-h-[190px]"
      >
        <div class="flex flex-wrap items-center gap-[8px]">
          <button
            type="button"
            class="border-primary-5 text-primary-6 size-[54px] cursor-pointer rounded-lg border bg-white text-[28px] font-bold max-[720px]:size-[42px] max-[720px]:text-[22px]"
            @click="emit('updateCounter', -1)"
          >
            -
          </button>
          <strong
            class="text-primary-6 min-w-[64px] text-center font-mono text-[48px] leading-none max-[720px]:text-[42px]"
          >
            {{ counter }}
          </strong>
          <button
            type="button"
            class="border-primary-5 bg-primary-5 size-[54px] cursor-pointer rounded-lg border text-[28px] font-bold text-white max-[720px]:size-[42px] max-[720px]:text-[22px]"
            @click="emit('updateCounter', 1)"
          >
            +
          </button>
          <button
            type="button"
            class="text-neutral-6 min-h-[44px] cursor-pointer rounded-lg border-0 bg-transparent px-[8px] font-bold"
            @click="emit('resetCounter')"
          >
            {{ t('demo.runtime.counter.reset') }}
          </button>
        </div>
        <p class="leading-md text-neutral-6 m-0 text-[15px] max-[720px]:text-[13px]">
          {{ t('demo.runtime.counter.history', { history: historyText }) }}
        </p>
      </div>

      <div
        v-else
        class="grid min-h-[210px] content-start gap-[10px] max-[720px]:min-h-[148px] min-[720px]:min-h-[190px]"
      >
        <button
          type="button"
          class="bg-primary-5 inline-flex h-[52px] w-fit cursor-pointer items-center justify-center self-start rounded-lg border-0 px-[22px] text-[15px] leading-none font-bold text-white disabled:cursor-not-allowed disabled:opacity-70 max-[720px]:h-[38px] max-[720px]:text-[14px]"
          :disabled="isRequesting"
          @click="emit('loadTasks')"
        >
          {{ isRequesting ? t('demo.runtime.http.loading') : t('demo.runtime.http.action') }}
        </button>
        <div
          v-if="isRequesting"
          class="leading-md text-neutral-6 flex flex-wrap items-center gap-[8px] text-[15px] max-[720px]:text-[13px]"
        >
          <span
            class="border-neutral-3 border-t-primary-5 size-[18px] animate-spin rounded-full border-2"
          ></span>
          <span>{{ t('demo.runtime.http.requestLine') }}</span>
        </div>
        <div v-if="taskResponse" class="border-neutral-3 grid overflow-hidden rounded-xl border">
          <div class="grid gap-[3px] p-[18px]">
            <h3 class="text-neutral-9 m-0 text-[20px] font-extrabold max-[720px]:text-[17px]">
              {{ taskResponse.status }}
            </h3>
            <p class="leading-md text-neutral-6 m-0 text-[15px] max-[720px]:text-[13px]">
              {{ t('demo.runtime.http.time', { duration: taskResponse.duration }) }}
            </p>
          </div>
          <div
            v-for="task in taskResponse.items"
            :key="task.id"
            class="border-neutral-3 grid gap-[3px] border-t p-[18px]"
          >
            <h3 class="text-neutral-9 m-0 text-[20px] font-extrabold max-[720px]:text-[17px]">
              {{ task.name }}
            </h3>
            <p class="leading-md text-neutral-6 m-0 text-[15px] max-[720px]:text-[13px]">
              {{ t('demo.runtime.http.status') }}: {{ task.status }} ·
              {{ t('demo.runtime.http.owner') }}: {{ task.owner }}
            </p>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
