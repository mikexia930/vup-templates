export interface ElectronRuntimeInfo {
  appVersion: string;
  chrome: string;
  electron: string;
  node: string;
  platform: string;
}

declare global {
  interface Window {
    electronTemplate?: {
      getRuntimeInfo: () => Promise<ElectronRuntimeInfo>;
    };
  }
}
