<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section
    class="from-primary-0 to-neutral-1 relative -mx-6 grid grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] items-center gap-14 overflow-hidden rounded-b-xl bg-linear-to-b px-6 py-20 max-[980px]:grid-cols-1 max-[980px]:py-14 max-[820px]:-mx-4 max-[820px]:px-4"
  >
    <div class="grid gap-6">
      <div class="bg-primary-0 text-primary-6 w-fit rounded-full px-4 py-2 text-sm font-bold">
        {{ t('demo.hero.badge') }}
      </div>
      <h1
        class="text-neutral-9 max-w-[620px] text-[56px] leading-[1.08] font-[850] tracking-normal whitespace-pre-line max-[980px]:text-[42px]"
      >
        {{ t('demo.hero.title') }}
      </h1>
      <p class="leading-lg text-neutral-7 max-w-[620px] text-lg">
        {{ t('demo.hero.description') }}
      </p>
      <div class="flex flex-wrap gap-3">
        <button
          type="button"
          class="bg-primary-5 text-neutral-0 shadow-primary-2 inline-flex min-h-[44px] items-center rounded-lg px-5 text-sm font-bold no-underline shadow-sm"
          @click="
            document
              .getElementById('quickstart')
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          "
        >
          {{ t('demo.hero.primaryAction') }}
        </button>
        <button
          type="button"
          class="border-neutral-4 bg-neutral-0 text-neutral-8 inline-flex min-h-[44px] items-center rounded-lg border px-5 text-sm font-bold no-underline"
          @click="
            document
              .getElementById('structure')
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          "
        >
          {{ t('demo.hero.secondaryAction') }}
        </button>
      </div>
    </div>

    <div
      class="border-neutral-4 bg-neutral-8 overflow-hidden rounded-xl border shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
      aria-label="Electron desktop preview"
    >
      <div class="bg-neutral-0/10 flex gap-2 p-4">
        <span class="bg-error-4 size-3 rounded-full"></span>
        <span class="bg-warning-4 size-3 rounded-full"></span>
        <span class="bg-success-4 size-3 rounded-full"></span>
      </div>
      <div class="grid min-h-[280px] grid-cols-[140px_1fr]">
        <div class="border-neutral-0/20 text-neutral-4 grid content-start gap-4 border-r p-6">
          <strong class="text-neutral-0">Electron</strong>
          <span class="text-sm">Main</span>
          <span class="text-sm">Preload</span>
          <span class="text-sm">Renderer</span>
        </div>
        <div class="grid content-center gap-5 p-7">
          <div class="text-neutral-0 text-[28px] font-[850]">{{ t('demo.hero.previewTitle') }}</div>
          <div class="grid grid-cols-2 gap-3">
            <span
              class="border-neutral-0/20 bg-neutral-0/10 text-primary-1 rounded-lg border p-4 text-sm font-semibold"
              >Hash Router</span
            >
            <span
              class="border-neutral-0/20 bg-neutral-0/10 text-primary-1 rounded-lg border p-4 text-sm font-semibold"
              >IPC Bridge</span
            >
            <span
              class="border-neutral-0/20 bg-neutral-0/10 text-primary-1 rounded-lg border p-4 text-sm font-semibold"
              >Pinia</span
            >
            <span
              class="border-neutral-0/20 bg-neutral-0/10 text-primary-1 rounded-lg border p-4 text-sm font-semibold"
              >i18n</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
