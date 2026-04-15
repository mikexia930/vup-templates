export default {
  layout: {
    badge: 'Vue SPA Template Demo',
    description:
      'Treat the demo as the template handbook: explain how to start first, then show the recommended code organization with a minimal real example.',
    features: {
      guide: 'Clear onboarding path',
      module: 'Business logic grouped by module',
      qiankun: 'Keeps qiankun compatibility entry',
    },
    scenarios: {
      admin: 'Fits admin panels, dashboards, and enterprise SPA projects',
      module: 'Create a new module first when adding business features',
      optional: 'qiankun-related code can be kept or removed as needed',
    },
    tabs: {
      example: 'Best Practice Example',
      guide: 'Usage Guide',
    },
    title: 'Help users and AI understand the Vue template fast',
  },
  guide: {
    cleanup: {
      items: {
        legacy: 'Before building real features, remove template-only demo code you no longer need.',
        locales:
          'Module-specific messages stay with the module, while root locales keep only shared text.',
        request:
          'Keep the base request layer in src/api and place module-specific API functions in modules/demo/api.',
        structure:
          'Global stores should hold app-level state only. Business stores should not live under views.',
      },
      title: 'Implementation Checklist',
    },
    firstEdit: {
      description:
        'When you first take over the template, start from these locations. They are the highest-value changes with the lowest cost.',
      items: {
        locales: 'Adjust shared app messages and extend module-specific locale files in place.',
        main: 'Review the application entry, plugin registration, and qiankun compatibility logic.',
        module: 'Use modules/demo as the sample when you create a new business module.',
        request: 'Complete the base request layer and centralize shared response handling.',
        router: 'Start here whenever you add, remove, or reorganize routes.',
      },
      title: 'Files To Read First',
    },
    quickStart: {
      description:
        'Every command here matches the current package.json so the page never drifts from the real template.',
      items: {
        build: {
          command: 'pnpm build',
          description: 'Build the production bundle into the .output directory.',
          title: 'Production Build',
        },
        dev: {
          command: 'pnpm dev',
          description: 'Start local development at http://localhost:9301.',
          title: 'Run Locally',
        },
        install: {
          command: 'pnpm install',
          description: 'Install dependencies before the first run.',
          title: 'Install Dependencies',
        },
        lint: {
          command: 'pnpm lint',
          description: 'Check code structure, syntax, and style before committing.',
          title: 'Code Linting',
        },
      },
      title: 'Quick Start',
    },
    readOrder: {
      items: {
        step1: 'Start from main.ts to understand the app entry and plugin wiring.',
        step2: 'Move to router/routes.ts to confirm page entry points and URLs.',
        step3: 'Open modules/demo/views to learn how layout and pages split responsibilities.',
        step4: 'Continue to stores, api, and types to learn state, data, and type boundaries.',
        step5: 'Extend locales last so your own messages follow the same module structure.',
      },
      title: 'Recommended Reading Order',
    },
    structure: {
      description:
        'Keep infrastructure at the src root and group business logic inside modules. This improves both team collaboration and AI learning quality.',
      items: {
        base: 'Keep src/api, src/locales, and src/router as shared application infrastructure.',
        module: 'Group views, components, store, api, types, and locales inside modules/demo.',
        shared: 'Only move code into shared when it is truly reused across modules.',
      },
      rules: {
        moduleApi:
          'Module-specific request functions stay with the module instead of spreading across global folders.',
        moduleLocales:
          'Module-specific messages stay with the module so root locales do not become a dumping ground.',
        moduleStore:
          'Business stores stay with the module. Avoid misleading patterns like views/demo/stores.',
        optional:
          'qiankun compatibility belongs to platform capability and can be removed when not needed.',
      },
      title: 'Recommended Directory Structure',
      treeTitle: 'Current demo directory as the standard sample',
    },
    title: 'Start Here To Learn How The Template Works',
  },
  example: {
    actions: {
      markDone: 'Mark Done',
      reload: 'Reload Data',
      reopen: 'Reopen',
      resetFilters: 'Reset Filters',
      retry: 'Retry',
      simulateError: 'Simulate Error',
      updating: 'Updating...',
    },
    description:
      'This example does not chase complex features. It focuses on the recommended split between page, store, api, types, and locales.',
    fields: {
      actions: 'Actions',
      noTags: 'No tags',
      owner: 'Owner',
      tags: 'Tags',
      updatedAt: 'Updated',
    },
    fileMap: {
      items: {
        api: {
          description:
            'Module-level data access entry. Replace this file when you connect a real backend.',
          title: 'modules/demo/api/taskService.ts',
        },
        component: {
          description: 'Handles list, filters, and state rendering without owning the data source.',
          title: 'modules/demo/components/DemoTaskBoard.vue',
        },
        page: {
          description: 'The page only arranges module content and triggers store loading.',
          title: 'modules/demo/views/DemoExamplePage.vue',
        },
        store: {
          description:
            'Centralizes loading, error, filters, and derived stats so state does not scatter across the page.',
          title: 'modules/demo/stores/useDemoTaskStore.ts',
        },
        types: {
          description:
            'Defines status, priority, and domain models so the example keeps clear type boundaries.',
          title: 'modules/demo/types/task.ts',
        },
      },
      title: 'Key Files Behind This Example',
    },
    filters: {
      all: 'All',
      done: 'Done',
      inProgress: 'In Progress',
      pending: 'Pending',
    },
    searchPlaceholder: 'Search tasks by title, summary, or tag',
    state: {
      empty: {
        description:
          'No result matches the current filters. Reset filters to view the full example again.',
        title: 'No matching task',
      },
      error: {
        description:
          'The error state is kept on purpose so you can verify how the page handles failed requests.',
        title: 'Example request failed',
      },
      loading: {
        description:
          'In real business pages, loading, empty, and error states should all be explicit.',
        title: 'Loading demo data',
      },
    },
    stats: {
      done: 'Done',
      inProgress: 'In Progress',
      pending: 'Pending',
      total: 'Total Tasks',
    },
    title: 'Minimal Realistic Example',
    priority: {
      high: 'High priority',
      low: 'Low priority',
      medium: 'Medium priority',
    },
    status: {
      done: 'Done',
      inProgress: 'In Progress',
      pending: 'Pending',
    },
  },
};
