<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <footer class="border-neutral-3 text-neutral-6 border-t py-[28px] text-sm">
    <div
      class="mx-auto flex w-[min(1120px,calc(100%_-_48px))] flex-wrap justify-between gap-[12px] max-[680px]:w-[calc(100%_-_32px)]"
    >
      <span>{{ t('demo.footer.license') }}</span>
      <span>{{ t('demo.footer.stack') }}</span>
    </div>
  </footer>
</template>
