import { createPinia } from 'pinia';
import { createApp } from 'vue';
import type { App as VueApp } from 'vue';

import '@_shared/assets/styles/tailwind.scss';
import App from './App.vue';
import i18n from './locales';
import router from './router';
import VupUI from '@vup/ui';
// 注册微应用，若果不是微应用，这段 qiankun 代码可删除
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

interface QiankunRenderProps {
  baseRoute?: string;
  container?: Element;
  onGlobalStateChange?: (callback: (state: unknown, prev: unknown) => void) => void;
}

let app: VueApp<Element> | null = null;
let mockStarted = false;

async function startMockIfNeeded() {
  if (mockStarted) return;
  if (!import.meta.env.DEV) return;
  const useMock = import.meta.env.VITE_ENABLE_MOCK !== 'false';
  if (!useMock) {
    console.info('[mock] OFF (set VITE_ENABLE_MOCK=true to enable)');
    return;
  }
  if (qiankunWindow.__POWERED_BY_QIANKUN__) return;

  const { startMockWorker } = await import('@vup/mock/browser');
  await startMockWorker();
  mockStarted = true;
  console.info('[mock] ON (set VITE_ENABLE_MOCK=false to disable)');
}

async function render(props: QiankunRenderProps = {}) {
  await startMockIfNeeded();

  const { baseRoute, container } = props;
  app = createApp(App);

  app.use(createPinia());
  app.use(router(baseRoute ?? '/'));
  app.use(i18n);
  app.use(VupUI);

  const mountTarget = container?.querySelector('#app') ?? '#app';
  app.mount(mountTarget);
}

if (qiankunWindow.__POWERED_BY_QIANKUN__) {
  // 在 qiankun 微服务中渲染应用, 如果不作为微应用，这段 qiankun 代码可删除
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
