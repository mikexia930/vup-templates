/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, unknown>;
  export default component;
}

declare module 'vite-plugin-qiankun/dist/helper' {
  interface QiankunLifecycles {
    bootstrap?: () => void;
    mount: (props: Record<string, unknown>) => void;
    unmount?: (props?: Record<string, unknown>) => void;
    update?: (props?: Record<string, unknown>) => void;
  }

  export const qiankunWindow: {
    __POWERED_BY_QIANKUN__?: boolean;
  };

  export function renderWithQiankun(lifecycles: QiankunLifecycles): void;
}
