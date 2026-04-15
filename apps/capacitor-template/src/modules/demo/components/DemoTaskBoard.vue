<script setup lang="ts">
import type { DemoTask, DemoTaskFilter, DemoTaskStats } from '../types/task';

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

function getStatusColor(status: DemoTask['status']) {
  const map: Record<DemoTask['status'], string> = {
    done: 'success',
    in_progress: 'warning',
    pending: 'medium',
  };
  return map[status];
}

function getPriorityColor(priority: DemoTask['priority']) {
  const map: Record<DemoTask['priority'], string> = {
    high: 'danger',
    low: 'primary',
    medium: 'warning',
  };
  return map[priority];
}

function getStatusLabel(status: DemoTask['status']) {
  const keyMap: Record<DemoTask['status'], string> = {
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
  <section class="grid gap-3">
    <VMSearchbar
      :value="keyword"
      :placeholder="t('demo.example.searchPlaceholder')"
      @ion-input="emit('keywordChange', String(($event.target as HTMLInputElement)?.value ?? ''))"
      @ion-clear="emit('keywordChange', '')"
    />

    <div class="flex flex-wrap gap-2">
      <VMButton
        v-for="option in filterOptions"
        :key="option.value"
        size="small"
        :fill="statusFilter === option.value ? 'solid' : 'outline'"
        @click="emit('filterChange', option.value)"
      >
        {{ t(`demo.example.filters.${option.labelKey}`) }}
      </VMButton>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <VMCard mode="ios">
        <VMCardContent>
          <p class="text-xs text-slate-500">{{ t('demo.example.stats.total') }}</p>
          <p class="text-xl font-semibold text-slate-900">{{ stats.total }}</p>
        </VMCardContent>
      </VMCard>
      <VMCard mode="ios">
        <VMCardContent>
          <p class="text-xs text-slate-500">{{ t('demo.example.stats.pending') }}</p>
          <p class="text-xl font-semibold text-slate-900">{{ stats.pending }}</p>
        </VMCardContent>
      </VMCard>
      <VMCard mode="ios">
        <VMCardContent>
          <p class="text-xs text-slate-500">{{ t('demo.example.stats.inProgress') }}</p>
          <p class="text-xl font-semibold text-slate-900">{{ stats.inProgress }}</p>
        </VMCardContent>
      </VMCard>
      <VMCard mode="ios">
        <VMCardContent>
          <p class="text-xs text-slate-500">{{ t('demo.example.stats.done') }}</p>
          <p class="text-xl font-semibold text-slate-900">{{ stats.done }}</p>
        </VMCardContent>
      </VMCard>
    </div>

    <VMCard v-if="listLoading" mode="ios">
      <VMCardContent class="flex items-center gap-2 text-sm text-slate-600">
        <VMSpinner name="crescent" />
        <span>{{ t('demo.example.state.loading.description') }}</span>
      </VMCardContent>
    </VMCard>

    <VMCard v-else-if="errorMessage" mode="ios">
      <VMCardContent class="grid gap-2">
        <p class="text-sm text-red-600">{{ t('demo.example.state.error.title') }}</p>
        <p class="text-xs text-slate-600">{{ errorMessage }}</p>
        <div class="flex gap-2">
          <VMButton size="small" @click="emit('reload')">
            {{ t('demo.example.actions.retry') }}
          </VMButton>
          <VMButton size="small" fill="outline" @click="emit('simulateError')">
            {{ t('demo.example.actions.simulateError') }}
          </VMButton>
        </div>
      </VMCardContent>
    </VMCard>

    <VMCard v-else-if="isEmpty" mode="ios">
      <VMCardContent class="grid gap-2">
        <p class="text-sm text-slate-600">{{ t('demo.example.state.empty.description') }}</p>
        <VMButton size="small" @click="emit('resetFilters')">
          {{ t('demo.example.actions.resetFilters') }}
        </VMButton>
      </VMCardContent>
    </VMCard>

    <VMList v-else inset lines="full">
      <VMItem v-for="task in tasks" :key="task.id" mode="ios">
        <VMLabel>
          <h3 class="font-medium text-slate-900">{{ task.title }}</h3>
          <p class="mt-1 text-xs text-slate-600">{{ task.summary }}</p>
          <div class="mt-2 flex flex-wrap items-center gap-1">
            <VMBadge :color="getStatusColor(task.status)">{{
              getStatusLabel(task.status)
            }}</VMBadge>
            <VMBadge :color="getPriorityColor(task.priority)">{{
              t(`demo.example.priority.${task.priority}`)
            }}</VMBadge>
          </div>
          <p class="mt-2 text-xs text-slate-500">
            {{ t('demo.example.fields.owner') }}: {{ task.owner }} ·
            {{ t('demo.example.fields.updatedAt') }}: {{ task.updatedAt }}
          </p>
        </VMLabel>
        <template #end>
          <VMButton
            size="small"
            :disabled="isTaskUpdating(task.id)"
            @click="emit('toggleStatus', task)"
          >
            {{
              isTaskUpdating(task.id)
                ? t('demo.example.actions.updating')
                : task.status === 'done'
                  ? t('demo.example.actions.reopen')
                  : t('demo.example.actions.markDone')
            }}
          </VMButton>
        </template>
      </VMItem>
    </VMList>
  </section>
</template>
