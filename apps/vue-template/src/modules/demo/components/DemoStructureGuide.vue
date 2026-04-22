<script setup lang="ts">
const { t } = useI18n();

const structureItemKeys = ['base', 'module', 'common'] as const;
const structureRuleKeys = ['moduleApi', 'moduleLocales', 'moduleStore', 'optional'] as const;

const directoryTree = `src/
├── api/
│   ├── request.ts
│   └── types.ts
├── locales/
│   ├── index.ts
│   ├── zh_CN.ts
│   └── en_US.ts
├── router/
│   ├── index.ts
│   └── routes.ts
├── modules/
│   └── demo/
│       ├── views/
│       ├── components/
│       ├── stores/
│       ├── api/
│       ├── types/
│       └── locales/
└── stores/`;
</script>

<template>
  <section class="grid gap-4">
    <div>
      <h2 class="text-xl font-semibold tracking-tight text-slate-900">
        {{ t('demo.guide.structure.title') }}
      </h2>
      <p class="mt-2 text-sm leading-relaxed text-slate-600">
        {{ t('demo.guide.structure.description') }}
      </p>
    </div>

    <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      <VCard v-for="itemKey in structureItemKeys" :key="itemKey" shadow="never">
        <p class="text-sm leading-relaxed text-slate-700">
          {{ t(`demo.guide.structure.items.${itemKey}`) }}
        </p>
      </VCard>
    </div>

    <VAlert :title="t('demo.guide.structure.treeTitle')" type="info" :closable="false" />
    <pre
      class="overflow-x-auto rounded-lg bg-slate-900 p-4 font-mono text-sm leading-[1.6] text-slate-100"
      >{{ directoryTree }}</pre
    >

    <VCard shadow="never">
      <ul class="grid gap-2 text-sm leading-relaxed text-slate-600">
        <li v-for="ruleKey in structureRuleKeys" :key="ruleKey">
          {{ t(`demo.guide.structure.rules.${ruleKey}`) }}
        </li>
      </ul>
    </VCard>
  </section>
</template>
