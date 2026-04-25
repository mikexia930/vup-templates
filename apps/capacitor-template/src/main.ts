import { createPinia } from 'pinia';
import { createApp } from 'vue';

import '@_shared/assets/styles/tailwind.scss';
import { syncTokenFromStorage } from './api/request';
import App from './App.vue';
import i18n from './locales';
import router from './router';

async function bootstrap() {
  // 启动时把持久化的 token 加载到内存（移动端必须，详见 api/request.ts）
  await syncTokenFromStorage();

  const app = createApp(App);
  app.use(i18n);
  app.use(createPinia());
  app.use(router);

  await router.isReady();
  app.mount('#app');
}

void bootstrap();
