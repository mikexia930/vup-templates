<script setup lang="ts">
import type {
  DemoTask,
  DemoTaskFilter,
  DemoTaskPriority,
  DemoTaskStats,
  DemoTaskStatus,
} from '../types/task';

const props = defineProps<{
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
  toggleStatus: [task: DemoTask];
}>();

const { t } = useI18n();

const filterOptions: Array<{ labelKey: string; value: DemoTaskFilter }> = [
  { labelKey: 'all', value: 'all' },
  { labelKey: 'pending', value: 'pending' },
  { labelKey: 'inProgress', value: 'in_progress' },
  { labelKey: 'done', value: 'done' },
];

function getPriorityClass(priority: DemoTaskPriority) {
  const typeMap: Record<DemoTaskPriority, '' | 'danger' | 'info' | 'success' | 'warning'> = {
    high: 'danger',
    low: 'info',
    medium: 'warning',
  };

  return typeMap[priority];
}

function getPriorityLabel(priority: DemoTaskPriority) {
  const keyMap: Record<DemoTaskPriority, string> = {
    high: 'high',
    low: 'low',
    medium: 'medium',
  };

  return t(`demo.example.priority.${keyMap[priority]}`);
}

function getStatusClass(status: DemoTaskStatus) {
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

function isTaskUpdating(taskId: DemoTask['id']) {
  return props.updatingTaskIds.includes(taskId);
}
</script>

<template>
  <section class="grid gap-4">
    <div class="grid gap-3 xl:grid-cols-[1fr_auto] xl:items-start">
      <div class="grid gap-3">
        <VInput
          :model-value="keyword"
          clearable
          :placeholder="t('demo.example.searchPlaceholder')"
          @update:model-value="emit('keywordChange', String($event ?? ''))"
        />

        <div class="flex flex-wrap gap-2">
          <VButton
            v-for="option in filterOptions"
            :key="option.value"
            :plain="statusFilter !== option.value"
            :type="statusFilter === option.value ? 'primary' : 'default'"
            @click="emit('filterChange', option.value)"
          >
            {{ t(`demo.example.filters.${option.labelKey}`) }}
          </VButton>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <VButton plain @click="emit('reload')">
          {{ t('demo.example.actions.reload') }}
        </VButton>
      </div>
    </div>

    <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <VCard shadow="never">
        <div class="text-xs text-slate-500">{{ t('demo.example.stats.total') }}</div>
        <div class="mt-1 text-2xl font-semibold text-slate-900">{{ stats.total }}</div>
      </VCard>
      <VCard shadow="never">
        <div class="text-xs text-slate-500">{{ t('demo.example.stats.pending') }}</div>
        <div class="mt-1 text-2xl font-semibold text-slate-900">{{ stats.pending }}</div>
      </VCard>
      <VCard shadow="never">
        <div class="text-xs text-slate-500">{{ t('demo.example.stats.inProgress') }}</div>
        <div class="mt-1 text-2xl font-semibold text-slate-900">{{ stats.inProgress }}</div>
      </VCard>
      <VCard shadow="never">
        <div class="text-xs text-slate-500">{{ t('demo.example.stats.done') }}</div>
        <div class="mt-1 text-2xl font-semibold text-slate-900">{{ stats.done }}</div>
      </VCard>
    </div>

    <VCard v-if="listLoading" shadow="never">
      <VAlert :title="t('demo.example.state.loading.title')" type="info" :closable="false">
        {{ t('demo.example.state.loading.description') }}
      </VAlert>
    </VCard>

    <VCard v-else-if="errorMessage" shadow="never" class="grid gap-3">
      <VAlert
        :title="t('demo.example.state.error.title')"
        type="error"
        :description="errorMessage"
        :closable="false"
      />
      <div>
        <VButton type="primary" @click="emit('reload')">
          {{ t('demo.example.actions.retry') }}
        </VButton>
      </div>
    </VCard>

    <VCard v-else-if="isEmpty" shadow="never" class="grid gap-3">
      <VEmpty :description="t('demo.example.state.empty.description')" />
      <div>
        <VButton type="primary" @click="emit('resetFilters')">
          {{ t('demo.example.actions.resetFilters') }}
        </VButton>
      </div>
    </VCard>

    <VCard v-else shadow="never">
      <VTable :data="tasks" stripe>
        <VTableColumn
          prop="title"
          min-width="320"
          :label="t('demo.example.fileMap.items.component.title')"
        >
          <template #default="{ row }">
            <div class="grid gap-2">
              <div class="font-medium text-slate-900">{{ row.title }}</div>
              <div class="text-sm text-slate-600">{{ row.summary }}</div>
              <div class="flex flex-wrap gap-1">
                <VTag :type="getStatusClass(row.status)" effect="light">
                  {{ getStatusLabel(row.status) }}
                </VTag>
                <VTag :type="getPriorityClass(row.priority)" effect="light">
                  {{ getPriorityLabel(row.priority) }}
                </VTag>
              </div>
            </div>
          </template>
        </VTableColumn>

        <VTableColumn min-width="180" :label="t('demo.example.fields.owner')">
          <template #default="{ row }">
            <div class="text-sm text-slate-700">{{ row.owner }}</div>
          </template>
        </VTableColumn>

        <VTableColumn min-width="220" :label="t('demo.example.fields.updatedAt')">
          <template #default="{ row }">
            <div class="text-sm text-slate-700">{{ row.updatedAt }}</div>
          </template>
        </VTableColumn>

        <VTableColumn min-width="240" :label="t('demo.example.fields.tags')">
          <template #default="{ row }">
            <div class="flex flex-wrap gap-1">
              <VTag
                v-for="tag in row.tags.length ? row.tags : [t('demo.example.fields.noTags')]"
                :key="tag"
                effect="plain"
              >
                {{ tag }}
              </VTag>
            </div>
          </template>
        </VTableColumn>

        <VTableColumn width="180" :label="t('demo.example.fields.actions')" fixed="right">
          <template #default="{ row }">
            <VButton
              :disabled="isTaskUpdating(row.id)"
              size="small"
              type="primary"
              @click="emit('toggleStatus', row)"
            >
              {{
                isTaskUpdating(row.id)
                  ? t('demo.example.actions.updating')
                  : row.status === 'done'
                    ? t('demo.example.actions.reopen')
                    : t('demo.example.actions.markDone')
              }}
            </VButton>
          </template>
        </VTableColumn>
      </VTable>
    </VCard>
  </section>
</template>
