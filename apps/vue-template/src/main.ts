import { createPinia } from 'pinia';
import { createApp } from 'vue';

import '@_shared/assets/styles/tailwind.scss';
import App from './App.vue';
import i18n from './locales';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(createPinia());

app.mount('#app');
