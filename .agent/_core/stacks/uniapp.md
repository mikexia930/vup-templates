# Stack: uni-app

- 请求层使用项目内 `src/libs/http`，不要直接套用 `@vup/http`。
- 页面入口放 `src/pages/<name>/index.vue`。
- 复杂业务实现放 `src/modules/<name>/`，页面入口保持薄。
- 新模块接入时同步 `src/pages.json`、i18n、store、API。
- Token 使用 `uni.getStorageSync` / `uni.setStorageSync`。
- 路由和页面注册需要同步 `src/pages.json`。
- 自动导入能力以实际 `auto-imports.d.ts` 和 Vite 配置为准。
- 注意多端兼容，使用平台 API 前确认目标端。
