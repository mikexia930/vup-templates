export default [
  {
    path: '/',
    redirect: { name: 'demo-guide' },
  },
  {
    path: '/demo',
    component: (): Promise<Component> => import('@/modules/demo/views/DemoLayout.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'demo-guide' },
      },
      {
        path: 'guide',
        name: 'demo-guide',
        component: (): Promise<Component> => import('@/modules/demo/views/DemoGuidePage.vue'),
      },
      {
        path: 'example',
        name: 'demo-example',
        component: (): Promise<Component> => import('@/modules/demo/views/DemoExamplePage.vue'),
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
