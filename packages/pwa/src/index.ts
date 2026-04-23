import type { VitePWAOptions } from 'vite-plugin-pwa';
import { VitePWA } from 'vite-plugin-pwa';

import { createVupManifest } from './manifest.ts';

export type { CreateVupManifestOptions, VupPwaIcon, VupWebAppManifest } from './manifest';
export { createDefaultPwaIcons, createVupManifest } from './manifest.ts';
export type { RegisterVupPwaOptions, VupPwaState } from './runtime.ts';
export {
  activateWaitingVupPwa,
  getVupPwaState,
  registerVupPwa,
  unregisterVupPwa,
  updateVupPwa,
} from './runtime.ts';

export interface CreateVupPwaPresetOptions {
  appName: string;
  shortName?: string;
  description?: string;
  swFilename?: string;
  swSrc?: string;
  scope?: string;
  startUrl?: string;
  enableInDev?: boolean;
  themeColor?: string;
  backgroundColor?: string;
}

export interface VupPwaPreset {
  injectRegister: 'auto';
  registerType: 'prompt';
  filename: string;
  srcDir?: string;
  strategies: 'generateSW' | 'injectManifest';
  manifest: ReturnType<typeof createVupManifest>;
  devOptions: {
    enabled: boolean;
  };
  workbox: {
    cleanupOutdatedCaches: boolean;
    navigateFallback: string;
    globPatterns: string[];
  };
}

export interface CreateVupPwaPluginOptions extends CreateVupPwaPresetOptions {
  overrides?: Partial<VitePWAOptions>;
}

/**
 * 生成一个可直接交给 vite-plugin-pwa 的默认配置对象。
 * 该包本身不强依赖 vite-plugin-pwa，避免把所有 app 模板都绑定到 PWA 插件。
 */
export function createVupPwaPreset(options: CreateVupPwaPresetOptions): VupPwaPreset {
  const {
    appName,
    shortName,
    description,
    swFilename = 'sw.js',
    swSrc,
    scope = '/',
    startUrl = '/',
    enableInDev = false,
    themeColor,
    backgroundColor,
  } = options;

  return {
    injectRegister: 'auto',
    registerType: 'prompt',
    filename: swFilename,
    ...(swSrc ? { srcDir: swSrc } : {}),
    strategies: swSrc ? 'injectManifest' : 'generateSW',
    manifest: createVupManifest({
      name: appName,
      scope,
      startUrl,
      ...(shortName ? { shortName } : {}),
      ...(description ? { description } : {}),
      ...(themeColor ? { themeColor } : {}),
      ...(backgroundColor ? { backgroundColor } : {}),
    }),
    devOptions: {
      enabled: enableInDev,
    },
    workbox: {
      cleanupOutdatedCaches: true,
      navigateFallback: 'index.html',
      globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    },
  };
}

export function createVupPwaPlugin(options: CreateVupPwaPluginOptions): unknown {
  const { overrides, ...presetOptions } = options;

  return VitePWA({
    ...createVupPwaPreset(presetOptions),
    ...overrides,
  });
}
