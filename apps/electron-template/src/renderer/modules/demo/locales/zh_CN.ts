export default {
  layout: {
    title: 'Electron 模板演示',
    description: '本演示聚焦桌面端模板入门：模块化目录、请求分层、最小业务示例。',
    tabs: {
      guide: '使用指引',
      example: '业务示例',
    },
  },
  guide: {
    quickStart: {
      title: '快速开始命令',
      items: {
        dev: { description: '启动 Electron 开发模式，支持热更新。' },
        build: { description: '执行打包构建，用于本地验证。' },
        make: { description: '生成各平台安装包产物。' },
        lint: { description: '提交前运行静态检查。' },
      },
    },
    firstEdit: {
      title: '推荐优先查看的文件',
      items: {
        main: '渲染进程入口与全局插件注册。',
        router: 'demo 入口路由和重定向规则。',
        module: '按业务聚合的 demo 模块目录。',
        locales: '全局语言包合并和兜底策略。',
        request: '基于 @vup/http 的应用侧请求适配层。',
      },
    },
    readOrder: {
      title: '推荐阅读顺序',
      items: {
        step1: '先看 src/renderer/router/routes.ts，了解入口路由。',
        step2: '再看 src/renderer/modules/demo/views，了解页面组合。',
        step3: '再看 src/renderer/modules/demo/stores，理解状态建模。',
        step4: '再看 src/renderer/modules/demo/api，理解接口边界。',
        step5: '最后看 src/renderer/api/request.ts，理解应用侧请求适配。',
      },
    },
  },
  example: {
    title: '最小业务示例',
    description: '用任务看板演示状态流转、筛选能力与模块职责边界。',
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
      simulateError: '模拟错误',
      resetFilters: '重置筛选',
      markDone: '标记完成',
      reopen: '重新打开',
      updating: '更新中...',
    },
    fields: {
      title: '任务',
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
        description: '任务列表正在从本地 demo 数据源加载。',
      },
      error: {
        title: '请求失败',
      },
      empty: {
        description: '当前筛选条件下没有任务，可尝试重置筛选。',
      },
    },
    fileMap: {
      title: '文件职责映射',
      items: {
        page: {
          title: 'modules/demo/views/DemoExamplePage.vue',
          description: '负责页面分区组织，以及页面与 store/组件的连接。',
        },
        component: {
          title: 'modules/demo/components/DemoTaskBoard.vue',
          description: '负责交互 UI 呈现，并通过事件把动作抛给页面层。',
        },
        store: {
          title: 'modules/demo/stores/useDemoTaskStore.ts',
          description: '负责状态、筛选、异步加载与任务状态流转。',
        },
        api: {
          title: 'modules/demo/api/task.ts',
          description: '负责模块内接口函数定义，靠近业务上下文。',
        },
        types: {
          title: 'modules/demo/types/task.ts',
          description: '负责任务模型类型定义，供组件/store/api 复用。',
        },
      },
    },
  },
};
