import { createApp } from 'vue';

import '@_shared/assets/styles/tailwind.scss';
import App from './App.vue';
import router from './router';
import { startMockWorker } from '@vup/mock/browser';

async function bootstrap() {
  const useMock = import.meta.env.VITE_ENABLE_MOCK !== 'false';

  if (import.meta.env.DEV && useMock) {
    await startMockWorker();
    console.info('[mock example] worker started');
  }

  const app = createApp(App);
  app.use(router('/'));
  app.mount('#app');
}

void bootstrap();
