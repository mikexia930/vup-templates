<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

interface DemoTask {
  id: number;
  title: string;
  owner: string;
  status: string;
}

const loading = ref(false);
const error = ref('');
const tasks = ref<DemoTask[]>([]);
const forceError = ref(false);

const summary = computed(() => {
  if (loading.value) return 'Loading mocked response...';
  if (error.value) return `Request failed: ${error.value}`;
  if (!tasks.value.length) return 'No data loaded yet.';
  return `Loaded ${tasks.value.length} mocked task records.`;
});

async function loadTasks() {
  loading.value = true;
  error.value = '';

  try {
    const query = forceError.value ? '?forceError=true' : '';
    const response = await fetch(`/api/template-demo/tasks${query}`);
    const payload = (await response.json()) as {
      code: number;
      data?: DemoTask[];
      message?: string;
    };

    if (!response.ok || payload.code !== 0) {
      throw new Error(payload.message || 'Mock request failed');
    }

    tasks.value = payload.data ?? [];
  } catch (requestError) {
    tasks.value = [];
    error.value =
      requestError instanceof Error ? requestError.message : 'Unknown mock request failure';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  void loadTasks();
});
</script>

<template>
  <main class="page">
    <section class="card">
      <p class="eyebrow">Example / Mock</p>
      <h1>MSW mock example</h1>
      <p class="lead">
        This example shows the smallest useful way to start <code>@vup/mock</code> and intercept
        <code>/api/template-demo/*</code> during local development.
      </p>

      <div class="actions">
        <label class="checkbox">
          <input v-model="forceError" type="checkbox" />
          Force error response
        </label>
        <button class="button" type="button" @click="loadTasks">Reload mocked tasks</button>
      </div>

      <p class="summary">{{ summary }}</p>

      <ul v-if="tasks.length" class="list">
        <li v-for="task in tasks" :key="task.id" class="list-item">
          <strong>{{ task.title }}</strong>
          <span>{{ task.owner }} · {{ task.status }}</span>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 16px;
  background:
    radial-gradient(circle at top left, rgba(59, 130, 246, 0.18), transparent 28%),
    linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
}

.card {
  width: min(760px, 100%);
  padding: 32px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #2563eb;
}

h1 {
  margin: 0;
  font-size: 36px;
  line-height: 1.1;
  color: #0f172a;
}

.lead {
  margin: 16px 0 0;
  color: #334155;
  line-height: 1.7;
}

.actions {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 24px;
}

.checkbox {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  color: #334155;
}

.button {
  padding: 10px 16px;
  border: 0;
  border-radius: 999px;
  background: #0f172a;
  color: #fff;
  cursor: pointer;
}

.summary {
  margin: 20px 0 0;
  color: #475569;
}

.list {
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 12px;
}

.list-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid #dbeafe;
  color: #0f172a;
}
</style>
