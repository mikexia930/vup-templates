export default [
  {
    path: '/',
    redirect: { name: 'index' },
  },
  {
    path: '/index',
    name: 'index',
    component: (): Promise<Component> => import('@/views/index/Index.vue'),
  },
  {
    path: '/ui',
    name: 'ui',
    component: (): Promise<Component> => import('@/views/ui/Index.vue'),
    children: [
      {
        path: 'richeditor',
        name: 'richeditor',
        component: (): Promise<Component> => import('@/views/ui/richeditor/Index.vue'),
      },
      {
        path: 'fileManager',
        name: 'fileManager',
        component: (): Promise<Component> => import('@/views/ui/fileManager/Index.vue'),
      },
    ],
  },
  {
    path: '/iconfont',
    name: 'iconfont',
    component: (): Promise<Component> => import('@/views/iconfont/Index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'index' },
  },
];
