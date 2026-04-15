<script setup lang="ts">
import type {
  DemoTask,
  DemoTaskFilter,
  DemoTaskPriority,
  DemoTaskStats,
  DemoTaskStatus,
} from '~/stores/demo';

defineProps<{
  errorMessage: string;
  isEmpty: boolean;
  keyword: string;
  listLoading: boolean;
  stats: DemoTaskStats;
  statusFilter: DemoTaskFilter;
  tasks: DemoTask[];
  updatingTaskIds: number[];
}>();

const emit = defineEmits<{
  filterChange: [value: DemoTaskFilter];
  keywordChange: [value: string];
  reload: [];
  resetFilters: [];
  simulateError: [];
  toggleStatus: [task: DemoTask];
}>();

const { t } = useI18n();

const filterOptions: Array<{ labelKey: string; value: DemoTaskFilter }> = [
  { labelKey: 'all', value: 'all' },
  { labelKey: 'pending', value: 'pending' },
  { labelKey: 'inProgress', value: 'in_progress' },
  { labelKey: 'done', value: 'done' },
];

function getPriorityType(priority: DemoTaskPriority) {
  const typeMap: Record<DemoTaskPriority, '' | 'danger' | 'info' | 'success' | 'warning'> = {
    high: 'danger',
    low: 'info',
    medium: 'warning',
  };

  return typeMap[priority];
}

function getStatusType(status: DemoTaskStatus) {
  const typeMap: Record<DemoTaskStatus, '' | 'danger' | 'info' | 'success' | 'warning'> = {
    done: 'success',
    in_progress: 'warning',
    pending: 'info',
  };

  return typeMap[status];
}

function getStatusLabel(status: DemoTaskStatus) {
  const keyMap: Record<DemoTaskStatus, string> = {
    done: 'done',
    in_progress: 'inProgress',
    pending: 'pending',
  };

  return t(`demo.example.status.${keyMap[status]}`);
}

function isTaskUpdating(taskId: DemoTask['id'], ids: number[]) {
  return ids.includes(taskId);
}
</script>

<template>
  <section class="grid gap-4">
    <div class="grid gap-3 xl:grid-cols-[1fr_auto] xl:items-start">
      <div class="grid gap-3">
        <ElInput
          :model-value="keyword"
          clearable
          :placeholder="t('demo.example.searchPlaceholder')"
          @update:model-value="emit('keywordChange', String($event ?? ''))"
        />

        <div class="flex flex-wrap gap-2">
          <ElButton
            v-for="option in filterOptions"
            :key="option.value"
            :plain="statusFilter !== option.value"
            :type="statusFilter === option.value ? 'primary' : 'default'"
            @click="emit('filterChange', option.value)"
          >
            {{ t(`demo.example.filters.${option.labelKey}`) }}
          </ElButton>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <ElButton plain @click="emit('reload')">
          {{ t('demo.example.actions.reload') }}
        </ElButton>
        <ElButton plain @click="emit('simulateError')">
          {{ t('demo.example.actions.simulateError') }}
        </ElButton>
      </div>
    </div>

    <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <ElCard shadow="never">
        <div class="text-xs text-slate-500">{{ t('demo.example.stats.total') }}</div>
        <div class="mt-1 text-2xl font-semibold text-slate-900">{{ stats.total }}</div>
      </ElCard>
      <ElCard shadow="never">
        <div class="text-xs text-slate-500">{{ t('demo.example.stats.pending') }}</div>
        <div class="mt-1 text-2xl font-semibold text-slate-900">{{ stats.pending }}</div>
      </ElCard>
      <ElCard shadow="never">
        <div class="text-xs text-slate-500">{{ t('demo.example.stats.inProgress') }}</div>
        <div class="mt-1 text-2xl font-semibold text-slate-900">{{ stats.inProgress }}</div>
      </ElCard>
      <ElCard shadow="never">
        <div class="text-xs text-slate-500">{{ t('demo.example.stats.done') }}</div>
        <div class="mt-1 text-2xl font-semibold text-slate-900">{{ stats.done }}</div>
      </ElCard>
    </div>

    <ElCard v-if="listLoading" shadow="never">
      <ElAlert :title="t('demo.example.state.loading.title')" type="info" :closable="false">
        {{ t('demo.example.state.loading.description') }}
      </ElAlert>
    </ElCard>

    <ElCard v-else-if="errorMessage" shadow="never" class="grid gap-3">
      <ElAlert
        :title="t('demo.example.state.error.title')"
        type="error"
        :description="errorMessage"
        :closable="false"
      />
      <div>
        <ElButton type="primary" @click="emit('reload')">
          {{ t('demo.example.actions.retry') }}
        </ElButton>
      </div>
    </ElCard>

    <ElCard v-else-if="isEmpty" shadow="never" class="grid gap-3">
      <ElEmpty :description="t('demo.example.state.empty.description')" />
      <div>
        <ElButton type="primary" @click="emit('resetFilters')">
          {{ t('demo.example.actions.resetFilters') }}
        </ElButton>
      </div>
    </ElCard>

    <ElCard v-else shadow="never">
      <ElTable :data="tasks" stripe>
        <ElTableColumn prop="title" min-width="320" :label="t('demo.example.fields.title')">
          <template #default="{ row }">
            <div class="grid gap-2">
              <div class="font-medium text-slate-900">{{ row.title }}</div>
              <div class="text-sm text-slate-600">{{ row.summary }}</div>
              <div class="flex flex-wrap gap-1">
                <ElTag :type="getStatusType(row.status)" effect="light">
                  {{ getStatusLabel(row.status) }}
                </ElTag>
                <ElTag :type="getPriorityType(row.priority)" effect="light">
                  {{ t(`demo.example.priority.${row.priority}`) }}
                </ElTag>
              </div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn min-width="180" :label="t('demo.example.fields.owner')">
          <template #default="{ row }">
            <div class="text-sm text-slate-700">{{ row.owner }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn min-width="220" :label="t('demo.example.fields.updatedAt')">
          <template #default="{ row }">
            <div class="text-sm text-slate-700">{{ row.updatedAt }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn min-width="240" :label="t('demo.example.fields.tags')">
          <template #default="{ row }">
            <div class="flex flex-wrap gap-1">
              <ElTag
                v-for="tag in row.tags.length ? row.tags : [t('demo.example.fields.noTags')]"
                :key="tag"
                effect="plain"
              >
                {{ tag }}
              </ElTag>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn width="180" :label="t('demo.example.fields.actions')" fixed="right">
          <template #default="{ row }">
            <ElButton
              :disabled="isTaskUpdating(row.id, updatingTaskIds)"
              size="small"
              type="primary"
              @click="emit('toggleStatus', row)"
            >
              {{
                isTaskUpdating(row.id, updatingTaskIds)
                  ? t('demo.example.actions.updating')
                  : row.status === 'done'
                    ? t('demo.example.actions.reopen')
                    : t('demo.example.actions.markDone')
              }}
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
  </section>
</template>
