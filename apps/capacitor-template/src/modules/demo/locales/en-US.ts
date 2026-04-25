export default {
  layout: {
    closeMenu: 'Close menu',
    menu: 'Open menu',
    nav: {
      features: 'Core Features',
      overview: 'Overview',
      quickstart: 'Quick Start',
      runtime: 'Runtime Demo',
      structure: 'Structure',
    },
    title: 'Capacitor Template',
    subtitle: 'Mobile app template capability demo',
  },
  hero: {
    badge: 'Mobile Ready',
    description:
      'A mobile app template built with Capacitor and Vue 3. Keep the Web development experience while supporting iOS and Android workflows.',
    primaryAction: 'Copy Start Command',
    secondaryAction: 'View Docs',
    title: 'Capacitor App Template',
  },
  quickstart: {
    description: 'Preview locally first, then sync into native projects.',
    items: {
      android: {
        command: 'pnpm android',
        description: 'Build and open the Android project',
        title: 'Android Debug',
      },
      dev: {
        command: 'pnpm dev',
        description: 'Start the local mobile preview',
        title: 'Web Preview',
      },
      ios: {
        command: 'pnpm ios',
        description: 'Build and open the iOS project',
        title: 'iOS Debug',
      },
      sync: {
        command: 'pnpm build && npx cap sync',
        description: 'Sync Web assets into native projects',
        title: 'Native Sync',
      },
    },
    title: 'Quick Start',
  },
  features: {
    description: 'The capabilities this mobile template should actually show.',
    items: {
      capacitor: 'Capacitor handles iOS and Android project sync, build, and open flows.',
      module: 'The demo itself is split into views, components, stores, api, types, and locales.',
      safeArea:
        'Pages reserve safe-area and bottom spacing for notches, rounded screens, and gestures.',
      ui: 'The demo itself does not depend on a UI component library. Real apps can add @vup/ui-mobile when needed.',
    },
    titles: {
      capacitor: 'Native Workflow',
      module: 'Modular Structure',
      safeArea: 'Safe-Area Ready',
      ui: 'Optional UI Layer',
    },
    title: 'Core Features',
  },
  structure: {
    description:
      'API contract types stay under api. Module types only hold cross-layer shared types.',
    title: 'Directory Structure',
  },
  runtime: {
    counter: {
      history: 'History: {history}',
      none: 'None',
      reset: 'Reset',
    },
    description: 'Small mobile interactions showing i18n, Pinia state, and API layering.',
    http: {
      action: 'Send Request',
      loading: 'Requesting...',
      owner: 'Owner',
      requestLine: 'GET /api/mobile/tasks',
      status: 'Status',
      task: 'Task',
      time: '{duration}ms',
    },
    i18n: {
      current: 'Current language: English (en-US)',
      description:
        'Module messages stay with the module, while root locales aggregate shared app text.',
      title: 'Welcome to Capacitor Template',
    },
    tabs: {
      http: 'Request',
      i18n: 'i18n',
      state: 'State',
    },
    title: 'Runtime Demo',
  },
};
