import { defineStore } from 'pinia';

import { fetchDemoTasks } from '../api/demo';
import type { DemoTaskResponse } from '../api/types';
import type { DemoLanguage, RuntimeTab } from '../types/demo';

export const useDemoRuntimeStore = defineStore('capacitor-demo-runtime', () => {
  const activeTab = ref<RuntimeTab>('i18n');
  const counter = ref(0);
  const counterHistory = ref<string[]>([]);
  const demoLanguage = ref<DemoLanguage>('zh-CN');
  const isRequesting = ref(false);
  const taskResponse = ref<DemoTaskResponse | null>(null);

  function setLanguage(language: DemoLanguage) {
    demoLanguage.value = language;
  }

  function setActiveTab(tab: RuntimeTab) {
    activeTab.value = tab;
  }

  function updateCounter(delta: number) {
    counter.value += delta;
    counterHistory.value = [`${delta > 0 ? '+' : ''}${delta}`, ...counterHistory.value].slice(0, 6);
  }

  function resetCounter() {
    counter.value = 0;
    counterHistory.value = ['已重置'];
  }

  async function loadTasks() {
    isRequesting.value = true;
    taskResponse.value = null;

    try {
      taskResponse.value = await fetchDemoTasks();
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
