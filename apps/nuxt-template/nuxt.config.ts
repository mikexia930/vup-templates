export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'src/',
  devServer: {
    port: 9303,
  },
  typescript: {
    strict: true,
    typeCheck: false,
  },
  css: ['@_shared/assets/styles/tailwind.scss'],
  modules: ['@nuxtjs/i18n', '@pinia/nuxt'],
  // 自动导入类型
  imports: {
    dirs: ['types/**'],
  },
  app: {
    // 路径前缀，需要设置才会生效，构建命令：NUXT_APP_BASE_URL=/admin/ pnpm build
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    // 设置页面标题和关键词
    head: {
      title: '',
      meta: [
        { name: 'description', content: '' },
        { name: 'keywords', content: '' },
      ],
    },
  },
  i18n: {
    defaultLocale: 'en-US',
    locales: [
      { code: 'zh-CN', name: '中文', file: 'zh-CN.json' },
      { code: 'en-US', name: 'English', file: 'en-US.json' },
    ],
    langDir: 'locales/',
    strategy: 'prefix_except_default',
  },
  vite: {
    css: {
      postcss: '../../postcss.config.js',
    },
    resolve: {
      alias: {
        '@_shared': '../../../_shared',
      },
    },
    server: {
      // 客户端代理 api，捕获 path 为 /api 的请求，可以自定义，也可配置多个代理
      proxy: {
        '/api': {
          target: process.env.NUXT_PUBLIC_API_BASE || '',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  },
  nitro: {
    // 服务端构建优化（避免大依赖打包）
    externals: {
      inline: ['@vueuse/core'], // 常用工具库内联，减少请求
    },
    // 服务端代理 api，捕获 path 为 /api 的请求，可以自定义，也可配置多个代理
    devProxy: {
      '/api': {
        target: process.env.NUXT_PUBLIC_API_BASE || '',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
