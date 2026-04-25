export default {
  nav: {
    features: 'Features',
    quickstart: 'Quick Start',
    runtime: 'Demo',
    structure: 'Structure',
  },
  hero: {
    badge: 'Production Ready',
    copyCommand: 'Copy Start Command',
    description:
      'An enterprise-grade SPA template built with Vue 3, Vite, and TypeScript. Modular structure, type safety, and ready-to-use defaults.',
    structure: 'View Structure',
    title: 'Vue SPA Template',
  },
  quickstart: {
    description: 'Start the project in four steps.',
    items: {
      build: {
        description: 'Build production assets',
        title: 'Production Build',
      },
      dev: {
        description: 'Start the dev server on port 9301',
        title: 'Development Mode',
      },
      install: {
        description: 'Install dependencies with pnpm',
        title: 'Install Dependencies',
      },
      lint: {
        description: 'Run ESLint checks',
        title: 'Code Linting',
      },
    },
    title: 'Quick Start',
  },
  features: {
    description: 'The core capabilities commonly needed by enterprise SPA projects.',
    items: {
      http: 'Three-layer HTTP structure: @vup/http shared layer, src/api app adapter, and modules/api business APIs.',
      i18n: 'Module locale files are collected automatically, so new modules need no manual registration.',
      module:
        'Self-contained modules keep UI, store, API, types, and locales close to the feature.',
      ts: 'Typed boundaries from routes to API calls reduce runtime surprises.',
      ui: 'Unified V* components from vup-ui keep the experience consistent across templates.',
      vite: 'Composition API plus Vite HMR keeps development fast and focused.',
    },
    titles: {
      http: 'Three-Layer HTTP',
      i18n: 'Auto i18n Merge',
      module: 'Modular Architecture',
      ts: 'TypeScript',
      ui: 'vup-ui Components',
      vite: 'Vue 3 + Vite',
    },
    title: 'Core Features',
  },
  structure: {
    description:
      'Keep infrastructure at the src root and group business capabilities by module. This demo follows the same structure.',
    layers: {
      base: {
        badge: 'Infrastructure',
        directory: 'api/',
        responsibility: 'HTTP request adapter based on @vup/http',
      },
      common: {
        badge: 'Shared App',
        directory: 'router/ · locales/',
        responsibility: 'Route config and global i18n resources',
      },
      module: {
        badge: 'Business Module',
        directory: 'modules/*/',
        responsibility: 'Self-contained views, components, stores, api, types, and locales',
      },
      page: {
        badge: 'Entry Layer',
        directory: 'views/ · App.vue · main.ts',
        responsibility: 'Application entry, shared pages, and root component',
      },
    },
    table: {
      directory: 'Directory',
      layer: 'Layer',
      responsibility: 'Responsibility',
    },
    title: 'Directory Structure',
  },
  runtime: {
    counter: {
      history: 'History: {history}',
      none: 'None',
      reset: 'Reset',
    },
    description: 'Small interactions showing i18n, state management, and request layering.',
    http: {
      action: 'Send Request',
      loading: 'Requesting...',
      owner: 'Owner',
      requestLine: 'GET /api/tasks',
      status: 'Status',
      task: 'Task',
      time: '{duration}ms',
    },
    i18n: {
      current: 'Current language: English (en-US)',
      description:
        'An enterprise-grade SPA template built with Vue 3. It provides modular architecture, type safety, and an out-of-the-box development experience.',
      title: 'Welcome to Vue SPA Template',
    },
    tabs: {
      http: 'HTTP Request',
      i18n: 'i18n Switch',
      state: 'State Management',
    },
    title: 'Runtime Demo',
  },
  footer: {
    license: 'Released under the MIT License.',
    stack: 'Vue 3 · Vite · TypeScript · @vup/ui',
  },
  common: {
    copied: 'Copied to clipboard',
    copy: 'Copy',
    copiedShort: 'Copied',
  },
};
