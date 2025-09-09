import type { Component } from 'vue';
export default [
  {
    path: '/',
    redirect: { name: 'index' },
  },
  {
    path: '/index',
    name: 'index',
    component: (): Promise<Component> => import('@/views/index/Index.vue'),
    children: [
      {
        path: '/content/:id?',
        name: 'content',
        component: (): Promise<Component> => import('@/views/content/Content.vue'),
      },
    ],
  },
  {
    path: '/empty',
    name: 'empty',
    component: (): Promise<Component> => import('@/views/empty/Empty.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'empty' },
  },
];
