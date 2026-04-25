# WXT Template

基于 WXT + Vue
3 的浏览器扩展模板。模板保留浏览器扩展常见入口，但保持低侵入：popup 和 options 只做轻量示例，newtab 作为展示页，background/content 保留最小入口。

## 技术栈

- WXT
- Vue 3
- TypeScript
- Tailwind CSS + `_shared/assets/styles/theme`

## 快速开始

```bash
pnpm --dir apps/wxt-template dev
```

构建和打包：

```bash
pnpm --dir apps/wxt-template build
pnpm --dir apps/wxt-template zip
```

开发构建输出到 `.output/chrome-mv3-dev/`，生产构建输出到 `.output/chrome-mv3/`。

## 目录结构

```txt
apps/wxt-template/
├── src/
│   ├── common/
│   │   └── extension-state.ts        # 跨 entrypoint 共享的 browser.storage 封装
│   ├── entrypoints/
│   │   ├── background.ts             # Manifest V3 service worker
│   │   ├── content.ts                # 内容脚本示例
│   │   ├── popup/                    # 扩展弹窗
│   │   ├── options/                  # 设置页
│   │   └── newtab/                   # 新标签页展示页
│   │       └── modules/demo/         # 只属于 newtab 的展示模块
│   └── manifest.ts
├── public/icon/
├── wxt.config.ts
└── README.md
```

## 入口说明

- `popup`：点击扩展图标打开，生命周期短，适合快速操作
- `options`：扩展设置页，展示 `browser.storage.local`
- `newtab`：完整 Vue 页面，用于展示模板能力
- `background`：Manifest V3 service worker，适合后台监听和消息中转
- `content`：注入到匹配网页的脚本，默认仅匹配 `https://example.com/*`

## 高内聚边界

- 跨多个 entrypoint 共享的能力放到 `src/common/`
- 只服务 newtab 展示页的内容放到 `src/entrypoints/newtab/`
- newtab 展示模块内部的数据留在组件内，不为了演示 props 强行外提
- popup/options 自己的局部状态不放到全局 common

## 权限原则

模板默认只申请：

```ts
permissions: ['storage'];
```

如果业务需要访问标签页、当前页面或跨域 API，再按需添加：

```ts
permissions: ['storage', 'activeTab', 'tabs'];
host_permissions: ['https://api.example.com/*'];
```

不要默认使用 `<all_urls>`，这会增加审核风险。

## 加载扩展

1. 运行 `pnpm --dir apps/wxt-template dev`
2. 打开 `chrome://extensions/`
3. 开启开发者模式
4. 加载 `.output/chrome-mv3-dev/`
