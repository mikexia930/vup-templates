export default [
  {
    path: '/',
    redirect: { name: 'docs' },
  },
  {
    path: '/index',
    name: 'index',
    component: (): Promise<Component> => import('@/views/index/Index.vue'),
    children: [
      {
        path: '/docs/:id?',
        name: 'docs',
        component: (): Promise<Component> => import('@/views/docs/Docs.vue'),
      },
      {
        path: '/demo/:id?',
        name: 'demo',
        component: (): Promise<Component> => import('@/views/demo/Demo.vue'),
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
