import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auto/:pathMatch(.*)*',
      component: () => import('@/views/auto/Index.vue'),
    },
    {
      path: '/manual/:pathMatch(.*)*',
      component: () => import('@/views/manual/Index.vue'),
    },
  ],
});
