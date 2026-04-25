<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <nav class="border-neutral-3 bg-neutral-1/90 sticky top-0 z-20 border-b backdrop-blur-md">
    <div
      class="mx-auto flex min-h-[64px] w-[min(1120px,calc(100%_-_48px))] items-center justify-between gap-[24px] py-0 max-[980px]:flex-col max-[980px]:items-start max-[980px]:py-[14px] max-[680px]:w-[calc(100%_-_32px)]"
    >
      <a
        class="text-neutral-9 flex items-center gap-[10px] font-bold no-underline"
        href="#top"
        aria-label="Vue SPA Template"
      >
        <span class="bg-primary-5 grid size-[32px] place-items-center rounded-md text-white"
          >V</span
        >
        <span>Vue SPA Template</span>
      </a>

      <div class="flex items-center gap-[6px]" aria-label="页面导航">
        <a
          class="text-neutral-6 hover:bg-primary-0 hover:text-primary-6 rounded-md px-[12px] py-[8px] text-sm font-semibold no-underline transition"
          href="#quickstart"
        >
          {{ t('demo.nav.quickstart') }}
        </a>
        <a
          class="text-neutral-6 hover:bg-primary-0 hover:text-primary-6 rounded-md px-[12px] py-[8px] text-sm font-semibold no-underline transition"
          href="#features"
        >
          {{ t('demo.nav.features') }}
        </a>
        <a
          class="text-neutral-6 hover:bg-primary-0 hover:text-primary-6 rounded-md px-[12px] py-[8px] text-sm font-semibold no-underline transition"
          href="#structure"
        >
          {{ t('demo.nav.structure') }}
        </a>
        <a
          class="text-neutral-6 hover:bg-primary-0 hover:text-primary-6 rounded-md px-[12px] py-[8px] text-sm font-semibold no-underline transition"
          href="#runtime"
        >
          {{ t('demo.nav.runtime') }}
        </a>
      </div>

      <span class="bg-primary-0 text-primary-6 rounded-full px-[10px] py-[4px] text-xs font-bold"
        >v2.0.0</span
      >
    </div>
  </nav>
</template>
