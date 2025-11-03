import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'src',
  outDir: '.output',

  // 默认语言
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  // 多语言配置
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'VUP -> 1.5x',
      description: '让你告别繁琐的配置，专注业务逻辑的开发',
      themeConfig: {
        // 导航配置
        nav: [
          { text: '首页', link: '/' },
          { text: '文档', link: '/docs' },
        ],
        // 侧边栏配置
        sidebar: [
          {
            text: '指南',
            items: [{ text: '文档', link: '/docs' }],
          },
        ],
        // 搜索配置
        search: {
          provider: 'local',
          options: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'VUP -> 1.5x',
      description: 'Skip complex configurations, focus on business logic development',
      themeConfig: {
        // 导航配置
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Docs', link: '/en/docs' },
        ],
        // 侧边栏配置
        sidebar: [
          {
            text: 'Guide',
            items: [{ text: 'Documentation', link: '/en/docs' }],
          },
        ],
        // 搜索配置
        search: {
          provider: 'local',
          options: {
            translations: {
              button: {
                buttonText: 'Search docs',
                buttonAriaLabel: 'Search docs',
              },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear search',
                footer: {
                  selectText: 'Select',
                  navigateText: 'Navigate',
                  closeText: 'Close',
                },
              },
            },
          },
        },
      },
    },
  },

  vite: {
    resolve: {
      alias: {
        '@_shared': '../../_shared',
      },
    },
    server: {
      port: 9302,
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/images/vup.svg',
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
});
