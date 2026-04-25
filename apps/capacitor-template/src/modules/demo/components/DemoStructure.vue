<script setup lang="ts">
import DemoSectionTitle from './DemoSectionTitle.vue';

const { t } = useI18n();
</script>

<template>
  <section class="grid gap-[28px] pt-[80px] max-[560px]:gap-[14px] max-[560px]:pt-[36px]">
    <DemoSectionTitle
      :description="t('demo.structure.description')"
      :title="t('demo.structure.title')"
    />

    <article class="mx-auto w-[min(100%,1200px)] px-[24px] max-[560px]:px-[16px]">
      <pre
        class="bg-neutral-8 leading-lg text-neutral-1 m-0 overflow-x-auto rounded-xl p-[28px] font-mono text-[15px] max-[560px]:p-[16px] max-[560px]:text-[12px]"
      ><span class="font-extrabold text-primary-2">src/</span>
├── api/              # 应用请求适配
├── locales/          # 全局文案
├── modules/
│   └── demo/
│       ├── api/      # 接口函数与契约类型
│       ├── components/
│       ├── locales/
│       ├── stores/
│       ├── types/    # 模块级共享类型
│       └── views/
└── router/</pre>
    </article>
  </section>
</template>
