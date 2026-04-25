import { createApp } from 'vue';
import type { App as VueApp } from 'vue';

import '@_shared/assets/styles/tailwind.scss';
import App from './App.vue';
import router from './router';
import { bindQiankunProps, resetQiankunRuntime } from './qiankun/state';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import type { QiankunRenderProps } from './qiankun/state';

let app: VueApp<Element> | null = null;

async function render(props: QiankunRenderProps = {}) {
  const { baseRoute, container, mode } = props;
  app = createApp(App);

  bindQiankunProps(props);
  app.use(router(baseRoute ?? '/', mode ?? 'standalone'));

  const mountTarget = container?.querySelector('#app') ?? '#app';
  app.mount(mountTarget);
}

if (qiankunWindow.__POWERED_BY_QIANKUN__) {
  renderWithQiankun({
    mount(props: QiankunRenderProps) {
      void render(props);
    },
    bootstrap() {},
    unmount() {
      if (app) {
        app.unmount();
        app = null;
      }
      resetQiankunRuntime();
    },
    update() {},
  });
} else {
  void render();
}
