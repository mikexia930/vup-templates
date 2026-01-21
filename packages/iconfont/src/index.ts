import VIconFont from './iconfont/VIconFont.vue';
import type { VIconFontProps } from './iconfont/types';
import type { App } from 'vue';

export { VIconFont, VIconFontProps };

export default {
  install(app: App) {
    app.component(VIconFont.name, VIconFont);
  },
};
