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
          additionalData: `@reference "tailwindcss";`,
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
    port: 9303,
  },

  modules: ['@nuxtjs/i18n', '@pinia/nuxt'],

  i18n: {
    defaultLocale: 'en-US',
    locales: [
      { code: 'zh-CN', name: '中文', file: 'zh-CN.json' },
      { code: 'en-US', name: 'English', file: 'en-US.json' },
    ],
    langDir: 'locales/',
    strategy: 'prefix_except_default',
  },
});
