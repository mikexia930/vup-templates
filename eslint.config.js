import antfu from '@antfu/eslint-config';

export default antfu({
  // 基础配置
  typescript: true,
  vue: true,
  stylistic: false,
  // 针对不同项目的特殊配置
  overrides: [
    // Vue 项目配置
    {
      files: ['apps/vue-template/**/*.{js,ts,vue}'],
      rules: {
        // Vue 特定规则
      },
    },

    // Nuxt 项目配置
    {
      files: ['apps/nuxt-template/**/*.{js,ts,vue}'],
      rules: {
        'no-undef': 'off', // Nuxt 全局函数
      },
    },

    // NestJS 项目配置
    {
      files: ['apps/nest-template/**/*.{js,ts}'],
      rules: {
        // NestJS 特定规则
      },
    },

    // UniApp 项目配置
    {
      files: ['apps/uniapp-template/**/*.{js,ts,vue}'],
      rules: {
        // UniApp 特定规则
      },
    },

    // 配置文件特殊处理
    {
      files: [
        '**/*.config.{js,ts}',
        '**/vite.config.*',
        '**/nuxt.config.*',
        '**/tailwind.config.*',
      ],
      rules: {
        'no-undef': 'off',
      },
    },
  ],

  // 忽略文件
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.nuxt/**',
    '**/.output/**',
    '**/.nitro/**',
    '**/.vitepress/cache/**',
    '**/.wxt/**',
  ],
});
