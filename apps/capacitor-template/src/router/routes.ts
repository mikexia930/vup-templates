export default [
  {
    path: '/',
    redirect: { name: 'demo-home' },
  },
  {
    path: '/demo',
    name: 'demo-home',
    component: (): Promise<Component> => import('@/modules/demo/views/DemoLayout.vue'),
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
