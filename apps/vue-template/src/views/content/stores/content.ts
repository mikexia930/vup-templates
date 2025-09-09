import { defineStore } from 'pinia';

export const storeContent = defineStore('content', () => {
  const count: Ref<number> = ref(0);

  const increment = (): void => {
    count.value++;
  };

  return { count, increment };
});
