<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section class="from-primary-0 to-neutral-1 bg-linear-to-b py-[76px] pt-[88px]">
    <div
      class="mx-auto grid w-[min(1120px,calc(100%_-_48px))] grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] items-center gap-[56px] max-[980px]:grid-cols-1 max-[680px]:w-[calc(100%_-_32px)]"
    >
      <div>
        <div
          class="border-neutral-3 text-neutral-6 inline-flex items-center gap-[8px] rounded-full border bg-white px-[14px] py-[5px] text-sm font-semibold"
        >
          <span class="bg-success-4 size-[7px] rounded-full"></span>
          {{ t('demo.hero.badge') }}
        </div>
        <h1
          class="leading-xs text-neutral-9 my-[18px] text-[clamp(42px,7vw,64px)] font-extrabold whitespace-pre-line"
        >
          {{ t('demo.hero.title') }}
        </h1>
        <p class="leading-lg text-neutral-6 max-w-[620px] text-[18px]">
          {{ t('demo.hero.description') }}
        </p>
        <div class="mt-[30px] flex flex-wrap gap-[12px]">
          <a
            class="bg-primary-5 hover:bg-primary-6 inline-flex min-h-[42px] items-center justify-center rounded-md border border-transparent px-[18px] text-sm font-bold text-white no-underline transition"
            href="#quickstart"
          >
            {{ t('demo.hero.primaryAction') }}
          </a>
          <a
            class="border-neutral-3 text-neutral-9 hover:border-primary-2 hover:text-primary-6 inline-flex min-h-[42px] items-center justify-center rounded-md border bg-white px-[18px] text-sm font-bold no-underline transition"
            href="#structure"
          >
            {{ t('demo.hero.secondaryAction') }}
          </a>
        </div>
      </div>

      <div
        class="bg-neutral-8 text-primary-0 overflow-hidden rounded-xl font-mono text-sm shadow-lg"
        aria-label="Nuxt terminal preview"
      >
        <div class="flex gap-[7px] bg-white/5 px-[18px] py-[15px]">
          <span class="bg-error-4 size-[11px] rounded-full"></span>
          <span class="bg-warning-4 size-[11px] rounded-full"></span>
          <span class="bg-success-4 size-[11px] rounded-full"></span>
        </div>
        <div class="grid gap-[8px] p-[22px]">
          <p><span class="text-primary-2">$</span> pnpm dev</p>
          <p class="text-neutral-4">Nuxt 4 ready in 420ms</p>
          <p class="text-success-3">Local: http://localhost:9303/</p>
          <p><span class="text-primary-2">$</span> pnpm build</p>
          <p class="text-neutral-4">Nitro server built</p>
          <p class="text-success-3">SSR output ready</p>
        </div>
      </div>
    </div>
  </section>
</template>
