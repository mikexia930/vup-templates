import antfu from '@antfu/eslint-config';

export default antfu({
  // 基础配置
  typescript: true,
  vue: true,
  stylistic: false,

  // 规则配置
  rules: {
    'ts/no-empty-object-type': 'off',
    'ts/no-require-imports': 'off',
    'node/prefer-global/process': 'off',
    'no-console': 'off',
    'no-alert': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'perfectionist/sort-named-imports': 'off',
    'perfectionist/sort-exports': 'off',
    'perfectionist/sort-imports': 'off',
    'perfectionist/sort-array-includes': 'off',
    'perfectionist/sort-object-types': 'off',
    'perfectionist/sort-union-types': 'off',
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
