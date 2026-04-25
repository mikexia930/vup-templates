<script setup lang="ts">
import DemoSectionTitle from './DemoSectionTitle.vue';

const { t } = useI18n();
</script>

<template>
  <section id="structure" class="grid gap-6 pt-16">
    <DemoSectionTitle
      :description="t('demo.structure.description')"
      :title="t('demo.structure.title')"
    />
    <pre
      class="bg-neutral-8 leading-lg text-neutral-2 overflow-x-auto rounded-xl p-6 font-mono text-sm"
    ><span class="font-extrabold text-primary-2">src/</span>
├── main.ts                  # Electron main process
├── preload.ts               # safe bridge exposed to renderer
└── renderer/
    ├── api/                 # app request adapter
    ├── locales/             # common + module locale aggregation
    ├── modules/
    │   └── demo/
    │       ├── api/         # API functions and response types
    │       ├── components/
    │       ├── locales/
    │       ├── stores/
    │       ├── types/       # module-wide runtime types
    │       └── views/
    └── router/</pre>
  </section>
</template>
