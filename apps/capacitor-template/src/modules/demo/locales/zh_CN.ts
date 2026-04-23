export default {
  layout: {
    title: 'Capacitor 模板 Demo',
    subtitle: '基于 Capacitor 的移动端应用模板，支持 iOS / Android 原生打包。',
    tabs: {
      example: '示例',
      guide: '指南',
    },
  },
  guide: {
    title: '使用指南',
    intro: '先跑通移动端流程，再按模块扩展业务能力。',
    quickStart: {
      title: '快速开始',
      items: {
        android: 'pnpm android:add',
        dev: 'pnpm dev',
        ios: 'pnpm ios:add',
        sync: 'pnpm android:build',
      },
    },
    structure: {
      title: '推荐目录',
      tree: `src/
├── api/
│   ├── request.ts
│   └── types.ts
├── locales/
├── modules/
│   └── demo/
│       ├── views/
│       ├── components/
│       ├── stores/
│       ├── api/
│       ├── types/
│       └── locales/
└── router/`,
    },
  },
  example: {
    title: '最小业务示例',
    description: '通过任务列表演示移动端模块职责、筛选和状态流转。',
    searchPlaceholder: '按标题、描述或标签搜索',
    filters: {
      all: '全部',
      pending: '待处理',
      inProgress: '进行中',
      done: '已完成',
    },
    status: {
      pending: '待处理',
      inProgress: '进行中',
      done: '已完成',
    },
    priority: {
      low: '低优先级',
      medium: '中优先级',
      high: '高优先级',
    },
    actions: {
      reload: '重新加载',
      retry: '重试',
      resetFilters: '重置筛选',
      markDone: '标记完成',
      reopen: '重新打开',
      updating: '更新中...',
    },
    fields: {
      owner: '负责人',
      updatedAt: '更新时间',
      tags: '标签',
      noTags: '无标签',
      actions: '操作',
    },
    stats: {
      total: '总数',
      pending: '待处理',
      inProgress: '进行中',
      done: '已完成',
    },
    state: {
      loading: {
        title: '正在加载示例数据',
        description: '任务列表正在从模块 API 加载。',
      },
      error: {
        title: '数据加载失败',
      },
      empty: {
        description: '当前筛选条件下没有任务，可尝试重置筛选。',
      },
    },
    fileMap: {
      title: '文件职责映射',
      items: {
        page: {
          title: 'src/modules/demo/views/DemoExamplePage.vue',
          description: '负责页面分区组织，并连接 store 与组件。',
        },
        component: {
          title: 'src/modules/demo/components/DemoTaskBoard.vue',
          description: '负责移动端交互 UI 呈现，并通过事件向上抛出动作。',
        },
        store: {
          title: 'src/modules/demo/stores/useDemoTaskStore.ts',
          description: '负责状态、筛选、异步加载与任务状态流转。',
        },
        api: {
          title: 'src/modules/demo/api/task.ts',
          description: '负责模块接口函数定义，靠近业务上下文。',
        },
        types: {
          title: 'src/modules/demo/types/task.ts',
          description: '负责任务模型与统计类型定义，供模块内部复用。',
        },
      },
    },
  },
};
