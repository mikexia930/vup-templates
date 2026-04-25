import { defineStore } from 'pinia';

import { fetchDemoTasks } from '../api/demo';
import type { DemoTaskResponse } from '../api/types';
import type { DemoLanguage, RuntimeTab } from '../types/demo';

export const useDemoRuntimeStore = defineStore('demo-runtime', () => {
  const activeTab = ref<RuntimeTab>('i18n');
  const copiedText = ref('');
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

  async function copyText(text: string) {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.cssText = 'position:fixed;left:-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    copiedText.value = text;
    window.setTimeout(() => {
      if (copiedText.value === text) copiedText.value = '';
    }, 1800);
  }

  function updateCounter(delta: number) {
    counter.value += delta;
    counterHistory.value = [`${delta > 0 ? '+' : ''}${delta}`, ...counterHistory.value].slice(0, 8);
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
    copiedText,
    counter,
    counterHistory,
    copyText,
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
