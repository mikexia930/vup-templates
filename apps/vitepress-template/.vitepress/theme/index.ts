// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import '@_shared/assets/styles/tailwind.scss';
import './style.css';
import './styles.scss'; // 使用 SCSS 文件
import TailwindDemo from './components/TailwindDemo.vue';
import ScssDemo from './components/ScssDemo.vue';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 'page-bottom': () => h(TailwindDemo) // 注释掉，不在所有页面显示
    });
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('TailwindDemo', TailwindDemo);
    app.component('ScssDemo', ScssDemo);
  },
} satisfies Theme;
