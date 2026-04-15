export default {
  layout: {
    badge: 'Vue SPA 模板 Demo',
    description:
      '把 demo 当成模板说明书来维护：先告诉用户怎么开始，再用最小真实示例展示推荐代码组织。',
    features: {
      guide: '上手路径清晰',
      module: '模块内业务聚合',
      qiankun: '保留微前端兼容入口',
    },
    scenarios: {
      admin: '适合后台管理、Dashboard、企业级 SPA',
      module: '新增业务时优先新建 modules 目录',
      optional: 'qiankun 相关代码可按需保留或删除',
    },
    tabs: {
      example: '最佳实践示例',
      guide: '使用指南',
    },
    title: '让用户和 AI 都能快速看懂 Vue 模板',
  },
  guide: {
    cleanup: {
      items: {
        legacy: '开始写真实业务前，先删除不再需要的脚手架示例。',
        locales: '模块自己的文案跟模块走，基础 locales 只保留全局公共内容。',
        request: '基础 request 放在 src/api，模块自己的接口函数放在 modules/demo/api。',
        structure: '全局 stores 只放 app 级状态，业务 store 不要挂在 views 下。',
      },
      title: '落地前检查清单',
    },
    firstEdit: {
      description: '第一次接手模板时，优先理解下面这些位置，改动成本最低、收益最高。',
      items: {
        locales: '调整全局公共文案，并在模块内补充自己的语言包。',
        main: '查看应用入口、插件注册和 qiankun 兼容逻辑。',
        module: '以 modules/demo 为样板复制新的业务模块。',
        request: '补齐基础请求层、统一类型和错误处理。',
        router: '新增或删减路由时，从这里开始整理访问路径。',
      },
      title: '建议先看的文件',
    },
    quickStart: {
      description: '所有命令都对齐当前模板的 package.json，避免文案和真实脚本不一致。',
      items: {
        build: {
          command: 'pnpm build',
          description: '构建生产产物，输出到 .output 目录。',
          title: '生产构建',
        },
        dev: {
          command: 'pnpm dev',
          description: '启动本地开发环境，默认访问 http://localhost:9301。',
          title: '启动开发',
        },
        install: {
          command: 'pnpm install',
          description: '初始化依赖，第一次拉取模板后先执行。',
          title: '安装依赖',
        },
        lint: {
          command: 'pnpm lint',
          description: '在提交前检查代码结构、语法和风格问题。',
          title: '代码检查',
        },
      },
      title: '快速开始',
    },
    readOrder: {
      items: {
        step1: '从 main.ts 进入，先理解应用入口和插件装配。',
        step2: '再看 router/routes.ts，确认页面入口和访问路径。',
        step3: '进入 modules/demo/views，理解页面和壳层如何分工。',
        step4: '继续看 stores、api、types，学习状态、数据和类型边界。',
        step5: '最后再扩展 locales，把自己的业务文案按模块拆分。',
      },
      title: '推荐阅读顺序',
    },
    structure: {
      description:
        '基础设施继续保留在 src 根目录，业务能力随模块聚合，既利于协作，也利于 AI 学习。',
      items: {
        base: 'src/api、src/locales、src/router 保留全局基础设施。',
        module: 'modules/demo 下聚合页面、组件、store、api、types、locales。',
        shared: '只有明确跨模块复用的代码才放到 shared，不为了抽象而抽象。',
      },
      rules: {
        moduleApi: '模块自己的请求函数跟模块走，不再散落在全局目录。',
        moduleLocales: '模块自己的文案跟模块走，避免根 locales 变成大杂烩。',
        moduleStore: '业务 store 跟模块走，避免 views/demo/stores 这类误导性结构。',
        optional: 'qiankun 兼容代码属于平台能力，业务无关时可以裁剪。',
      },
      title: '推荐目录结构',
      treeTitle: '当前 demo 作为标准样板的目录',
    },
    title: '从这页开始理解模板怎么用',
  },
  example: {
    actions: {
      markDone: '标记完成',
      reload: '刷新数据',
      reopen: '重新打开',
      resetFilters: '清空筛选',
      retry: '重新加载',
      simulateError: '模拟错误',
      updating: '处理中...',
    },
    description:
      '这个示例不追求复杂功能，而是演示推荐的页面、store、api、types、locales 分层方式。',
    fields: {
      actions: '操作',
      noTags: '无标签',
      owner: '负责人',
      tags: '标签',
      updatedAt: '最近更新',
    },
    fileMap: {
      items: {
        api: {
          description: '模块自己的数据访问入口，后续接真实接口时直接替换这里。',
          title: 'modules/demo/api/taskService.ts',
        },
        component: {
          description: '负责列表、筛选、状态呈现等 UI 编排，不直接维护业务数据源。',
          title: 'modules/demo/components/DemoTaskBoard.vue',
        },
        page: {
          description: '页面层只负责组织模块内容，并触发 store 的加载动作。',
          title: 'modules/demo/views/DemoExamplePage.vue',
        },
        store: {
          description: '集中管理 loading、error、筛选和派生统计，避免状态散在页面里。',
          title: 'modules/demo/stores/useDemoTaskStore.ts',
        },
        types: {
          description: '定义任务状态、优先级和领域模型，让示例具备可扩展的类型边界。',
          title: 'modules/demo/types/task.ts',
        },
      },
      title: '这块示例对应的关键文件',
    },
    filters: {
      all: '全部',
      done: '已完成',
      inProgress: '进行中',
      pending: '待处理',
    },
    searchPlaceholder: '按标题、描述或标签搜索示例任务',
    state: {
      empty: {
        description: '当前筛选条件下没有结果，可以清空条件后再看一遍完整示例。',
        title: '没有匹配的任务',
      },
      error: {
        description: '这里专门保留了错误态，方便你检查页面如何处理失败反馈。',
        title: '示例接口加载失败',
      },
      loading: {
        description: '真实业务里，loading、empty、error 都应该被明确表达。',
        title: '正在加载示例数据',
      },
    },
    stats: {
      done: '已完成',
      inProgress: '进行中',
      pending: '待处理',
      total: '任务总数',
    },
    title: '最小真实业务示例',
    priority: {
      high: '高优先级',
      low: '低优先级',
      medium: '中优先级',
    },
    status: {
      done: '已完成',
      inProgress: '进行中',
      pending: '待处理',
    },
  },
};
