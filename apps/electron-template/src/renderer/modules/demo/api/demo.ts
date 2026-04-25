import type { DemoRuntimeResponse } from './types';

export async function getDemoRuntimeInfo(): Promise<DemoRuntimeResponse> {
  if (window.electronTemplate?.getRuntimeInfo) {
    return window.electronTemplate.getRuntimeInfo();
  }

  return {
    appVersion: 'web-preview',
    chrome: 'browser',
    electron: 'unavailable',
    node: 'unavailable',
    platform: 'browser',
  };
}
