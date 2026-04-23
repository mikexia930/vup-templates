<script setup lang="ts">
import DemoTaskBoard from '../components/DemoTaskBoard.vue';
import { useDemoTaskStore } from '../stores/useDemoTaskStore';
import type { DemoTaskFilter } from '../types/task';

const { t } = useI18n();
const demoTaskStore = useDemoTaskStore();

const fileMapKeys = ['page', 'component', 'store', 'api', 'types'] as const;

onMounted(() => {
  if (!demoTaskStore.hasLoaded) demoTaskStore.loadTasks();
});

function handleFilterChange(value: DemoTaskFilter) {
  demoTaskStore.setStatusFilter(value);
}

function handleKeywordChange(value: string) {
  demoTaskStore.setKeyword(value);
}
</script>

<template>
  <div class="grid gap-4">
    <VCard shadow="never">
      <div class="mb-4">
        <h2 class="text-xl font-semibold tracking-tight text-slate-900">
          {{ t('demo.example.title') }}
        </h2>
        <p class="mt-2 text-sm leading-relaxed text-slate-600">
          {{ t('demo.example.description') }}
        </p>
      </div>

      <DemoTaskBoard
        :error-message="demoTaskStore.errorMessage"
        :is-empty="demoTaskStore.isEmpty"
        :keyword="demoTaskStore.keyword"
        :list-loading="demoTaskStore.isListLoading"
        :stats="demoTaskStore.stats"
        :status-filter="demoTaskStore.statusFilter"
        :tasks="demoTaskStore.filteredItems"
        :updating-task-ids="demoTaskStore.updatingTaskIds"
        @filter-change="handleFilterChange"
        @keyword-change="handleKeywordChange"
        @reload="demoTaskStore.loadTasks()"
        @reset-filters="demoTaskStore.resetFilters"
        @toggle-status="demoTaskStore.toggleTaskStatus"
      />
    </VCard>

    <VCard shadow="never">
      <div class="mb-4">
        <h2 class="text-xl font-semibold tracking-tight text-slate-900">
          {{ t('demo.example.fileMap.title') }}
        </h2>
      </div>

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
    </VCard>
  </div>
</template>
