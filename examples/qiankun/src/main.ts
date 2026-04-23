import { createApp } from 'vue';
import type { App as VueApp } from 'vue';

import '@_shared/assets/styles/tailwind.scss';
import App from './App.vue';
import router from './router';
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

interface QiankunRenderProps {
  baseRoute?: string;
  container?: Element;
  onGlobalStateChange?: (callback: (state: unknown, prev: unknown) => void) => void;
}

let app: VueApp<Element> | null = null;

async function render(props: QiankunRenderProps = {}) {
  const { baseRoute, container } = props;
  app = createApp(App);

  app.use(router(baseRoute ?? '/'));

  const mountTarget = container?.querySelector('#app') ?? '#app';
  app.mount(mountTarget);
}

if (qiankunWindow.__POWERED_BY_QIANKUN__) {
  renderWithQiankun({
    mount(props: QiankunRenderProps) {
      props.onGlobalStateChange?.(() => {});
      // props.setGlobalState(appState);
      void render(props);
    },
    bootstrap() {},
    unmount() {
      if (app) {
        app.unmount();
        app = null;
      }
    },
    update() {},
  });
} else {
  void render();
}
