import { getDemoRuntimeInfo } from '../api/demo';
import type { DemoRuntimeResponse } from '../api/types';
import type { DemoLanguage, RuntimeTab } from '../types/demo';

export const useDemoRuntimeStore = defineStore('electron-demo-runtime', () => {
  const activeTab = ref<RuntimeTab>('bridge');
  const counter = ref(0);
  const counterHistory = ref<number[]>([]);
  const demoLanguage = ref<DemoLanguage>('zh-CN');
  const isLoadingRuntime = ref(false);
  const runtimeInfo = ref<DemoRuntimeResponse | null>(null);

  function setActiveTab(tab: RuntimeTab) {
    activeTab.value = tab;
  }

  function setLanguage(language: DemoLanguage) {
    demoLanguage.value = language;
    localStorage.setItem('locale', language);
  }

  function updateCounter(delta: number) {
    counter.value += delta;
    counterHistory.value = [counter.value, ...counterHistory.value].slice(0, 5);
  }

  function resetCounter() {
    counter.value = 0;
    counterHistory.value = [];
  }

  async function loadRuntimeInfo() {
    isLoadingRuntime.value = true;
    try {
      runtimeInfo.value = await getDemoRuntimeInfo();
    } finally {
      isLoadingRuntime.value = false;
    }
  }

  return {
    activeTab,
    counter,
    counterHistory,
    demoLanguage,
    isLoadingRuntime,
    runtimeInfo,
    loadRuntimeInfo,
    resetCounter,
    setActiveTab,
    setLanguage,
    updateCounter,
  };
});
