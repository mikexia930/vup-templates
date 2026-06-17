# Task: Add Auth

## 何时使用

登录、登出、refresh token、token 存储、路由守卫、权限菜单、按钮权限、RBAC 使用。

## 先读

- `.agent/tasks/add-api.md`
- `.agent/tasks/add-page.md`
- `.agent/rules/module.md`
- 目标 app 对应的 `.agent/stacks/<stack>.md`

## 组成

- Auth API：登录、登出、刷新、当前用户
- Token storage：按平台选择 localStorage/cookie/storage API
- Auth store：用户信息、登录态、登录/登出动作
- Request hook：注入 Authorization，处理 401/refresh
- Route guard：未登录跳转、已登录访问登录页跳转
- Permission：菜单、动态路由、按钮权限

## 文件落点

- Vue/Electron renderer/Capacitor/WXT：`src/modules/auth/` 放 auth 页面、API、局部组件。
- Nuxt：登录页通常放 `src/pages/login.vue`，守卫放 `src/middleware/`，登录态优先 cookie。
- uni-app：登录页放 `src/pages/login/index.vue`，业务逻辑可放 `src/modules/auth/`。
- Nest：鉴权模块放 `src/auth/`，不要放 `src/modules/auth/`。
- 全局 store：前端项目按既有风格放 `src/stores/auth.ts`、`src/stores/permission.ts` 或等价位置。
- Token 工具：前端按 stack 放到 `src/common/utils/tokenStorage.ts` 或既有工具目录。
- 权限指令：Vue 系通常放 `src/directives/permission.ts`，以项目现有注册方式为准。

## 平台差异

- Nuxt：优先 cookie + middleware。
- Nest：使用 module/provider/guard/decorator 组合，权限 metadata 跟随项目既有风格。
- WXT：注意 background/content/popup 的 token 同步。
- uni-app：使用 `uni.getStorageSync` / `uni.setStorageSync`。

## 必问

- Token 字段名和过期策略。
- refresh token 是否存在。
- 登录后默认跳转地址。
- 权限由前端静态配置、后端菜单树，还是两者结合。

## 禁止

- 不把 token 散落在组件中读写。
- 不在每个 API 文件重复写 401 处理。
- 不把权限码写死到多个页面；集中管理或按后端返回驱动。
