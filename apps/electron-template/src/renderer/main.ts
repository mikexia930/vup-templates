import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import i18n from './locales';
import router from './router';
import '@_shared/assets/styles/tailwind.scss';

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(createPinia());

app.mount('#app');
