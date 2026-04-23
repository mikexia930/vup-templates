export interface VupPwaIcon {
  src: string;
  sizes: string;
  type?: string;
  purpose?: 'any' | 'maskable' | 'monochrome' | string;
}

export interface VupWebAppManifest {
  name: string;
  short_name: string;
  description?: string;
  theme_color: string;
  background_color: string;
  display: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
  start_url: string;
  scope: string;
  orientation?: 'portrait' | 'landscape' | 'any';
  lang?: string;
  icons: VupPwaIcon[];
}

export interface CreateVupManifestOptions {
  name: string;
  shortName?: string;
  description?: string;
  themeColor?: string;
  backgroundColor?: string;
  display?: VupWebAppManifest['display'];
  startUrl?: string;
  scope?: string;
  orientation?: VupWebAppManifest['orientation'];
  lang?: string;
  icons?: VupPwaIcon[];
}

export function createDefaultPwaIcons(base = '/pwa') {
  return [
    { src: `${base}/icon-192.png`, sizes: '192x192', type: 'image/png' },
    { src: `${base}/icon-512.png`, sizes: '512x512', type: 'image/png' },
    {
      src: `${base}/icon-512-maskable.png`,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
  ] satisfies VupPwaIcon[];
}

export function createVupManifest(options: CreateVupManifestOptions): VupWebAppManifest {
  const {
    name,
    shortName = name,
    description,
    themeColor = '#0f172a',
    backgroundColor = '#ffffff',
    display = 'standalone',
    startUrl = '/',
    scope = '/',
    orientation = 'any',
    lang = 'zh-CN',
    icons = createDefaultPwaIcons(),
  } = options;

  return {
    name,
    short_name: shortName,
    theme_color: themeColor,
    background_color: backgroundColor,
    display,
    start_url: startUrl,
    scope,
    orientation,
    lang,
    icons,
    ...(description ? { description } : {}),
  };
}
