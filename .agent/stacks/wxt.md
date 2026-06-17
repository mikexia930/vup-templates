# Stack: WXT

- 目标目录通常是 `apps/<wxt-extension>/`。
- 入口放 `src/entrypoints/`。
- 共享逻辑放 `src/common/` 或 `src/composables/`。
- 复杂业务模块可放 `src/modules/<module>/`，以现有项目风格为准。
- 需要请求时再引入 `@vup/http`，不要为无请求场景提前接入。
- 登录态需要考虑 popup、content script、background 之间同步。
- 浏览器权限和 manifest 改动前先说明影响。
