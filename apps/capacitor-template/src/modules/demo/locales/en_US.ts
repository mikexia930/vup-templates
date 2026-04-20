export default {
  layout: {
    title: 'Capacitor Template Demo',
    subtitle: 'A Capacitor-based mobile app template with native iOS/Android packaging support.',
    tabs: {
      example: 'Example',
      guide: 'Guide',
    },
  },
  guide: {
    title: 'Usage Guide',
    intro: 'Run the mobile workflow first, then extend business modules incrementally.',
    quickStart: {
      title: 'Quick Start',
      items: {
        android: 'pnpm android:add',
        dev: 'pnpm dev',
        ios: 'pnpm ios:add',
        sync: 'pnpm android:build',
      },
    },
    structure: {
      title: 'Recommended Structure',
      tree: `src/
├── api/
│   ├── request.ts
│   └── types.ts
├── locales/
├── modules/
│   └── demo/
│       ├── views/
│       ├── components/
│       ├── stores/
│       ├── api/
│       ├── types/
│       └── locales/
└── router/`,
    },
  },
  example: {
    title: 'Minimal Business Example',
    description:
      'Use a mobile task list to demonstrate module boundaries, filtering, and status transitions.',
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
        description: 'Task list is loading from module API mocks.',
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
          title: 'src/modules/demo/views/DemoExamplePage.vue',
          description: 'Compose page sections and connect store state with component events.',
        },
        component: {
          title: 'src/modules/demo/components/DemoTaskBoard.vue',
          description: 'Render mobile interaction UI and emit user actions upward.',
        },
        store: {
          title: 'src/modules/demo/stores/useDemoTaskStore.ts',
          description: 'Handle state, filtering, async loading, and task status transitions.',
        },
        api: {
          title: 'src/modules/demo/api/task.ts',
          description: 'Define module API functions close to business context.',
        },
        types: {
          title: 'src/modules/demo/types/task.ts',
          description: 'Provide task model and stats typings for module reuse.',
        },
      },
    },
  },
};
