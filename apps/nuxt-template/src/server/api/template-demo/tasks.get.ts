const tasks = [
  {
    id: 1,
    title: 'Define project structure',
    summary: 'Keep Nuxt conventions while separating API, state, and UI blocks.',
    owner: 'Alice',
    status: 'done',
    priority: 'high',
    updatedAt: '2026-01-12',
    tags: ['nuxt', 'structure'],
  },
  {
    id: 2,
    title: 'Wire runtime state',
    summary: 'Use Pinia for local interaction state in the demo page.',
    owner: 'Bob',
    status: 'in_progress',
    priority: 'medium',
    updatedAt: '2026-01-14',
    tags: ['pinia', 'state'],
  },
  {
    id: 3,
    title: 'Prepare API layer',
    summary: 'Route demo requests through the app request adapter.',
    owner: 'Carol',
    status: 'pending',
    priority: 'medium',
    updatedAt: '2026-01-15',
    tags: ['api', 'ofetch'],
  },
];

export default defineEventHandler(() => ({
  code: 0,
  message: 'ok',
  data: tasks,
}));
