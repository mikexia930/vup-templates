export default {
  layout: {
    title: 'Electron Template',
    nav: {
      overview: 'Overview',
      quickstart: 'Quick Start',
      features: 'Features',
      structure: 'Structure',
      runtime: 'Runtime',
    },
  },
  hero: {
    badge: 'Desktop Ready',
    title: 'Electron\nApp Template',
    description:
      'A desktop template built with Electron Forge, Vue 3, and Vite. It keeps the Web development experience while showing main process, preload bridge, renderer, and module layering.',
    primaryAction: 'View Workflow',
    secondaryAction: 'View Structure',
    previewTitle: 'Desktop Engineering',
  },
  quickstart: {
    title: 'Quick Start',
    description: 'Run the development window first, then make installers for your target platform.',
    items: {
      dev: {
        title: 'Development',
        description: 'Start the Electron Forge development environment.',
        command: 'pnpm dev',
      },
      build: {
        title: 'Package App',
        description: 'Build Electron application output.',
        command: 'pnpm build',
      },
      make: {
        title: 'Make Installer',
        description: 'Create Windows, macOS, or Linux installers.',
        command: 'pnpm make',
      },
      package: {
        title: 'Publish',
        description: 'Publish artifacts using Forge configuration.',
        command: 'pnpm publish',
      },
    },
  },
  features: {
    title: 'Core Features',
    description:
      'The desktop engineering capabilities this Electron template should actually show.',
    items: {
      process: {
        title: 'Process Split',
        description:
          'The main process owns windows and native capabilities; the renderer owns the Vue app.',
      },
      preload: {
        title: 'Safe Bridge',
        description:
          'Expose limited APIs through preload and contextBridge instead of direct Electron access.',
      },
      router: {
        title: 'Hash Router',
        description: 'Hash routing works reliably with file protocol and packaged desktop builds.',
      },
      module: {
        title: 'Module Layers',
        description: 'The demo is split into views, components, stores, api, types, and locales.',
      },
    },
  },
  structure: {
    title: 'Directory Structure',
    description:
      'The Electron template contains main process, preload script, and renderer modules.',
  },
  runtime: {
    title: 'Runtime Demo',
    description: 'A compact runtime panel showing preload bridge, Pinia state, and i18n.',
    tabs: {
      bridge: 'Bridge',
      state: 'State',
      i18n: 'Language',
    },
    bridge: {
      action: 'Read Runtime Info',
      loading: 'Loading...',
      empty: 'No runtime info yet.',
    },
    state: {
      reset: 'Reset',
      empty: 'No history',
      history: 'Recent values: {history}',
    },
    i18n: {
      title: 'Modular Locales',
      description:
        'Root locales aggregate modules/*/locales automatically, so new modules need no manual registration.',
    },
  },
};
