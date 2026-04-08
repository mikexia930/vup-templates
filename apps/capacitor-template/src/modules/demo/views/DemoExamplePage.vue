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
  <div class="demo-example-page">
    <VMCard class="demo-example-page__card" mode="ios">
      <VMCardHeader>
        <VMCardTitle>{{ t('demo.example.title') }}</VMCardTitle>
        <VMCardSubtitle>{{ t('demo.example.description') }}</VMCardSubtitle>
      </VMCardHeader>
      <VMCardContent>
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
          @simulate-error="demoTaskStore.loadTasks({ forceError: true })"
          @toggle-status="demoTaskStore.toggleTaskStatus"
        />
      </VMCardContent>
    </VMCard>

    <VMCard class="demo-example-page__card" mode="ios">
      <VMCardHeader>
        <VMCardTitle>{{ t('demo.example.fileMap.title') }}</VMCardTitle>
      </VMCardHeader>
      <VMCardContent>
        <VMList inset lines="full">
          <VMItem v-for="fileMapKey in fileMapKeys" :key="fileMapKey" mode="ios">
            <VMLabel>
              <h3 class="text-xs font-semibold text-slate-800">
                {{ t(`demo.example.fileMap.items.${fileMapKey}.title`) }}
              </h3>
              <p class="text-xs text-slate-600">
                {{ t(`demo.example.fileMap.items.${fileMapKey}.description`) }}
              </p>
            </VMLabel>
          </VMItem>
        </VMList>
      </VMCardContent>
    </VMCard>
  </div>
</template>

<style lang="scss" scoped>
@reference 'tailwindcss';

.demo-example-page {
  @apply grid gap-3;
}

.demo-example-page__card {
  @apply rounded-2xl;
  border-radius: var(--vm-card-radius);
}

.demo-example-page__card :deep(ion-card-header) {
  padding: 14px 16px 8px;
}

.demo-example-page__card :deep(ion-card-content) {
  padding: 8px 12px 14px;
}

.demo-example-page__card :deep(ion-list) {
  margin: 0;
  padding: 0;
}
</style>
