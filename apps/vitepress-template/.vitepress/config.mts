import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'src',
  outDir: '.output',

  title: 'My Awesome Project',
  description: 'A VitePress Site',

  // Vite 配置，支持 Tailwind v4
  vite: {
    css: {
      postcss: '../../postcss.config.js',
      preprocessorOptions: {
        scss: {
          additionalData: `
            @reference "tailwindcss";
            @tailwind base;
            @tailwind components;
            @tailwind utilities;
          `,
        },
      },
    },
    resolve: {
      alias: {
        '@shared': '../../_shared',
      },
    },
    server: {
      port: 9003,
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
});
