# Stack: Nuxt

- Nuxt 使用 ofetch / `$fetch` / `useFetch`，不要引入 `@vup/http`。
- API 适配放 `src/api/`，不默认走 `src/modules/<name>/api`。
- 页面使用 `src/pages/` 文件路由。
- 业务逻辑优先沿用项目既有 composables/stores/server/api 组织方式，不强制 `src/modules`。
- 路由守卫使用 `src/middleware/*.ts`。
- 登录态优先使用 cookie，注意 SSR 和客户端 hydration。
- 运行时配置使用 Nuxt runtime config，公开变量用 `NUXT_PUBLIC_`。
- UI 可使用 vup UI 或 Nuxt 生态插件，以项目现有配置为准。
