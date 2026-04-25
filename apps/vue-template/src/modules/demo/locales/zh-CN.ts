export default {
  nav: {
    features: '特性',
    quickstart: '快速开始',
    runtime: '演示',
    structure: '目录结构',
  },
  hero: {
    badge: 'Production Ready',
    copyCommand: '复制启动命令',
    description:
      '基于 Vue 3 + Vite + TypeScript 的企业级 SPA 模板。模块化分层、类型安全、开箱即用。',
    structure: '查看目录结构',
    title: 'Vue SPA Template',
  },
  quickstart: {
    description: '四步启动你的项目。',
    items: {
      build: {
        description: '构建生产环境产物',
        title: '生产构建',
      },
      dev: {
        description: '启动开发服务器，默认端口 9301',
        title: '开发模式',
      },
      install: {
        description: '使用 pnpm 安装项目依赖',
        title: '安装依赖',
      },
      lint: {
        description: '执行 ESLint 代码规范检查',
        title: '代码检查',
      },
    },
    title: '快速开始',
  },
  features: {
    description: '保留企业级开发真正会用到的基础能力。',
    items: {
      http: 'HTTP 三层封装：@vup/http 共享层、src/api 应用适配、modules/api 业务接口。',
      i18n: '模块语言包自动聚合，新增模块无需手动注册。',
      module: 'modules/ 自治模块，UI、Store、API、Types、Locales 就近聚合。',
      ts: '从路由到接口保留类型边界，减少运行时返工。',
      ui: '统一 V* 前缀组件，跨模板复用，风格一致。',
      vite: 'Composition API + Vite HMR，保持轻快的开发体验。',
    },
    titles: {
      http: 'HTTP 三层封装',
      i18n: 'i18n 自动聚合',
      module: '模块化架构',
      ts: 'TypeScript',
      ui: 'vup-ui 组件库',
      vite: 'Vue 3 + Vite',
    },
    title: '核心特性',
  },
  structure: {
    description: '基础设施留在 src 根目录，业务能力随模块聚合。这个 demo 也按同样方式组织。',
    layers: {
      base: {
        badge: '基建抽象层',
        directory: 'api/',
        responsibility: 'HTTP 请求层，适配 @vup/http，为上层提供统一请求接口',
      },
      common: {
        badge: '业务通用层',
        directory: 'router/ · locales/',
        responsibility: '路由配置、全局国际化资源',
      },
      module: {
        badge: '业务模块层',
        directory: 'modules/*/',
        responsibility: '自治模块，含 views / components / stores / api / types / locales',
      },
      page: {
        badge: '页面入口层',
        directory: 'views/ · App.vue · main.ts',
        responsibility: '应用入口、公共页面、根组件',
      },
    },
    table: {
      directory: '目录',
      layer: '层级',
      responsibility: '职责',
    },
    title: '目录结构',
  },
  runtime: {
    counter: {
      history: '操作记录：{history}',
      none: '暂无',
      reset: '重置',
    },
    description: '用最小交互展示 i18n、状态管理和请求分层。',
    http: {
      action: '发起请求',
      loading: '请求中...',
      owner: '负责人',
      requestLine: 'GET /api/tasks',
      status: '状态',
      task: '任务名',
      time: '耗时 {duration}ms',
    },
    i18n: {
      current: '当前语言：中文 (zh-CN)',
      description:
        '这是一个基于 Vue 3 的企业级 SPA 模板。它提供了模块化架构、类型安全和开箱即用的开发体验。',
      title: '欢迎使用 Vue SPA Template',
    },
    tabs: {
      http: 'HTTP 请求模拟',
      i18n: 'i18n 切换',
      state: '状态管理',
    },
    title: '运行时演示',
  },
  footer: {
    license: 'Released under the MIT License.',
    stack: 'Vue 3 · Vite · TypeScript · @vup/ui',
  },
  common: {
    copied: '已复制到剪贴板',
    copy: '复制',
    copiedShort: '已复制',
  },
};
