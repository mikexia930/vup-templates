import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auto/vue/:pathMatch(.*)*',
      component: () => import('@/views/auto/Auto.vue'),
    },
    {
      path: '/manual/vue/:pathMatch(.*)*',
      component: () => import('@/views/manual/Manual.vue'),
    },
  ],
});
