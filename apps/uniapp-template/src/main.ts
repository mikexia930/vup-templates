import { createSSRApp } from 'vue';
import App from './App.vue';
import i18n from './locales';

export function createApp() {
  const app = createSSRApp(App);

  // 使用 i18n
  app.use(i18n);

  return {
    app,
  };
}
