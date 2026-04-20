import { createPinia } from 'pinia';
import { createApp } from 'vue';

import '@_shared/assets/styles/tailwind.scss';
import { syncTokenFromStorage } from './api/request';
import App from './App.vue';
import i18n from './locales';
import router from './router';
import VMUI from '@vup/ui-mobile';

let mockStarted = false;

async function startMockIfNeeded() {
  if (mockStarted) return;
  if (!import.meta.env.DEV) return;
  const useMock = import.meta.env.VITE_ENABLE_MOCK !== 'false';
  if (!useMock) {
    console.info('[mock] OFF (set VITE_ENABLE_MOCK=true to enable)');
    return;
  }

  const { startMockWorker } = await import('@vup/mock/browser');
  await startMockWorker();
  mockStarted = true;
  console.info('[mock] ON (set VITE_ENABLE_MOCK=false to disable)');
}

async function bootstrap() {
  await startMockIfNeeded();

  // 启动时把持久化的 token 加载到内存（移动端必须，详见 api/request.ts）
  await syncTokenFromStorage();

  const app = createApp(App);
  app.use(VMUI);
  app.use(i18n);
  app.use(createPinia());
  app.use(router);

  await router.isReady();
  app.mount('#app');
}

void bootstrap();
