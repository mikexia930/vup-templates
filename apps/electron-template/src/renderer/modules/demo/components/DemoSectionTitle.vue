<script setup lang="ts">
defineProps<{
  description: string;
  title: string;
}>();
</script>

<template>
  <div class="grid gap-2">
    <h2
      class="text-neutral-8 before:bg-primary-5 flex items-center gap-2 text-[26px] font-extrabold tracking-normal before:h-7 before:w-1 before:rounded-full before:content-['']"
    >
      {{ title }}
    </h2>
    <p class="leading-lg text-neutral-7 text-[15px]">{{ description }}</p>
  </div>
</template>
