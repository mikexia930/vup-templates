import antfu from '@antfu/eslint-config';

export default antfu({
  // 基础配置
  typescript: true,
  vue: true,
  stylistic: false,

  // 规则配置
  rules: {
    'ts/no-empty-object-type': 'off',
    'node/prefer-global/process': 'off',
  },

  // 针对不同项目的特殊配置
  overrides: [
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
