import { createApp } from 'vue';

import '@_shared/assets/styles/tailwind.scss';
import App from './App.vue';
import router from './router';
import { registerVupPwa } from '@vup/pwa/runtime';
async function bootstrap() {
  const app = createApp(App);
  app.use(router('/'));
  app.mount('#app');

  if (import.meta.env.DEV) return;

  await registerVupPwa({
    onOfflineReady() {
      console.info('[pwa example] offline ready');
    },
    onNeedRefresh() {
      console.info('[pwa example] new version available');
    },
  });
}

void bootstrap();
