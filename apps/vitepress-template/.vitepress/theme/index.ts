// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import './styles.scss';
import Demo from './components/Demo.vue';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 'page-bottom': () => h(Footer)
    });
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('Demo', Demo);
  },
} satisfies Theme;
