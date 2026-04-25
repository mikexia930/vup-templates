export default {
  layout: {
    title: 'Electron Template',
    nav: {
      overview: '概览',
      quickstart: '快速开始',
      features: '核心能力',
      structure: '目录结构',
      runtime: '运行时',
    },
  },
  hero: {
    badge: 'Desktop Ready',
    title: 'Electron\n桌面应用模板',
    description:
      '基于 Electron Forge + Vue 3 + Vite 的桌面端模板。保留 Web 开发体验，同时展示主进程、预加载桥接、渲染进程和模块化分层。',
    primaryAction: '查看工作流',
    secondaryAction: '查看目录',
    previewTitle: '桌面端工程能力',
  },
  quickstart: {
    title: '快速开始',
    description: '先跑开发窗口，再按目标平台制作安装包。',
    items: {
      dev: {
        title: '开发模式',
        description: '启动 Electron Forge 开发环境。',
        command: 'pnpm dev',
      },
      build: {
        title: '应用打包',
        description: '构建 Electron 应用产物。',
        command: 'pnpm build',
      },
      make: {
        title: '制作安装包',
        description: '生成 Windows / macOS / Linux 安装包。',
        command: 'pnpm make',
      },
      package: {
        title: '发布流程',
        description: '按 Forge 配置发布构建产物。',
        command: 'pnpm publish',
      },
    },
  },
  features: {
    title: '核心能力',
    description: '展示 Electron 模板真正需要保留的桌面端工程能力。',
    items: {
      process: {
        title: '进程分层',
        description: '主进程负责窗口和原生能力，渲染进程负责 Vue 应用体验。',
      },
      preload: {
        title: '安全桥接',
        description: '通过 preload + contextBridge 暴露有限 API，避免渲染进程直接访问 Electron。',
      },
      router: {
        title: 'Hash 路由',
        description: '桌面文件协议和打包环境下使用 Hash 路由，避免刷新和深链路径问题。',
      },
      module: {
        title: '模块化分层',
        description: 'demo 按 views / components / stores / api / types / locales 拆分。',
      },
    },
  },
  structure: {
    title: '目录结构',
    description: 'Electron 模板同时包含主进程、预加载脚本和渲染进程业务模块。',
  },
  runtime: {
    title: '运行时演示',
    description: '用一个小型运行时面板展示 preload 桥接、Pinia 状态和 i18n。',
    tabs: {
      bridge: '桥接',
      state: '状态',
      i18n: '语言',
    },
    bridge: {
      action: '读取运行时信息',
      loading: '读取中...',
      empty: '暂无运行时信息。',
    },
    state: {
      reset: '重置',
      empty: '暂无记录',
      history: '最近记录：{history}',
    },
    i18n: {
      title: '模块化语言包',
      description: '根语言包自动聚合 modules/*/locales，新增模块不需要手动注册。',
    },
  },
};
