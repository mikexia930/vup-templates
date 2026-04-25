<script setup lang="ts">
import DemoSectionHeading from './DemoSectionHeading.vue';

const { t } = useI18n();

const layerItems = [
  { badgeClass: 'bg-primary-0 text-primary-6', key: 'page' },
  { badgeClass: 'bg-error-0 text-error-6', key: 'module' },
  { badgeClass: 'bg-success-0 text-success-6', key: 'common' },
  { badgeClass: 'bg-warning-0 text-warning-6', key: 'base' },
] as const;
</script>

<template>
  <section id="structure" class="py-[76px]">
    <div class="mx-auto w-[min(1120px,calc(100%_-_48px))] max-[680px]:w-[calc(100%_-_32px)]">
      <DemoSectionHeading
        :description="t('demo.structure.description')"
        :title="t('demo.structure.title')"
      />

      <div
        class="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-[24px] max-[980px]:grid-cols-1"
      >
        <pre
          class="bg-neutral-8 leading-lg text-primary-0 min-h-full overflow-auto rounded-xl p-[24px] font-mono text-sm"
        ><span class="font-bold text-primary-2">src/</span>
├── <span class="font-bold text-primary-2">api/</span>                  <span class="text-neutral-4">基础请求层</span>
├── <span class="font-bold text-primary-2">locales/</span>              <span class="text-neutral-4">全局 i18n</span>
├── <span class="font-bold text-primary-2">modules/</span>
│   └── <span class="font-bold text-primary-2">demo/</span>
│       ├── <span class="font-bold text-primary-2">api/</span>          <span class="text-neutral-4">模块数据访问</span>
│       ├── <span class="font-bold text-primary-2">components/</span>   <span class="text-neutral-4">模块内组件</span>
│       ├── <span class="font-bold text-primary-2">locales/</span>      <span class="text-neutral-4">模块文案</span>
│       ├── <span class="font-bold text-primary-2">stores/</span>       <span class="text-neutral-4">模块状态</span>
│       ├── <span class="font-bold text-primary-2">types/</span>        <span class="text-neutral-4">模块类型</span>
│       └── <span class="font-bold text-primary-2">views/</span>        <span class="text-neutral-4">页面入口</span>
├── <span class="font-bold text-primary-2">router/</span>
├── <span class="font-bold text-primary-2">views/</span>
├── <span class="text-neutral-3">App.vue</span>
└── <span class="text-neutral-3">main.ts</span></pre>

        <div class="border-neutral-3 overflow-hidden rounded-xl border bg-white">
          <div
            class="bg-neutral-2 text-neutral-6 grid grid-cols-[120px_1fr_1.5fr] items-start gap-[14px] px-[18px] py-[15px] text-xs font-extrabold max-[680px]:grid-cols-1"
          >
            <span>{{ t('demo.structure.table.layer') }}</span>
            <span>{{ t('demo.structure.table.directory') }}</span>
            <span>{{ t('demo.structure.table.responsibility') }}</span>
          </div>
          <div
            v-for="item in layerItems"
            :key="item.key"
            class="border-neutral-3 leading-lg text-neutral-6 grid grid-cols-[120px_1fr_1.5fr] items-start gap-[14px] border-t px-[18px] py-[15px] text-sm max-[680px]:grid-cols-1"
          >
            <span
              class="w-fit rounded-sm px-[8px] py-[3px] text-xs font-bold whitespace-nowrap"
              :class="item.badgeClass"
            >
              {{ t(`demo.structure.layers.${item.key}.badge`) }}
            </span>
            <span>{{ t(`demo.structure.layers.${item.key}.directory`) }}</span>
            <span>{{ t(`demo.structure.layers.${item.key}.responsibility`) }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
