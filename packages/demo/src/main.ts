import { createPinia } from 'pinia';
import { createApp } from 'vue';

import '@_shared/assets/styles/tailwind.scss';
import App from './App.vue';
import i18n from './locales';
import router from './router';

let app: any = null;

function render(props: any = {}) {
  const { baseRoute, container } = props;
  app = createApp(App);

  app.use(createPinia());
  app.use(router(baseRoute ?? '/'));
  app.use(i18n);

  app.mount(container ? container.querySelector('#app') : '#app');
}

render();
