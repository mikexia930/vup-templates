# Task: Change Existing Module

## 何时使用

修改已有模块的页面、接口、状态、权限、类型或注册点时使用。

## 先读

- `.agents/_core/rules/core.md`
- `.agents/_core/rules/module.md`
- 目标 app 对应的 `.agents/_core/stacks/<stack>.md`

## 执行规则

- 先阅读目标模块现有 views/components/api/stores/types/locales 或 Nest
  module/controller/service/dto。
- 沿用该模块已有命名、状态管理、错误处理、i18n、权限写法。
- 不新增平行目录或第二套实现风格。
- 不跨模块深引用；需要复用能力时从模块 public API 暴露。

## 同步检查

- 改 API：同步类型、mock、调用方、错误处理。
- 改页面：同步路由、菜单、权限、i18n、空状态、loading。
- 改 Nest：同步 module
  imports/providers/controllers、entity、migration、seed、测试。
- 删除或移动文件前列出影响面并等待用户确认。

## 验证

- 优先运行目标 app/package 的 lint/build/test。
