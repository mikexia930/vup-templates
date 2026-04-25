export default {
  header: {
    title: 'UniApp Template',
    subtitle: '多端应用模板能力演示',
  },
  drawer: {
    title: '模板导航',
    routes: {
      title: '路由组织',
      desc: 'pages.json + 薄页面入口',
      content:
        'uni-app 不使用 vue-router。页面先在 pages.json 声明，再由 pages/index/index.vue 渲染 modules/demo。',
    },
    modules: {
      title: '模块边界',
      desc: '组件、文案、数据留在模块内',
      content:
        'demo 展示数据放在 modules/demo/common，展示组件放在 modules/demo/components，跨模块能力才进入 src/common。',
    },
    platform: {
      title: '跨端交互',
      desc: '统一使用 uni API',
      content:
        '复制、弹窗、Toast 都通过 uni API 调用，避免只在 H5 可用的浏览器 API 泄漏到小程序或 App。',
    },
  },
  hero: {
    badge: 'Mobile Ready',
    title: 'UniApp App Template',
    description:
      '基于 uni-app + Vue 3 的移动端模板。保留 H5、小程序和 App 的统一开发体验，同时按 uni-app 的跨端约束组织页面、接口和状态。',
  },
  actions: {
    copyStart: '复制启动命令',
    docs: '查看文档',
    copySuccess: '命令已复制',
    copyFallback: '请手动复制',
    confirm: '知道了',
  },
  quickstart: {
    title: '快速开始',
    description: '先跑通 H5 预览，再同步到小程序或 App 工程。',
    h5: {
      title: 'H5 预览',
      desc: '启动本地移动端预览',
    },
    weixin: {
      title: '微信小程序',
      desc: '构建并打开小程序产物',
    },
    app: {
      title: 'App 调试',
      desc: '进入原生 App 调试链路',
    },
    build: {
      title: '生产构建',
      desc: '构建 H5 生产产物',
    },
  },
  capabilities: {
    title: '核心能力',
    description: '展示 uni-app 模板真正需要保留的跨端能力。',
    pages: {
      title: 'pages.json 路由',
      desc: '页面由 pages.json 声明，不引入 vue-router；页面文件保持薄入口，业务放到 modules。',
    },
    http: {
      title: 'uni.request 封装',
      desc: '接口调用走 modules/api -> common/api -> libs/http，统一处理 token、语言、错误和取消。',
    },
    platform: {
      title: '平台 API',
      desc: '交互使用 uni.showToast、uni.showModal、uni.setClipboardData 等跨端 API。',
    },
  },
  runtime: {
    title: '运行时演示',
    description: '语言、Pinia 状态和请求封装都在模块内演示，页面入口不承载业务细节。',
    tabs: {
      i18n: 'i18n',
      state: 'State',
      request: 'Request',
    },
    panels: {
      i18n: {
        title: '模块化 i18n',
        description: '根 locales 自动聚合 modules/demo/locales，组件只通过 demo 命名空间取文案。',
      },
      state: {
        title: 'Pinia 状态',
        description: '状态、loading 和错误收敛在模块 store，组件只触发 action。',
      },
      request: {
        title: '请求封装',
        description:
          '接口调用从 modules/demo/api 进入 common/api，再落到 libs/http 的 uni.request 封装。',
      },
    },
    i18nMeta: '切换底部语言抽屉可以看到模块文案即时更新。',
    stateIdle: '当前还没有加载接口数据。',
    stateReady: '接口数据已进入 Pinia store。',
    requestMeta: '点击加载接口示例会调用 demo store 的 loadInfo action。',
  },
  request: {
    button: '加载接口示例',
    successTitle: '请求成功',
  },
  platform: {
    button: '打开平台弹窗',
    title: '平台 API',
    content: '这个弹窗由 uni.showModal 打开，可在 H5、小程序和 App 中保持一致的调用方式。',
  },
  structure: {
    title: '目录结构',
    description: '按高内聚、低耦合组织 demo，页面入口只负责承载模块。',
    pages: 'uni-app 页面入口，保持 import + render 的薄层。',
    components: 'demo 自己的展示组件，只服务当前模块。',
    api: 'demo 模块接口函数，调用 common/api 默认实例。',
    stores: 'demo 模块 Pinia store，封装 loading、error 和 action。',
    locales: 'demo 模块文案，自动聚合到根 i18n。',
    http: '跨模块基础设施，基于 uni.request 封装。',
  },
  language: {
    title: '语言',
    description: '模块文案自动聚合',
    changed: '语言已切换',
  },
  docs: {
    title: '模板说明',
    content:
      'uniapp-template 使用 pages.json 路由、modules 自治模块、uni.request HTTP 封装和 uni API。样式优先使用 scss + rpx，避免 Tailwind 在小程序和 App 端的兼容成本。',
  },
};
