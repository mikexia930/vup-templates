# Task: Add Page

## 何时使用

新增页面、路由、布局、组件、CRUD 列表、表单弹窗时使用。

## 先读

- `.agents/_core/rules/quality.md`
- `.agents/_core/rules/module.md`
- `.agents/_core/tasks/add-module.md`
- 目标 app 对应的 `.agents/_core/stacks/<stack>.md`

## 页面落点

- Vue/Electron renderer/Capacitor/WXT：业务页面放
  `src/modules/<module>/views/`，模块组件放 `src/modules/<module>/components/`。
- uni-app：页面入口放 `src/pages/<page>/index.vue`，复杂业务放
  `src/modules/<module>/`。
- Nuxt：页面放 `src/pages/`，不要为了统一前端结构强塞 `src/modules`。
- 全局布局放 `src/layouts/` 或 stack 既有布局目录。
- 路由、菜单、权限、i18n 按 stack 和现有项目注册方式同步。

## UI 规则

- 桌面端优先使用 `@vup/ui` 的 `V*` 组件。
- 移动端优先使用 `@vup/ui-mobile` 的 `VM*` 组件。
- 不直接使用底层 Element Plus / Ionic 组件，除非 vup 封装缺失。
- 封装缺失时优先在共享 UI 包补别名，而不是在业务里绕开。

## CRUD 最小结构

只在确实需要 CRUD 时创建：

- 主页面：搜索、表格、分页、操作列
- 表单组件：新增/编辑共用
- API 文件：list/get/create/update/delete，落点按
  `.agents/_core/tasks/add-api.md`
- Store：列表、分页、loading、当前查询
- 类型：实体、查询、表单

## 设计稿

- 有 `docs/designs/<page>.*` 时按设计稿实现。
- 没有设计稿但用户需求清楚时，按现有应用风格实现。
- 关键文案、字段、业务状态不明确时问用户。

## 验证

- 目标 app lint/build。
- 如启动 dev server 可行，检查页面无运行时错误。
