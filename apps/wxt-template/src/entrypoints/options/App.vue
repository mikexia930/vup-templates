<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { ExtensionSettings } from '@/common/extension-state';
import { getExtensionSettings, saveExtensionSettings } from '@/common/extension-state';

const settings = ref<ExtensionSettings>({
  enableBadge: true,
  enableNotifications: true,
});

const saveStatus = ref('');

async function saveSettings() {
  await saveExtensionSettings(settings.value);
  saveStatus.value = 'Saved';
}

async function resetSettings() {
  settings.value = {
    enableBadge: true,
    enableNotifications: true,
  };
  await saveSettings();
}

onMounted(async () => {
  settings.value = await getExtensionSettings();
});
</script>

<template>
  <main class="bg-neutral-1 text-neutral-9 min-h-screen px-[24px] py-[48px]">
    <section class="mx-auto w-[min(720px,100%)]">
      <header>
        <p class="text-primary-6 text-sm font-bold">Options entrypoint</p>
        <h1 class="leading-sm mt-[6px] text-[32px] font-extrabold">Extension Settings</h1>
        <p class="leading-lg text-neutral-6 mt-[10px] text-[16px]">
          Shared settings are stored in browser.storage.local so every extension context can read
          them.
        </p>
      </header>

      <div class="border-neutral-3 mt-[24px] rounded-xl border bg-white p-[22px] shadow-sm">
        <label class="border-neutral-3 flex items-start gap-[12px] border-b pb-[16px]">
          <input v-model="settings.enableNotifications" class="mt-[4px]" type="checkbox" />
          <span>
            <strong class="text-neutral-9 block text-sm">Enable notifications</strong>
            <span class="leading-lg text-neutral-6 mt-[4px] block text-sm">
              Keep notification behavior as an opt-in template setting.
            </span>
          </span>
        </label>

        <label class="mt-[16px] flex items-start gap-[12px]">
          <input v-model="settings.enableBadge" class="mt-[4px]" type="checkbox" />
          <span>
            <strong class="text-neutral-9 block text-sm">Enable badge</strong>
            <span class="leading-lg text-neutral-6 mt-[4px] block text-sm">
              Demonstrates a small persisted setting without adding business logic.
            </span>
          </span>
        </label>

        <div class="mt-[24px] flex flex-wrap items-center gap-[10px]">
          <button
            class="bg-primary-5 hover:bg-primary-6 inline-flex min-h-[38px] cursor-pointer items-center justify-center rounded-md border-0 px-[16px] text-sm font-bold text-white transition"
            type="button"
            @click="saveSettings"
          >
            Save
          </button>
          <button
            class="border-neutral-3 text-neutral-9 hover:border-primary-2 hover:text-primary-6 inline-flex min-h-[38px] cursor-pointer items-center justify-center rounded-md border bg-white px-[16px] text-sm font-bold transition"
            type="button"
            @click="resetSettings"
          >
            Reset
          </button>
          <span v-if="saveStatus" class="text-success-6 text-sm font-semibold">{{
            saveStatus
          }}</span>
        </div>
      </div>
    </section>
  </main>
</template>
