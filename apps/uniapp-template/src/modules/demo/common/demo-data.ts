export interface DemoCommand {
  key: string;
  titleKey: string;
  descKey: string;
  command: string;
}

export interface DemoCapability {
  key: string;
  titleKey: string;
  descKey: string;
  accent: 'primary' | 'success' | 'warning';
}

export interface DemoStructureItem {
  path: string;
  descKey: string;
}

export const demoCommands: DemoCommand[] = [
  {
    key: 'h5',
    titleKey: 'demo.quickstart.h5.title',
    descKey: 'demo.quickstart.h5.desc',
    command: 'pnpm dev',
  },
  {
    key: 'weixin',
    titleKey: 'demo.quickstart.weixin.title',
    descKey: 'demo.quickstart.weixin.desc',
    command: 'pnpm dev:mp-weixin',
  },
  {
    key: 'app',
    titleKey: 'demo.quickstart.app.title',
    descKey: 'demo.quickstart.app.desc',
    command: 'pnpm dev:app',
  },
  {
    key: 'build',
    titleKey: 'demo.quickstart.build.title',
    descKey: 'demo.quickstart.build.desc',
    command: 'pnpm build:h5',
  },
];

export const demoCapabilities: DemoCapability[] = [
  {
    key: 'pages',
    titleKey: 'demo.capabilities.pages.title',
    descKey: 'demo.capabilities.pages.desc',
    accent: 'primary',
  },
  {
    key: 'http',
    titleKey: 'demo.capabilities.http.title',
    descKey: 'demo.capabilities.http.desc',
    accent: 'success',
  },
  {
    key: 'platform',
    titleKey: 'demo.capabilities.platform.title',
    descKey: 'demo.capabilities.platform.desc',
    accent: 'warning',
  },
];

export const demoStructure: DemoStructureItem[] = [
  {
    path: 'pages/index/index.vue',
    descKey: 'demo.structure.pages',
  },
  {
    path: 'modules/demo/components',
    descKey: 'demo.structure.components',
  },
  {
    path: 'modules/demo/api',
    descKey: 'demo.structure.api',
  },
  {
    path: 'modules/demo/stores',
    descKey: 'demo.structure.stores',
  },
  {
    path: 'modules/demo/locales',
    descKey: 'demo.structure.locales',
  },
  {
    path: 'libs/http',
    descKey: 'demo.structure.http',
  },
];
