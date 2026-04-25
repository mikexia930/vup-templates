<script setup lang="ts">
defineProps<{
  description: string;
  title: string;
}>();
</script>

<template>
  <div class="mb-[30px]">
    <h2
      class="leading-sm before:bg-primary-5 flex items-center gap-[10px] text-[28px] font-extrabold before:h-[26px] before:w-[4px] before:rounded-full before:content-['']"
    >
      {{ title }}
    </h2>
    <p class="text-neutral-6 mt-[8px] text-[16px]">{{ description }}</p>
  </div>
</template>
