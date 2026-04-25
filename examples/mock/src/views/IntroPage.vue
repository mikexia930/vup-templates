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
  <main
    class="from-primary-0 to-neutral-1 grid min-h-screen place-items-center bg-linear-to-b p-[24px]"
  >
    <section
      class="border-neutral-3 w-[min(760px,100%)] rounded-xl border bg-white p-[28px] shadow-sm"
    >
      <p class="text-primary-6 text-sm font-bold">Example / Mock</p>
      <h1 class="leading-xs text-neutral-9 mt-[8px] text-[36px] font-extrabold">
        MSW mock example
      </h1>
      <p class="leading-lg text-neutral-6 mt-[16px] text-[16px]">
        This example shows the smallest useful way to start <code>@vup/mock</code> and intercept
        <code>/api/template-demo/*</code> during local development.
      </p>

      <div class="mt-[24px] flex flex-wrap items-center gap-[16px]">
        <label class="text-neutral-6 inline-flex items-center gap-[8px] text-sm font-semibold">
          <input v-model="forceError" type="checkbox" />
          Force error response
        </label>
        <button
          class="bg-primary-5 hover:bg-primary-6 inline-flex min-h-[38px] cursor-pointer items-center justify-center rounded-md border-0 px-[16px] text-sm font-bold text-white transition"
          type="button"
          @click="loadTasks"
        >
          Reload mocked tasks
        </button>
      </div>

      <p
        class="mt-[20px] rounded-md border px-[14px] py-[10px] text-sm font-semibold"
        :class="[
          error
            ? 'border-error-2 bg-error-0 text-error-6'
            : 'border-neutral-3 bg-neutral-1 text-neutral-6',
        ]"
      >
        {{ summary }}
      </p>

      <ul v-if="tasks.length" class="mt-[20px] grid gap-[12px]">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="border-neutral-3 bg-neutral-1 rounded-md border p-[14px]"
        >
          <strong class="text-neutral-9 block text-sm font-bold">{{ task.title }}</strong>
          <span class="text-neutral-6 mt-[4px] block text-sm"
            >{{ task.owner }} · {{ task.status }}</span
          >
        </li>
      </ul>
    </section>
  </main>
</template>
