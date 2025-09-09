// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'src/',
  typescript: {
    strict: true,
    typeCheck: true,
  },
  css: ['@shared/assets/styles/tailwind.scss'],
  vite: {
    css: {
      postcss: '../../postcss.config.js',
      preprocessorOptions: {
        scss: {
          additionalData: '@reference "tailwindcss";',
        },
      },
    },
    resolve: {
      alias: {
        '@shared': '../../../_shared',
      },
    },
  },
  devServer: {
    port: 9004,
  },
});
