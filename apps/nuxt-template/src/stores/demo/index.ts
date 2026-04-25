import { listDemoTasks } from '~/api/demo';
import type { DemoTask } from '~/api/demo';

export type DemoLanguage = 'en-US' | 'zh-CN';
export type DemoRuntimeTab = 'i18n' | 'state' | 'http';

export interface DemoTaskResponse {
  duration: number;
  items: DemoTask[];
  status: string;
}

export const useDemoRuntimeStore = defineStore('demo-runtime', () => {
  const activeTab = ref<DemoRuntimeTab>('i18n');
  const counter = ref(0);
  const counterHistory = ref<string[]>([]);
  const demoLanguage = ref<DemoLanguage>('en-US');
  const isRequesting = ref(false);
  const taskResponse = ref<DemoTaskResponse | null>(null);

  function setActiveTab(tab: DemoRuntimeTab) {
    activeTab.value = tab;
  }

  function setLanguage(language: DemoLanguage) {
    demoLanguage.value = language;
  }

  function updateCounter(delta: number) {
    counter.value += delta;
    counterHistory.value = [`${delta > 0 ? '+' : ''}${delta}`, ...counterHistory.value].slice(0, 5);
  }

  function resetCounter() {
    counter.value = 0;
    counterHistory.value = [];
  }

  async function loadTasks() {
    const startedAt = performance.now();
    isRequesting.value = true;

    try {
      const items = await listDemoTasks();
      taskResponse.value = {
        duration: Math.round(performance.now() - startedAt),
        items: items.slice(0, 3),
        status: '200 OK',
      };
    } finally {
      isRequesting.value = false;
    }
  }

  return {
    activeTab,
    counter,
    counterHistory,
    demoLanguage,
    isRequesting,
    loadTasks,
    resetCounter,
    setActiveTab,
    setLanguage,
    taskResponse,
    updateCounter,
  };
});
