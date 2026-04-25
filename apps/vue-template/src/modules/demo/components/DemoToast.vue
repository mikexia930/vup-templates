<script setup lang="ts">
defineProps<{
  show: boolean;
}>();

const { t } = useI18n();
</script>

<template>
  <div
    class="bg-neutral-8 pointer-events-none fixed bottom-[28px] left-1/2 z-30 rounded-md px-[18px] py-[11px] text-sm font-bold text-white shadow-lg transition duration-200"
    :class="
      show
        ? '-translate-x-1/2 translate-y-0 opacity-100'
        : '-translate-x-1/2 translate-y-[40px] opacity-0'
    "
  >
    {{ t('demo.common.copied') }}
  </div>
</template>
