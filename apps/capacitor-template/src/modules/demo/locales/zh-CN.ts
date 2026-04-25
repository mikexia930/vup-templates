export default {
  layout: {
    closeMenu: '关闭菜单',
    menu: '打开菜单',
    nav: {
      features: '核心特性',
      overview: '模板概览',
      quickstart: '快速开始',
      runtime: '运行时演示',
      structure: '目录结构',
    },
    title: 'Capacitor Template',
    subtitle: '移动端应用模板能力演示',
  },
  hero: {
    badge: 'Mobile Ready',
    description:
      '基于 Capacitor + Vue 3 的移动端模板。保留 Web 开发体验，同时对齐 iOS / Android 真机工作流。',
    primaryAction: '复制启动命令',
    secondaryAction: '查看文档',
    title: 'Capacitor App Template',
  },
  quickstart: {
    description: '先跑通 Web 预览，再同步到原生工程。',
    items: {
      android: {
        command: 'pnpm android',
        description: '构建并打开 Android 工程',
        title: 'Android 调试',
      },
      dev: {
        command: 'pnpm dev',
        description: '启动本地移动端预览',
        title: 'Web 预览',
      },
      ios: {
        command: 'pnpm ios',
        description: '构建并打开 iOS 工程',
        title: 'iOS 调试',
      },
      sync: {
        command: 'pnpm build && npx cap sync',
        description: '同步 Web 产物到原生工程',
        title: '同步原生',
      },
    },
    title: '快速开始',
  },
  features: {
    description: '展示移动端模板真正需要保留的能力。',
    items: {
      capacitor: 'Capacitor 负责 iOS / Android 原生工程同步、构建与打开。',
      module: 'demo 自身按 views / components / stores / api / types / locales 分层。',
      safeArea: '页面留出安全区与底部间距，适配刘海屏、圆角屏和系统手势。',
      ui: 'demo 本身不依赖 UI 组件库；真实业务需要移动端组件时，可接入 @vup/ui-mobile。',
    },
    titles: {
      capacitor: '原生工作流',
      module: '模块化结构',
      safeArea: '安全区适配',
      ui: '可选 UI 层',
    },
    title: '核心特性',
  },
  structure: {
    description: '接口契约类型跟 api 走，模块 types 只放跨层共享类型。',
    title: '目录结构',
  },
  runtime: {
    counter: {
      history: '操作记录：{history}',
      none: '暂无',
      reset: '重置',
    },
    description: '用移动端控件展示 i18n、Pinia 状态和 API 分层。',
    http: {
      action: '发起请求',
      loading: '请求中...',
      owner: '负责人',
      requestLine: 'GET /api/mobile/tasks',
      status: '状态',
      task: '任务',
      time: '耗时 {duration}ms',
    },
    i18n: {
      current: '当前语言：中文 (zh-CN)',
      description: '模块文案跟模块走，根语言包只聚合全局公共文案。',
      title: '欢迎使用 Capacitor Template',
    },
    tabs: {
      http: '请求',
      i18n: '文案',
      state: '状态',
    },
    title: '运行时演示',
  },
};
