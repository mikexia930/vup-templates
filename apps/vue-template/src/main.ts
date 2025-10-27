import { createPinia } from 'pinia';
import { createApp } from 'vue';

import '@_shared/assets/styles/tailwind.scss';
import App from './App.vue';
import i18n from './locales';
import router from './router';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

let app: any = null;

function render(props: any = {}) {
  const { baseRoute, container } = props;
  app = createApp(App);

  app.use(createPinia());
  app.use(router(baseRoute ?? '/'));
  app.use(i18n);

  app.mount(container ? container.querySelector('#app') : '#app');
}

if (qiankunWindow.__POWERED_BY_QIANKUN__) {
  // 在 qiankun 微服务中渲染应用, 如果不作为微应用，这段 qiankun 代码可删除
  renderWithQiankun({
    mount(props) {
      props.onGlobalStateChange((state: any, prev: any) => {
        // state: 变更后的状态; prev 变更前的状态
        console.log(state, prev);
      });
      // props.setGlobalState(appState);
      render(props);
    },
    bootstrap() {
      console.log('bootstrap');
    },
    unmount(_props: any) {
      console.log('unmount');
      if (app) {
        app.unmount();
        app = null;
      }
    },
    update(_props: any) {
      console.log('update');
    },
  });
} else {
  render();
}
