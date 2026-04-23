import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'mock-intro',
    component: () => import('@/views/IntroPage.vue'),
  },
];

export default routes;
