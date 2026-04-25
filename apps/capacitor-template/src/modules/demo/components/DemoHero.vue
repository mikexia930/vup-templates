<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section
    class="from-primary-0 to-neutral-1 bg-linear-to-b py-[80px] max-[920px]:py-[56px] max-[560px]:py-[44px]"
  >
    <div
      class="mx-auto grid w-[min(100%,1200px)] grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] items-center gap-x-[72px] gap-y-[28px] px-[24px] max-[920px]:grid-cols-1 max-[920px]:gap-[22px] max-[560px]:px-[16px]"
    >
      <div
        class="text-neutral-6 inline-flex w-fit items-center gap-[12px] rounded-full bg-white px-[16px] py-[8px] text-[15px] font-semibold shadow-sm max-[560px]:text-[14px]"
      >
        <span class="bg-success-2 size-[9px] rounded-full"></span>
        {{ t('demo.hero.badge') }}
      </div>
      <h1
        class="leading-xs text-neutral-9 m-0 text-[56px] font-extrabold whitespace-pre-line max-[920px]:text-[36px] max-[560px]:text-[34px]"
      >
        {{ t('demo.hero.title') }}
      </h1>
      <p
        class="leading-md text-neutral-6 m-0 max-w-[680px] text-[20px] max-[920px]:text-[18px] max-[560px]:text-[16px]"
      >
        {{ t('demo.hero.description') }}
      </p>
      <div class="mt-[8px] flex flex-wrap gap-[14px] max-[560px]:grid">
        <button
          class="bg-primary-5 flex min-h-[48px] cursor-pointer items-center justify-center rounded-xl border-0 px-[20px] text-[15px] font-extrabold text-white shadow-[0_10px_18px_rgba(99,102,241,0.24)]"
          type="button"
        >
          ▶ {{ t('demo.hero.primaryAction') }}
        </button>
        <a
          class="border-neutral-3 text-neutral-9 flex min-h-[48px] items-center justify-center rounded-xl border-2 bg-white px-[20px] text-[15px] font-extrabold no-underline"
          href="#structure"
        >
          📄 {{ t('demo.hero.secondaryAction') }}
        </a>
      </div>

      <div
        class="bg-neutral-8 text-neutral-1 col-start-2 row-span-4 row-start-1 overflow-hidden rounded-[22px] font-mono text-[15px] shadow-lg max-[920px]:col-auto max-[920px]:row-auto max-[920px]:mt-[24px] max-[920px]:rounded-[18px]"
        aria-label="terminal preview"
      >
        <div class="flex gap-[8px] bg-white/5 px-[32px] pt-[28px] max-[560px]:px-[22px]">
          <span class="bg-error-4 size-[12px] rounded-full"></span>
          <span class="bg-warning-4 size-[12px] rounded-full"></span>
          <span class="bg-success-4 size-[12px] rounded-full"></span>
        </div>
        <div class="grid gap-[16px] px-[32px] py-[42px] max-[560px]:px-[22px]">
          <p class="leading-xs text-neutral-0 m-0 text-[15px] max-[560px]:text-[14px]">
            <span class="text-primary-3">$</span> pnpm install
          </p>
          <p class="leading-xs text-neutral-4 m-0 text-[15px] max-[560px]:text-[14px]">
            Packages: +186
          </p>
          <p class="leading-xs text-success-3 m-0 text-[15px] max-[560px]:text-[14px]">
            ✓ Done in 3.2s
          </p>
          <p class="leading-xs text-neutral-0 m-0 text-[15px] max-[560px]:text-[14px]">
            <span class="text-primary-3">$</span> pnpm dev
          </p>
          <p class="leading-xs text-neutral-4 m-0 text-[15px] max-[560px]:text-[14px]">
            VITE v6.x ready in 320ms
          </p>
          <p class="leading-xs text-success-3 m-0 text-[15px] max-[560px]:text-[14px]">
            ➜ Local: http://localhost:9305/
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
