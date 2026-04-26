# .agent/

vup 基座的 AI 协作指令集。所有 AI 模型（Claude / Cursor / Copilot /
Gemini 等）在本仓库工作时，都以本目录为唯一指令来源（Single Source of Truth）。

## 目录结构

```
.agent/
├── README.md                    本文件（给人看：是什么 / 怎么维护）
├── rules/                       始终生效的强约束（AI 任何任务都遵守）
│   ├── ai-workflow.md             AI 行为契约（不跳步、必停顿、Gate 协议）
│   ├── project-global.md          全局项目约束
│   ├── commenting.md              注释规范
│   ├── typescript.md              TypeScript 规范
│   ├── vue-component.md           Vue 组件规范
│   ├── module-structure.md        模块化目录规范
│   └── http-request-governance.md 请求治理规范
└── skills/                      按需加载的"知识胶囊"（自包含目录）
    └── <skill-name>/
        ├── SKILL.md               必需，含 frontmatter（name + description）
        ├── references/            可选，详细参考文档（按需加载）
        ├── assets/                可选，静态资源（含文档模板）
        │   └── templates/         给 AI 复制后填充的产物模板
        ├── examples/              可选，参考代码（AI 学完后重写，不直接复制）
        └── scripts/               可选，可执行脚本（环境检查 / 生成器）
```

## 设计原则

### Rules vs Skills

- **Rules**（始终生效）：告诉 AI**不应该做什么 / 必须怎么写**
  - 例：注释用中文、禁止 `any`、提交前必跑 lint
- **Skills**（按需加载）：告诉 AI**怎么做某件事**
  - 例：怎么从零启动新项目、怎么写一个 CRUD 页面

两者**并列**，AI 加载所有 rules + 按场景加载相关 skills。

### Templates vs Skill Examples

这里的 `examples/` 指 **skill 目录内部的示例片段**，不是仓库根目录的 `examples/`
参考工程。`assets/templates/` 和 skill 内部 `examples/` 是两种不同的辅助资源：

| 类型                 | 用途                           | AI 行为            |
| -------------------- | ------------------------------ | ------------------ |
| `assets/templates/`  | 产物文档骨架（如需求文档框架） | **复制后填充**     |
| skill 内 `examples/` | 小段参考代码（如请求适配片段） | **学习模式后重写** |

**举例**：

- `.agent/skills/new-project/assets/templates/10-requirements.md` →
  AI 复制此文件到 `docs/project/10-requirements.md`，按用户回答填空
- `.agent/skills/http-client/examples/request.ts` →
  AI 学习 HTTP 适配层的写法，然后**为当前 app 的平台重新编写**

### Skill 自包含

每个 skill 是一个完整目录，包含自己需要的所有资源（模板、示例、脚本）。skill 之间通过 SKILL.md 中的引用建立关系，不依赖外部文件。

### AI 如何发现 skill

AI 启动时扫描所有 `<skill>/SKILL.md` 的 frontmatter（约 100 tokens 每个），通过
`description` 字段判断哪些 skill 与当前任务相关，按需加载完整 SKILL.md。

完整的 skill 调用机制遵循 [agentskills.io](https://agentskills.io/) 开放标准。

## 跨 AI 模型适配

本目录是 SSOT（单一事实源）。各 AI 客户端的入口文件（`AGENTS.md` / `CLAUDE.md` /
`.cursor/rules/*.mdc` / `.github/copilot-instructions.md` 等），由 `vup-cli`
命令在 `vup init` 后按用户选择的模型生成，统一指向本目录。

基座本身不维护任何客户端入口文件。

## 维护指南

### 新增一条 rule

在 `.agent/rules/` 下新建 `<rule-name>.md`，遵循现有 rule 的写法风格：

- 标题简短，说明约束的范畴
- 列出"必须 / 禁止"清单
- 给反例（❌ 错误写法）和正例（✅ 正确写法）

### 新增一个 skill

在 `.agent/skills/` 下新建 `<skill-name>/` 目录：

1. 必需创建 `SKILL.md`，frontmatter 至少包含 `name` 和 `description`
2. `description` 必须写清"何时使用"，这是 AI 自动匹配的关键
3. SKILL.md 控制在 500 行以内，详细内容拆到 `references/`
4. 文档模板放 `assets/templates/`，skill 内部参考代码放 `examples/`

### 修改 rule / skill

- rules 修改影响所有任务，慎重
- skills 修改前确认是否有其他 skill 引用了它
- 重大变更应同步更新本 README

## 与 docs/ 的关系

- `.agent/` = AI 工作的工具（模板、规则、流程）
- `docs/` = 项目实际产出的文档（用模板填出来的实例）

`.agent/skills/<x>/assets/templates/foo.md` 是模板（永远不变），
`docs/project/foo.md` 是产物（每个项目不同）。
