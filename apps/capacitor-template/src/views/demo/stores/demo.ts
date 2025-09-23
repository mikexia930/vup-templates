export const storeDemo = defineStore('demo', () => {
  const count: Ref<number> = ref(0);
  const lastUpdated: Ref<string> = ref('');

  const increment = (): void => {
    count.value++;
    lastUpdated.value = new Date().toLocaleTimeString();
  };

  const decrement = (): void => {
    count.value--;
    lastUpdated.value = new Date().toLocaleTimeString();
  };

  const reset = (): void => {
    count.value = 0;
    lastUpdated.value = new Date().toLocaleTimeString();
  };

  const doubleCount = computed(() => count.value * 2);

  return {
    count,
    lastUpdated,
    doubleCount,
    increment,
    decrement,
    reset,
  };
});
