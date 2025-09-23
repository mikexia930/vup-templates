import { defineManifest } from '@wxt/sdk';

export default defineManifest({
  name: 'VUP 1.5x',
  description: '基于 WXT + Vue 3 的现代化浏览器扩展开发模板',
  version: '1.1.0',
  manifest_version: 3,
  icons: {
    16: '/icon/16.png',
    32: '/icon/32.png',
    48: '/icon/48.png',
    96: '/icon/96.png',
    128: '/icon/128.png',
  },
  action: {
    default_popup: '/popup.html',
    default_title: 'VUP 1.5x 扩展',
  },
  background: {
    service_worker: '/background.js',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['/content.js'],
    },
  ],
  options_page: '/options.html',
  chrome_url_overrides: {
    newtab: '/newtab.html',
  },
  permissions: ['storage', 'activeTab', 'tabs'],
  host_permissions: ['<all_urls>'],
});
