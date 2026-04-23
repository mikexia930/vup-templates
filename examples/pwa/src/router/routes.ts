import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'pwa-intro',
    component: () => import('@/views/IntroPage.vue'),
  },
];

export default routes;
