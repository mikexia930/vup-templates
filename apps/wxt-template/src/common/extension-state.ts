import { browser } from 'wxt/browser';

export interface ExtensionSettings {
  enableBadge: boolean;
  enableNotifications: boolean;
}

const defaultSettings: ExtensionSettings = {
  enableBadge: true,
  enableNotifications: true,
};

export async function getExtensionSettings(): Promise<ExtensionSettings> {
  const result = await browser.storage.local.get('settings');
  return {
    ...defaultSettings,
    ...(result.settings as Partial<ExtensionSettings> | undefined),
  };
}

export async function saveExtensionSettings(settings: ExtensionSettings) {
  await browser.storage.local.set({ settings });
}

export async function getFeatureEnabled(): Promise<boolean> {
  const result = await browser.storage.local.get('featureEnabled');
  return Boolean(result.featureEnabled);
}

export async function setFeatureEnabled(featureEnabled: boolean) {
  await browser.storage.local.set({ featureEnabled });
}
