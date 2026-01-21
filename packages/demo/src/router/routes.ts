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
        path: 'button',
        name: 'button',
        component: (): Promise<Component> => import('@/views/ui/button/Index.vue'),
      },
      {
        path: 'message',
        name: 'message',
        component: (): Promise<Component> => import('@/views/ui/message/Index.vue'),
      },
      {
        path: 'messageBox',
        name: 'messageBox',
        component: (): Promise<Component> => import('@/views/ui/messageBox/Index.vue'),
      },
      {
        path: 'modal',
        name: 'modal',
        component: (): Promise<Component> => import('@/views/ui/modal/Index.vue'),
      },
      {
        path: 'drawer',
        name: 'drawer',
        component: (): Promise<Component> => import('@/views/ui/drawer/Index.vue'),
      },
      {
        path: 'input',
        name: 'input',
        component: (): Promise<Component> => import('@/views/ui/input/Index.vue'),
      },
      {
        path: 'text',
        name: 'text',
        component: (): Promise<Component> => import('@/views/ui/text/Index.vue'),
      },
      {
        path: 'scrollbar',
        name: 'scrollbar',
        component: (): Promise<Component> => import('@/views/ui/scrollbar/Index.vue'),
      },
      {
        path: 'select',
        name: 'select',
        component: (): Promise<Component> => import('@/views/ui/select/Index.vue'),
      },
      {
        path: 'radio',
        name: 'radio',
        component: (): Promise<Component> => import('@/views/ui/radio/Index.vue'),
      },
      {
        path: 'checkbox',
        name: 'checkbox',
        component: (): Promise<Component> => import('@/views/ui/checkbox/Index.vue'),
      },
      {
        path: 'popover',
        name: 'popover',
        component: (): Promise<Component> => import('@/views/ui/popover/Index.vue'),
      },
      {
        path: 'tooltip',
        name: 'tooltip',
        component: (): Promise<Component> => import('@/views/ui/tooltip/Index.vue'),
      },
      {
        path: 'notification',
        name: 'notification',
        component: (): Promise<Component> => import('@/views/ui/notification/Index.vue'),
      },
      {
        path: '/popconfirm',
        name: 'popconfirm',
        component: (): Promise<Component> => import('@/views/ui/popconfirm/Index.vue'),
      },
      {
        path: 'loading',
        name: 'loading',
        component: (): Promise<Component> => import('@/views/ui/loading/Index.vue'),
      },
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
