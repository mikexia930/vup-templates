export default {
  layout: {
    title: 'Electron Template Demo',
    description:
      'This demo focuses on desktop onboarding: modular directory, request layering, and a minimal business sample.',
    tabs: {
      guide: 'Guide',
      example: 'Example',
    },
  },
  guide: {
    quickStart: {
      title: 'Quick Start Commands',
      items: {
        dev: { description: 'Start Electron development mode with hot reload.' },
        build: { description: 'Package the app for local verification.' },
        make: { description: 'Build distributable installers for each platform.' },
        lint: { description: 'Run lint checks before commit.' },
      },
    },
    firstEdit: {
      title: 'Recommended First Edit Locations',
      items: {
        main: 'Renderer bootstrap and global plugin registration.',
        router: 'Demo route entrance and redirect rules.',
        module: 'Business-facing demo module with isolated responsibilities.',
        locales: 'Global locale merge and fallback strategy.',
        request: 'App-side request adapter based on @vup/http.',
      },
    },
    readOrder: {
      title: 'Suggested Read Order',
      items: {
        step1: 'Open src/renderer/router/routes.ts to understand route entry.',
        step2: 'Read src/renderer/modules/demo/views to know page composition.',
        step3: 'Read src/renderer/modules/demo/stores for state modeling.',
        step4: 'Read src/renderer/modules/demo/api for API boundary examples.',
        step5: 'Read src/renderer/api/request.ts for app-side request adaptation.',
      },
    },
  },
  example: {
    title: 'Minimal Business Example',
    description:
      'A task board demo that shows status flow, filtering, and module responsibility boundaries.',
    searchPlaceholder: 'Search by title, summary, or tag',
    filters: {
      all: 'All',
      pending: 'Pending',
      inProgress: 'In Progress',
      done: 'Done',
    },
    status: {
      pending: 'Pending',
      inProgress: 'In Progress',
      done: 'Done',
    },
    priority: {
      low: 'Low Priority',
      medium: 'Medium Priority',
      high: 'High Priority',
    },
    actions: {
      reload: 'Reload',
      retry: 'Retry',
      simulateError: 'Simulate Error',
      resetFilters: 'Reset Filters',
      markDone: 'Mark Done',
      reopen: 'Reopen',
      updating: 'Updating...',
    },
    fields: {
      title: 'Task',
      owner: 'Owner',
      updatedAt: 'Updated At',
      tags: 'Tags',
      noTags: 'No tags',
      actions: 'Actions',
    },
    stats: {
      total: 'Total',
      pending: 'Pending',
      inProgress: 'In Progress',
      done: 'Done',
    },
    state: {
      loading: {
        title: 'Loading Demo Data',
        description: 'Task list is being loaded from local demo data source.',
      },
      error: {
        title: 'Request Failed',
      },
      empty: {
        description: 'No tasks match current filters. Try reset filters.',
      },
    },
    fileMap: {
      title: 'File Responsibility Map',
      items: {
        page: {
          title: 'modules/demo/views/DemoExamplePage.vue',
          description: 'Compose page sections and connect store state to UI components.',
        },
        component: {
          title: 'modules/demo/components/DemoTaskBoard.vue',
          description: 'Render interaction UI and expose events for page/store coordination.',
        },
        store: {
          title: 'modules/demo/stores/useDemoTaskStore.ts',
          description: 'Handle state, filtering, async loading, and task status transitions.',
        },
        api: {
          title: 'modules/demo/api/taskService.ts',
          description: 'Keep module-level API functions close to business context.',
        },
        types: {
          title: 'modules/demo/types/task.ts',
          description: 'Centralize task model definitions for component/store/api reuse.',
        },
      },
    },
  },
};
