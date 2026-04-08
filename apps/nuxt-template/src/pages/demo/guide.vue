<script setup lang="ts">
const { t } = useI18n();

const commands = [
  { key: 'dev', value: 'pnpm dev' },
  { key: 'build', value: 'pnpm build' },
  { key: 'generate', value: 'pnpm generate' },
  { key: 'lint', value: 'pnpm lint' },
] as const;

const firstEditItems = [
  { descriptionKey: 'config', path: 'nuxt.config.ts' },
  { descriptionKey: 'layout', path: 'src/pages/demo.vue' },
  { descriptionKey: 'guide', path: 'src/pages/demo/guide.vue' },
  { descriptionKey: 'example', path: 'src/pages/demo/example.vue' },
  { descriptionKey: 'request', path: 'src/api/request.ts' },
  { descriptionKey: 'store', path: 'src/stores/demo/index.ts' },
] as const;

const readOrderKeys = ['step1', 'step2', 'step3', 'step4', 'step5'] as const;
</script>

<template>
  <div class="grid gap-4">
    <ElCard shadow="never">
      <template #header>
        <h2 class="text-xl font-semibold tracking-tight text-slate-900">
          {{ t('demo.guide.quickStart.title') }}
        </h2>
      </template>

      <ul class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <li
          v-for="item in commands"
          :key="item.key"
          class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
        >
          <p class="text-sm text-slate-600">
            {{ t(`demo.guide.quickStart.items.${item.key}.description`) }}
          </p>
          <code
            class="mt-2 block rounded-lg bg-slate-900 px-3 py-2 font-mono text-xs text-green-400"
          >
            {{ item.value }}
          </code>
        </li>
      </ul>
    </ElCard>

    <ElCard shadow="never">
      <template #header>
        <h2 class="text-xl font-semibold tracking-tight text-slate-900">
          {{ t('demo.guide.firstEdit.title') }}
        </h2>
      </template>

      <ul class="grid gap-3 lg:grid-cols-2">
        <li
          v-for="item in firstEditItems"
          :key="item.path"
          class="min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
        >
          <code class="block rounded-lg bg-slate-900 px-3 py-2 font-mono text-xs text-green-400">
            {{ item.path }}
          </code>
          <p class="mt-2 text-sm leading-relaxed break-words whitespace-normal text-slate-600">
            {{ t(`demo.guide.firstEdit.items.${item.descriptionKey}`) }}
          </p>
        </li>
      </ul>
    </ElCard>

    <ElCard shadow="never">
      <template #header>
        <h2 class="text-xl font-semibold tracking-tight text-slate-900">
          {{ t('demo.guide.readOrder.title') }}
        </h2>
      </template>

      <ol class="grid gap-2 text-sm leading-relaxed text-slate-600">
        <li
          v-for="readOrderKey in readOrderKeys"
          :key="readOrderKey"
          class="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
        >
          {{ t(`demo.guide.readOrder.items.${readOrderKey}`) }}
        </li>
      </ol>
    </ElCard>
  </div>
</template>
