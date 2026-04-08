import { listDemoTasks, updateDemoTaskStatus } from '../api/taskService';
import type { DemoTask, DemoTaskFilter, DemoTaskStats } from '../types/task';

interface LoadDemoTasksOptions {
  forceError?: boolean;
}

function getNextStatus(status: DemoTask['status']): DemoTask['status'] {
  if (status === 'done') return 'pending';

  return 'done';
}

export const useDemoTaskStore = defineStore('demo-task', () => {
  const items = ref<DemoTask[]>([]);
  const keyword = ref('');
  const statusFilter = ref<DemoTaskFilter>('all');
  const isListLoading = ref(false);
  const updatingTaskIds = ref<number[]>([]);
  const errorMessage = ref('');
  const hasLoaded = ref(false);

  const filteredItems = computed(() => {
    const normalizedKeyword = keyword.value.trim().toLowerCase();

    return items.value.filter((item) => {
      const matchesStatus = statusFilter.value === 'all' || item.status === statusFilter.value;
      const matchesKeyword =
        !normalizedKeyword ||
        item.title.toLowerCase().includes(normalizedKeyword) ||
        item.summary.toLowerCase().includes(normalizedKeyword) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalizedKeyword));

      return matchesStatus && matchesKeyword;
    });
  });

  const stats = computed<DemoTaskStats>(() => ({
    done: items.value.filter((item) => item.status === 'done').length,
    inProgress: items.value.filter((item) => item.status === 'in_progress').length,
    pending: items.value.filter((item) => item.status === 'pending').length,
    total: items.value.length,
  }));

  const isEmpty = computed(
    () => !isListLoading.value && !errorMessage.value && filteredItems.value.length === 0
  );

  const isUpdatingAnyTask = computed(() => updatingTaskIds.value.length > 0);

  async function loadTasks(options: LoadDemoTasksOptions = {}) {
    isListLoading.value = true;
    errorMessage.value = '';

    try {
      items.value = await listDemoTasks(options);
      hasLoaded.value = true;
    } catch (error) {
      items.value = [];
      errorMessage.value = error instanceof Error ? error.message : '示例任务加载失败。';
    } finally {
      isListLoading.value = false;
    }
  }

  async function toggleTaskStatus(task: DemoTask) {
    if (updatingTaskIds.value.includes(task.id)) return;

    updatingTaskIds.value = [...updatingTaskIds.value, task.id];

    try {
      const updatedTask = await updateDemoTaskStatus(task.id, getNextStatus(task.status));
      items.value = items.value.map((item) => (item.id === updatedTask.id ? updatedTask : item));
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : '更新任务状态失败。';
    } finally {
      updatingTaskIds.value = updatingTaskIds.value.filter((id) => id !== task.id);
    }
  }

  function resetFilters() {
    keyword.value = '';
    statusFilter.value = 'all';
  }

  function setKeyword(value: string) {
    keyword.value = value;
  }

  function setStatusFilter(value: DemoTaskFilter) {
    statusFilter.value = value;
  }

  return {
    errorMessage,
    filteredItems,
    hasLoaded,
    isEmpty,
    items,
    keyword,
    isListLoading,
    loadTasks,
    isUpdatingAnyTask,
    resetFilters,
    setKeyword,
    setStatusFilter,
    stats,
    statusFilter,
    toggleTaskStatus,
    updatingTaskIds,
  };
});
