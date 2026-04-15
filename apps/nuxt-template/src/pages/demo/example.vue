<script setup lang="ts">
import { useDemoTaskStore } from '~/stores/demo';

const { t } = useI18n();
const demoTaskStore = useDemoTaskStore();

const fileMapKeys = ['page', 'component', 'store', 'api', 'types'] as const;

onMounted(() => {
  if (!demoTaskStore.hasLoaded) demoTaskStore.loadTasks();
});
</script>

<template>
  <div class="grid gap-4">
    <ElCard shadow="never">
      <template #header>
        <h2 class="text-xl font-semibold tracking-tight text-slate-900">
          {{ t('demo.example.title') }}
        </h2>
        <p class="mt-2 text-sm leading-relaxed text-slate-600">
          {{ t('demo.example.description') }}
        </p>
      </template>

      <DemoTaskBoard
        :error-message="demoTaskStore.errorMessage"
        :is-empty="demoTaskStore.isEmpty"
        :keyword="demoTaskStore.keyword"
        :list-loading="demoTaskStore.isListLoading"
        :stats="demoTaskStore.stats"
        :status-filter="demoTaskStore.statusFilter"
        :tasks="demoTaskStore.filteredItems"
        :updating-task-ids="demoTaskStore.updatingTaskIds"
        @filter-change="demoTaskStore.setStatusFilter"
        @keyword-change="demoTaskStore.setKeyword"
        @reload="demoTaskStore.loadTasks()"
        @reset-filters="demoTaskStore.resetFilters"
        @simulate-error="demoTaskStore.loadTasks({ forceError: true })"
        @toggle-status="demoTaskStore.toggleTaskStatus"
      />
    </ElCard>

    <ElCard shadow="never">
      <template #header>
        <h2 class="text-xl font-semibold tracking-tight text-slate-900">
          {{ t('demo.example.fileMap.title') }}
        </h2>
      </template>

      <ul class="grid gap-3 md:grid-cols-2">
        <li
          v-for="fileMapKey in fileMapKeys"
          :key="fileMapKey"
          class="min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
        >
          <code
            class="block rounded-lg bg-slate-900 px-3 py-2 font-mono text-xs break-words whitespace-normal text-green-400"
          >
            {{ t(`demo.example.fileMap.items.${fileMapKey}.title`) }}
          </code>
          <p class="mt-2 text-sm leading-relaxed break-words whitespace-normal text-slate-600">
            {{ t(`demo.example.fileMap.items.${fileMapKey}.description`) }}
          </p>
        </li>
      </ul>
    </ElCard>
  </div>
</template>
