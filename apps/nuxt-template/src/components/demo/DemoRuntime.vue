<script setup lang="ts">
import type { DemoTaskResponse, DemoLanguage, DemoRuntimeTab } from '~/stores/demo';

const props = defineProps<{
  activeTab: DemoRuntimeTab;
  counter: number;
  counterHistory: string[];
  demoLanguage: DemoLanguage;
  isRequesting: boolean;
  taskResponse: DemoTaskResponse | null;
}>();

const emit = defineEmits<{
  loadTasks: [];
  resetCounter: [];
  setActiveTab: [tab: DemoRuntimeTab];
  setLanguage: [language: DemoLanguage];
  updateCounter: [delta: number];
}>();

const { locale, setLocale, t } = useI18n();

const runtimeTabs = [
  { key: 'i18n', symbol: '◎', value: 'i18n' },
  { key: 'state', symbol: '↻', value: 'state' },
  { key: 'http', symbol: '↔', value: 'http' },
] as const;

const historyText = computed(
  () => props.counterHistory.join(', ') || t('demo.runtime.counter.none')
);

function getTabClass(tab: DemoRuntimeTab) {
  const baseClass =
    'flex cursor-pointer items-center gap-[8px] whitespace-nowrap border-0 border-b-2 bg-transparent px-[22px] py-[15px] text-sm font-bold';

  if (props.activeTab === tab) {
    return `${baseClass} border-primary-5 bg-white text-primary-6`;
  }

  return `${baseClass} border-transparent text-neutral-6 hover:text-neutral-9`;
}

function getLanguageButtonClass(language: DemoLanguage) {
  const baseClass = 'cursor-pointer rounded-sm border-0 px-[16px] py-[7px] text-sm font-bold';

  if (props.demoLanguage === language) {
    return `${baseClass} bg-primary-5 text-white`;
  }

  return `${baseClass} bg-transparent text-neutral-6 hover:text-neutral-9`;
}

async function switchLanguage(language: DemoLanguage) {
  await setLocale(language);
  emit('setLanguage', language);
}

watchEffect(() => {
  if (locale.value === 'en-US' || locale.value === 'zh-CN') {
    emit('setLanguage', locale.value);
  }
});
</script>

<template>
  <section id="runtime" class="bg-neutral-2 py-[76px]">
    <div class="mx-auto w-[min(1120px,calc(100%_-_48px))] max-[680px]:w-[calc(100%_-_32px)]">
      <DemoSectionTitle
        :description="t('demo.runtime.description')"
        :title="t('demo.runtime.title')"
      />

      <div class="border-neutral-3 overflow-hidden rounded-xl border bg-white">
        <div class="border-neutral-3 bg-neutral-1 flex overflow-x-auto border-b">
          <button
            v-for="tab in runtimeTabs"
            :key="tab.value"
            type="button"
            :class="getTabClass(tab.value)"
            @click="emit('setActiveTab', tab.value)"
          >
            <span>{{ tab.symbol }}</span>
            {{ t(`demo.runtime.tabs.${tab.key}`) }}
          </button>
        </div>

        <div class="min-h-[220px] p-[28px]">
          <div v-if="activeTab === 'i18n'" class="grid content-start gap-[16px]">
            <div
              class="border-neutral-3 bg-neutral-1 inline-flex w-fit gap-[4px] rounded-md border p-[4px]"
            >
              <button
                type="button"
                :class="getLanguageButtonClass('zh-CN')"
                @click="switchLanguage('zh-CN')"
              >
                中文
              </button>
              <button
                type="button"
                :class="getLanguageButtonClass('en-US')"
                @click="switchLanguage('en-US')"
              >
                English
              </button>
            </div>
            <h3 class="text-neutral-9 text-xl font-extrabold">
              {{ t('demo.runtime.i18n.heading') }}
            </h3>
            <p class="text-md text-neutral-6">{{ t('demo.runtime.i18n.description') }}</p>
            <small class="text-neutral-6 text-sm">{{ t('demo.runtime.i18n.current') }}</small>
          </div>

          <div v-else-if="activeTab === 'state'" class="flex flex-wrap items-center gap-[14px]">
            <button
              class="border-neutral-3 text-neutral-9 hover:border-primary-3 hover:text-primary-6 grid size-[44px] cursor-pointer place-items-center rounded-md border bg-white text-[24px] transition"
              type="button"
              @click="emit('updateCounter', -1)"
            >
              -
            </button>
            <strong
              class="text-primary-6 min-w-[76px] text-center font-mono text-[48px] leading-none"
            >
              {{ counter }}
            </strong>
            <button
              class="border-neutral-3 text-neutral-9 hover:border-primary-3 hover:text-primary-6 grid size-[44px] cursor-pointer place-items-center rounded-md border bg-white text-[24px] transition"
              type="button"
              @click="emit('updateCounter', 1)"
            >
              +
            </button>
            <button
              class="border-neutral-3 text-neutral-6 hover:border-primary-3 hover:text-primary-6 h-[36px] cursor-pointer rounded-md border bg-white px-[14px] text-sm font-bold transition"
              type="button"
              @click="emit('resetCounter')"
            >
              {{ t('demo.runtime.counter.reset') }}
            </button>
            <p class="text-neutral-6 basis-full text-sm">
              {{ t('demo.runtime.counter.history', { history: historyText }) }}
            </p>
          </div>

          <div v-else class="grid content-start gap-[16px]">
            <button
              class="bg-primary-5 hover:bg-primary-6 inline-flex h-[42px] w-fit cursor-pointer items-center justify-center rounded-md border border-transparent px-[18px] text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-70"
              type="button"
              :disabled="isRequesting"
              @click="emit('loadTasks')"
            >
              {{ isRequesting ? t('demo.runtime.http.loading') : t('demo.runtime.http.action') }}
            </button>
            <div v-if="isRequesting" class="text-neutral-6 flex items-center gap-[10px] text-sm">
              <span
                class="border-neutral-3 border-t-primary-5 size-[18px] animate-spin rounded-full border-2"
              ></span>
              <span>{{ t('demo.runtime.http.requestLine') }}</span>
            </div>
            <div v-if="taskResponse" class="grid gap-[12px] overflow-x-auto">
              <div class="flex items-center gap-[10px]">
                <span
                  class="bg-success-0 text-success-6 rounded-sm px-[8px] py-[3px] text-xs font-extrabold"
                >
                  {{ taskResponse.status }}
                </span>
                <small class="text-neutral-6 text-sm">
                  {{ t('demo.runtime.http.time', { duration: taskResponse.duration }) }}
                </small>
              </div>
              <div class="grid gap-[10px]">
                <article
                  v-for="task in taskResponse.items"
                  :key="task.id"
                  class="border-neutral-3 bg-neutral-1 rounded-md border px-[14px] py-[12px]"
                >
                  <h4 class="text-neutral-9 text-sm font-bold">{{ task.title }}</h4>
                  <p class="leading-md text-neutral-6 mt-[4px] text-xs">{{ task.summary }}</p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
