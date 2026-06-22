# Task: Add API

## 何时使用

新增或修改请求实例、业务 API、mock handler、接口类型、响应结构时使用。

## 先读

- `.agents/_core/rules/quality.md`
- `.agents/_core/rules/module.md`
- 目标 app 对应的 `.agents/_core/stacks/<stack>.md`

## 默认约定

- Vue/Electron/Capacitor/WXT：默认使用模板自带的自包含
  `src/api/request.ts`（原生 fetch）；项目已接入 `@vup/http`
  时优先复用，需要共享能力时再用 `vup package add @vup/http` 接入。
- Nuxt：使用 ofetch / `$fetch` / `useFetch`，不要引入
  `@vup/http`；内置 demo 数据用 Nitro server route（`src/server/api/*`）。
- uni-app：使用项目内 `src/libs/http` 适配层。
- 通用响应类型不要多处重复定义；默认在 `src/api/types.ts` 本地定义，接入
  `@vup/http` 后再从共享层 re-export。

## 文件落点

- 应用请求适配：`src/api/request.ts`
- 通用类型：`src/api/types.ts`
- 模块 API：`src/modules/<module>/api/<resource>.ts`
- Mock：优先看 `@vup/mock` 或现有 mock 目录
- Nuxt 例外：API 通常放 `src/api/<resource>.ts`
- Nest 例外：Controller/Service/DTO 跟随 `src/<module>/`
- uni-app 例外：请求适配使用 `src/libs/http` 或项目既有封装，业务 API 跟随模块。

## API 命名

- `listUsers`
- `getUser`
- `createUser`
- `updateUser`
- `deleteUser`

避免 `fetchData`、`handleApi`、`requestUser` 这类含糊命名。

## 禁止

- 不在组件里直接写 axios/fetch 业务请求。
- 不为单个业务模块重新封装一套 HTTP client。
- 不把接口返回结构猜成业务事实；字段不确定时问用户。

## 验证

- TypeScript/lint。
- 有 mock 或接口测试时运行对应测试。
