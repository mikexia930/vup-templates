import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import vue from 'eslint-plugin-vue';

export default [
  // 基础JavaScript推荐配置
  js.configs.recommended,

  // Vue基础配置
  ...vue.configs['flat/base'],
  ...vue.configs['flat/recommended'],

  // 全局配置
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
    },
  },

  // TypeScript文件配置
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      prettier,
    },
    rules: {
      // Prettier规则 - 让Prettier处理所有格式化
      'prettier/prettier': 'error',

      // TypeScript特定规则
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',

      // Airbnb风格的最佳实践（非格式化相关）
      'prefer-const': 'error',
      'no-var': 'error',
      'arrow-spacing': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-destructuring': [
        'error',
        {
          array: true,
          object: true,
        },
      ],
      'prefer-spread': 'error',
      'no-useless-constructor': 'error',
      'no-duplicate-imports': 'error',

      // 导入规则
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc' },
        },
      ],
      'import/no-unresolved': 'off', // TypeScript会处理
      'import/extensions': ['error', 'never', { vue: 'always' }],

      // 其他规则
      'no-console': 'off', // 开发时允许console
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
    },
  },

  // Vue文件配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        parser: tsparser,
        parserOptions: {
          project: './tsconfig.json',
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
      prettier,
    },
    rules: {
      'vue/max-attributes-per-line': 'off',
      'vue/html-self-closing': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      // Prettier规则 - 让Prettier处理所有格式化
      'prettier/prettier': 'error',

      // TypeScript规则
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
      'vue/no-multiple-template-root': 'off',
      'vue/no-v-model-argument': 'off',
      'vue/require-v-for-key': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',

      // Airbnb风格的最佳实践（非格式化相关）
      'prefer-const': 'error',
      'no-var': 'error',
      'arrow-spacing': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-destructuring': [
        'error',
        {
          array: true,
          object: true,
        },
      ],
      'prefer-spread': 'error',
      'no-useless-constructor': 'error',
      'no-duplicate-imports': 'error',

      // 导入规则
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc' },
        },
      ],
      'import/no-unresolved': 'off',
      'import/extensions': ['error', 'never'],

      // 其他规则
      'no-console': 'off',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
    },
  },

  // JavaScript文件配置
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      import: importPlugin,
      prettier,
    },
    rules: {
      // Prettier规则 - 让Prettier处理所有格式化
      'prettier/prettier': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'arrow-spacing': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-destructuring': [
        'error',
        {
          array: true,
          object: true,
        },
      ],
      'prefer-spread': 'error',
      'no-useless-constructor': 'error',
      'no-duplicate-imports': 'error',

      // 导入规则
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc' },
        },
      ],
      'import/extensions': ['error', 'never'],

      // 其他规则
      'no-console': 'off',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
    },
  },

  // 配置文件特殊处理
  {
    files: ['*.config.js', '*.config.ts', 'vite.config.*', 'tailwind.config.*', 'postcss.config.*'],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
    rules: {
      'import/order': 'off',
      'prettier/prettier': 'off', // 配置文件不强制格式化
    },
  },

  // 忽略特定文件
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.min.js',
      'pnpm-lock.yaml',
      '**/.nuxt/**',
      '**/.output/**',
      '**/.nitro/**',
      '**/.vitepress/cache/**',
      '**/.wxt/**',
    ],
  },
];
