// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'src/',
  typescript: {
    strict: true,
    typeCheck: true,
  },
  css: ['@_shared/assets/styles/tailwind.scss'],
  vite: {
    css: {
      postcss: '../../postcss.config.js',
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api', 'import'],
        },
      },
    },
    resolve: {
      alias: {
        '@_shared': '../../../_shared',
      },
    },
  },
  devServer: {
    port: 9004,
  },
});
