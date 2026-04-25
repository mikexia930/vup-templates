<script setup lang="ts">
import { computed } from 'vue';

const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches ||
  Boolean((navigator as Navigator & { standalone?: boolean }).standalone);

const modeLabel = computed(() => (isStandalone ? 'Standalone / installed mode' : 'Browser tab'));
</script>

<template>
  <main
    class="from-primary-0 to-neutral-1 grid min-h-screen place-items-center bg-linear-to-b p-[24px]"
  >
    <section
      class="border-neutral-3 w-[min(760px,100%)] rounded-xl border bg-white p-[28px] shadow-sm"
    >
      <p class="text-primary-6 text-sm font-bold">Example / PWA</p>
      <h1 class="leading-xs text-neutral-9 mt-[8px] text-[36px] font-extrabold">PWA example</h1>
      <p class="leading-lg text-neutral-6 mt-[16px] text-[16px]">
        This example keeps the setup focused on <code>@vup/pwa</code>: build output generation and
        runtime registration in production.
      </p>

      <dl class="mt-[24px] grid gap-[12px] text-sm">
        <div class="bg-neutral-1 rounded-md p-[14px]">
          <dt class="text-neutral-5 text-xs font-bold uppercase">build output</dt>
          <dd class="text-neutral-6 mt-[6px]">
            Generates <code>manifest.webmanifest</code> and <code>sw.js</code>.
          </dd>
        </div>
        <div class="bg-neutral-1 rounded-md p-[14px]">
          <dt class="text-neutral-5 text-xs font-bold uppercase">runtime</dt>
          <dd class="text-neutral-6 mt-[6px]">Registers the service worker in production only.</dd>
        </div>
        <div class="bg-neutral-1 rounded-md p-[14px]">
          <dt class="text-neutral-5 text-xs font-bold uppercase">current mode</dt>
          <dd class="text-neutral-9 mt-[6px] font-bold">{{ modeLabel }}</dd>
        </div>
      </dl>
    </section>
  </main>
</template>
