<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { browser } from 'wxt/browser';
import { getFeatureEnabled, setFeatureEnabled } from '@/common/extension-state';

const isFeatureEnabled = ref(false);

async function openNewTab() {
  await browser.tabs.create({ url: browser.runtime.getURL('/newtab.html') });
}

async function openOptions() {
  await browser.runtime.openOptionsPage();
}

async function toggleFeature() {
  isFeatureEnabled.value = !isFeatureEnabled.value;
  await setFeatureEnabled(isFeatureEnabled.value);
}

onMounted(async () => {
  isFeatureEnabled.value = await getFeatureEnabled();
});
</script>

<template>
  <main class="bg-neutral-1 text-neutral-9 w-[360px] p-[18px]">
    <header class="flex items-center gap-[12px]">
      <span
        class="bg-primary-5 grid size-[36px] place-items-center rounded-md text-sm font-bold text-white"
        >W</span
      >
      <div>
        <h1 class="leading-sm text-[18px] font-extrabold">WXT Template</h1>
        <p class="text-neutral-6 text-sm">Popup entrypoint</p>
      </div>
    </header>

    <section class="border-neutral-3 mt-[18px] rounded-md border bg-white p-[14px]">
      <div class="flex items-center justify-between gap-[16px]">
        <div>
          <h2 class="text-neutral-9 text-sm font-bold">Feature flag</h2>
          <p class="leading-lg text-neutral-6 mt-[4px] text-xs">
            Stored with browser.storage.local.
          </p>
        </div>
        <button
          class="border-primary-5 text-primary-6 hover:bg-primary-0 inline-flex min-h-[34px] cursor-pointer items-center justify-center rounded-md border px-[12px] text-xs font-bold transition"
          type="button"
          @click="toggleFeature"
        >
          {{ isFeatureEnabled ? 'Enabled' : 'Disabled' }}
        </button>
      </div>
    </section>

    <div class="mt-[14px] grid grid-cols-2 gap-[10px]">
      <button
        class="bg-primary-5 hover:bg-primary-6 inline-flex min-h-[38px] cursor-pointer items-center justify-center rounded-md border-0 px-[14px] text-sm font-bold text-white transition"
        type="button"
        @click="openNewTab"
      >
        New Tab
      </button>
      <button
        class="border-neutral-3 text-neutral-9 hover:border-primary-2 hover:text-primary-6 inline-flex min-h-[38px] cursor-pointer items-center justify-center rounded-md border bg-white px-[14px] text-sm font-bold transition"
        type="button"
        @click="openOptions"
      >
        Options
      </button>
    </div>
  </main>
</template>
