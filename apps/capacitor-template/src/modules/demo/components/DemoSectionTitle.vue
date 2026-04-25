<script setup lang="ts">
defineProps<{
  description: string;
  title: string;
}>();
</script>

<template>
  <div class="mx-auto grid w-[min(100%,1200px)] gap-[8px] px-[24px] max-[560px]:px-[16px]">
    <h2
      class="leading-sm text-neutral-9 before:bg-primary-5 m-0 flex items-center gap-[9px] text-[30px] font-extrabold before:h-[36px] before:w-[4px] before:rounded-full before:content-[''] max-[560px]:text-[22px] max-[560px]:before:h-[26px]"
    >
      {{ title }}
    </h2>
    <p class="leading-md text-neutral-6 m-0 text-[17px] max-[560px]:text-[15px]">
      {{ description }}
    </p>
  </div>
</template>
