export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig();
  if (!import.meta.dev) return;
  if (!runtimeConfig.public.useMock) {
    console.info('[mock] OFF (set NUXT_PUBLIC_USE_MOCK=true to enable)');
    return;
  }

  const { startMockWorker } = await import('@vup/mock/browser');
  await startMockWorker();
  console.info('[mock] ON (set NUXT_PUBLIC_USE_MOCK=false to disable)');
});
