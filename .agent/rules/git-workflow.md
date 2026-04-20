"# Git 工作流规范

## Commit Message 格式

必须遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Type（必须）

| Type       | 说明                     | 示例                               |
| ---------- | ------------------------ | ---------------------------------- |
| `feat`     | 新功能                   | `feat(user): 添加用户列表页`       |
| `fix`      | 修复 bug                 | `fix(auth): 修复 token 刷新死循环` |
| `docs`     | 文档变更                 | `docs: 更新 README`                |
| `style`    | 代码格式（不影响逻辑）   | `style: 统一缩进为 2 空格`         |
| `refactor` | 重构（非新功能、非修复） | `refactor(api): 提取公共请求参数`  |
| `perf`     | 性能优化                 | `perf(list): 虚拟滚动优化大列表`   |
| `test`     | 测试相关                 | `test(auth): 补充登录单测`         |
| `chore`    | 构建 / 工具 / 依赖       | `chore: 升级 vite 到 6.x`          |
| `ci`       | CI/CD 配置               | `ci: 添加 lint workflow`           |
| `revert`   | 回退                     | `revert: 回退 feat(user)`          |

### Scope（推荐）

- 模块名：`user` / `order` / `auth` / `demo`
- 包名：`http` / `ui` / `mock`
- 应用名：`vue` / `nuxt` / `electron`
- 基础设施：`router` / `i18n` / `ci`

### Description（必须）

- 用中文或英文，项目内统一
- 祈使句，不加句号
- 说「做了什么」不说「为什么」（为什么写在 body）

### 示例

```
feat(user): 添加用户列表搜索功能

支持按用户名和状态筛选，搜索加了 300ms 防抖。
关联 #42

BREAKING CHANGE: getUserList 参数从 string 改为 UserQuery 对象
```

## 分支命名

```
main                           主分支（生产）
develop                        开发分支（可选，小团队可不用）
feature/<module>-<desc>        功能分支
fix/<module>-<desc>            修复分支
hotfix/<desc>                  紧急修复
release/<version>              发布分支（配合 release-it）
```

示例：

- `feature/user-list-search`
- `fix/auth-refresh-loop`
- `hotfix/login-500-error`

## AI 提交行为

- AI 建议 commit message 时**必须**遵循上述格式
- AI **不要**自动执行 `git commit`（除非用户明确要求）
- AI 可以建议合适的 type 和 scope，但 description 内容需用户确认
- 多个不相关改动**不要**合成一个 commit（原子提交）

## 基座已有工具

- `husky`：pre-commit 钩子自动跑 lint-staged
- `release-it` + `@release-it/conventional-changelog`：版本发布 +
  CHANGELOG 自动生成（angular preset）
- `pnpm release`：触发版本发布流程

## 版本发布规则

### 触发条件

当用户提到「发布」「上线」「版本号」「changelog」「tag」任一关键词时，AI
**必须**提醒用户 `pnpm release` 流程，而不是手动改版本号或手动打 tag。

### 收尾条件

若本次任务包含生产发布动作，AI 在结束前**必须**问一句：

> "是否需要执行 `pnpm release` 生成版本与 changelog？"

### 禁忌

AI **不得**只做 `git commit` + `deploy` 就结束发布任务。必须走 `pnpm release`
流程，除非用户明确说"本次跳过 release"。"
