export default {
  header: {
    title: 'UniApp Template',
    subtitle: 'Multi-platform app demo',
  },
  drawer: {
    title: 'Template Menu',
    routes: {
      title: 'Routing',
      desc: 'pages.json plus thin entries',
      content:
        'uni-app does not use vue-router. Pages are declared in pages.json, then pages/index/index.vue renders modules/demo.',
    },
    modules: {
      title: 'Module Boundary',
      desc: 'Components, messages, and data stay local',
      content:
        'Demo display data lives in modules/demo/common, display components live in modules/demo/components, and only shared capabilities move to src/common.',
    },
    platform: {
      title: 'Platform APIs',
      desc: 'Use uni APIs consistently',
      content:
        'Copy, modal, and toast interactions use uni APIs so browser-only APIs do not leak into mini programs or apps.',
    },
  },
  hero: {
    badge: 'Mobile Ready',
    title: 'UniApp App Template',
    description:
      'A uni-app + Vue 3 mobile template for H5, mini programs, and native app workflows, organized around uni-app platform constraints.',
  },
  actions: {
    copyStart: 'Copy Start Command',
    docs: 'View Docs',
    copySuccess: 'Copied',
    copyFallback: 'Copy manually',
    confirm: 'Got it',
  },
  quickstart: {
    title: 'Quick Start',
    description: 'Preview on H5 first, then move to mini program or app workflows.',
    h5: {
      title: 'H5 Preview',
      desc: 'Start the local mobile preview',
    },
    weixin: {
      title: 'WeChat Mini',
      desc: 'Build mini program artifacts',
    },
    app: {
      title: 'App Debug',
      desc: 'Enter the native app workflow',
    },
    build: {
      title: 'Production Build',
      desc: 'Build H5 production output',
    },
  },
  capabilities: {
    title: 'Core Features',
    description: 'The cross-platform capabilities this template should preserve.',
    pages: {
      title: 'pages.json Routing',
      desc: 'Routes are declared in pages.json without vue-router. Page files stay thin and render modules.',
    },
    http: {
      title: 'uni.request Layer',
      desc: 'Requests flow through modules/api, common/api, and libs/http for token, locale, error, and cancel handling.',
    },
    platform: {
      title: 'Platform APIs',
      desc: 'Interactions use uni.showToast, uni.showModal, and uni.setClipboardData for cross-platform behavior.',
    },
  },
  runtime: {
    title: 'Runtime Demo',
    description: 'i18n, Pinia state, and request handling live in the module, not the page entry.',
    tabs: {
      i18n: 'i18n',
      state: 'State',
      request: 'Request',
    },
    panels: {
      i18n: {
        title: 'Modular i18n',
        description:
          'Root locales aggregate modules/demo/locales automatically, while components read messages from the demo namespace.',
      },
      state: {
        title: 'Pinia State',
        description:
          'State, loading, and errors are kept inside the module store. Components only trigger actions.',
      },
      request: {
        title: 'Request Layer',
        description:
          'Requests flow from modules/demo/api into common/api, then down to the libs/http uni.request wrapper.',
      },
    },
    i18nMeta: 'Switch the bottom language drawer to see module messages update immediately.',
    stateIdle: 'No request data has been loaded yet.',
    stateReady: 'Request data is now stored in the Pinia module store.',
    requestMeta: 'Tap the request button to call the demo store loadInfo action.',
  },
  request: {
    button: 'Load Request Demo',
    successTitle: 'Request Success',
  },
  platform: {
    button: 'Open Modal',
    title: 'Platform API',
    content:
      'This modal is opened by uni.showModal and keeps the same calling style across H5, mini programs, and apps.',
  },
  structure: {
    title: 'Directory Structure',
    description:
      'A cohesive module with a thin page entry and shared infrastructure below common/libs.',
    pages: 'Thin uni-app page entry that imports and renders the module.',
    components: 'Demo-only components owned by this module.',
    api: 'Demo API functions calling the common/api client.',
    stores: 'Demo Pinia store with loading, error, and actions.',
    locales: 'Module messages automatically aggregated into root i18n.',
    http: 'Shared infrastructure built on uni.request.',
  },
  language: {
    title: 'Language',
    description: 'Module messages are aggregated',
    changed: 'Language switched',
  },
  docs: {
    title: 'Template Notes',
    content:
      'uniapp-template uses pages.json routing, autonomous modules, uni.request HTTP wrappers, and uni APIs. Styles prefer scss + rpx to avoid Tailwind compatibility cost across mini programs and apps.',
  },
};
