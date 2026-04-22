---
name: new-project
description: >-
  Interactive 9-phase workflow for starting a new project from scratch on the
  vup base. Use when user says "用 vup-agent 开发新项目" / "start a new project"
  / "我要做一个新系统" / "从零开始做", or whenever there is no existing
  docs/project/ content and the user wants to begin development. Drives
  requirements gathering, tech stack selection, architecture design, UI spec,
  API contract, task breakdown and coding, with a hard user-confirmation gate at
  every phase boundary.
---

# 从零启动新项目

本 skill 引导 AI 与用户**交互式完成**新项目的全流程开发。共 9 个 Phase，每个 Phase 结束**必须停下来**等用户确认后才能进入下一个。

> 行为契约见
> `.agent/rules/ai-workflow.md`，所有 Gate 协议、决策落盘规则都遵守该契约。

## 适用场景

- 用户说"用 vup-agent 开发新项目" / "从零开始做"
- `docs/project/` 目录为空或不存在
- 用户希望以基座规范化方式启动一个新业务项目

## 不适用场景

- 给已有项目加新功能 → 用 `new-feature` skill
- 维护 / 改 bug → 用 `maintenance` skill

## 9 阶段流程总览

| Phase | 名称       | 输入                | 产出                                                        | Gate 用户决策                 |
| ----- | ---------- | ------------------- | ----------------------------------------------------------- | ----------------------------- |
| 0     | 环境体检   | 无                  | 终端报告（不落盘）                                          | 是否处理告警                  |
| 1     | 需求收集   | 用户口述            | `docs/project/10-requirements.md`                           | 范围 / 优先级 / MVP 边界      |
| 2     | 技术栈选型 | 需求 + 基座清单     | `docs/project/20-tech-stack.md`                             | 选定栈组合（可能含 extends/） |
| 3     | 架构设计   | 选型                | `docs/project/30-architecture.md`                           | 模块划分 / 数据流             |
| 4     | UI/交互稿  | 用户提供 Figma/截图 | `docs/project/40-ui-spec.md`                                | 页面清单 / 关键交互           |
| 5     | 接口契约   | UI + 架构           | `docs/project/50-api-contract.md` + `docs/api/openapi.yaml` | 字段命名 / 分页风格 / 错误码  |
| 6     | 任务拆分   | 上述全部            | `docs/project/60-task-list.md`                              | 任务粒度 / 优先级             |
| 7     | 编码实现   | task list           | 代码 + 回写 task 完成状态                                   | **每个 task 完成都要 Gate**   |
| 8     | 完结归档   | 实际产出            | 更新所有 docs / changelog                                   | 是否进入维护期                |

详细每阶段操作见 `references/` 目录下对应文档。

## Phase 推进规则

### 启动方式

AI 收到"用 vup-agent 开发新项目"等触发词后：

1. 先汇报："我将按 9 阶段流程引导你完成新项目开发，每阶段结束都会停下等你确认。准备好了吗？"
2. **重申最高准则**："过程中我遇到任何不清楚的地方都会停下来问你，绝不会自己猜。请你也尽量把信息说清楚——多聊几句，少返工。"
3. 等用户回复"继续"
4. 进入 Phase 0

### 全流程禁止行为（呼应 ai-workflow.md 最高准则）

本 skill 的每个 Phase 都遵守：

- ❌ 禁止 AI 自己"补全"业务细节
- ❌ 禁止把假设写进文档（即使标记 TODO 也不行）
- ❌ 禁止用"通用做法"代替用户的具体决策
- ✅ 任何不确定 → 立即停下问
- ✅ 用户回答模糊 → 追问到具体可执行

### 单 Phase 执行模板

```
[Phase X: <名称>] 开始

本阶段目标：<一句话>
本阶段产出：<文件路径>

<执行内容：与用户对话 / 生成文档草稿>

[Phase X: <名称>] 完成

产出：
  - 创建 docs/project/XX-xxx.md
  - 关键决策已记录到 docs/project/90-decision-log.md

下一步预告：[Phase X+1: <名称>]
  - 将做：<一句话>
  - 需要你提供：<信息>

等待你确认（继续 / 调整 / 回退）
```

### Gate 用户回复（详见 ai-workflow.md）

- `继续` → 进入下一 Phase
- `调整：xxx` → 修订当前 Phase 产物
- `回退到 Phase N` → 回到指定阶段

## 各 Phase 详细指引

### Phase 0：环境体检

本阶段不落盘文档，仅在终端汇报，等用户确认。

操作步骤：

1. 执行 `bash .agent/skills/new-project/scripts/env-check.sh`
2. 解读退出码：`0` = 全过 / `1` = 有警告 / `2` = 有失败
3. 把脚本完整输出展示给用户
4. 如果有 ❌ 失败项或 ⚠️ 警告项，列出修复建议（脚本已给出），问用户：
   - **A. 我帮你装/切换**（AI 执行命令前必须告知用户每条命令，遵守
     `.agent/rules/ai-workflow.md`）
   - **B. 你自己装，等你装完回复"done"**
   - **C. 跳过**（仅警告项可跳过，失败项不允许跳过）
5. 安装/切换完成后，**重新跑一次脚本验证**
6. 全部通过 → 进入 Phase 1

关键规则：

- **失败项必须解决**才能进入 Phase 1，不接受"跳过"
- **切换 Node 版本（nvm use / volta
  pin）**：AI 必须先告知"该命令只对当前shell 有效，请你也在自己的终端执行"，等用户确认后再继续
- **安装命令**（如
  `volta install node@22`）执行前，AI 必须**完整列出**将要执行的命令清单，等用户回复
  `y` 后才执行

### Phase 1：需求收集

1. 复制 `assets/templates/10-requirements.md` 到
   `docs/project/10-requirements.md`
2. 按模板的引导问题，与用户**对话式收集**需求
3. **严禁 AI 自己"猜"业务**——每个 `<...>` 占位符都必须由用户亲口回答
4. 用户回答模糊（如"差不多就行""看着办"），AI 必须追问到具体内容
5. 不允许在文档里残留 `<...>` 占位符或"待定"字样
6. 完成后输出文档预览，等用户**逐章节**确认

详见 `references/phase-1-requirements.md`。

### Phase 2：技术栈选型

1. 复制 `assets/templates/20-tech-stack.md`
2. 基于 Phase
   1 需求 + 基座可用清单（`.template.config.json`），提供 2-3 套候选方案 + 推荐
3. **严禁擅自引入基座外的技术栈**——只能从 `.template.config.json` 中选
4. **基座支持不了的能力（如需要 Python 服务）**，明确放入
   `extends/<feature-name>/`，说明独立管理依赖
5. 用户对某方案有疑问 → 解释清楚再让用户选，不要替用户决定
6. 等用户**明确选定一个方案**，落盘（不接受"都可以""你定"等模糊回复）
7. 选型确认后，如需接入基座资源，按资源类型执行：
   - 模板接入：`vup add <template-name>`
   - 功能包接入：`vup use <package-name>`
8. `vup`
   命令为交互式时，默认由用户执行；AI 需提供可复制命令，并要求用户回传关键选择和完整输出
9. 仅在用户明确同意时，AI 才可走降级方案：从本机 `vup-cli`
   安装目录拷贝模板/包骨架，并说明来源路径、目标路径与潜在差异点

**如选定了 Nest 后端**，必须追问以下基础设施选型：

- 数据库：MySQL / MariaDB / PostgreSQL / MongoDB / SQLite？
- 缓存：是否需要 Redis？
- 消息队列：是否需要？RabbitMQ / BullMQ / Kafka？
- 其他服务：MinIO / Elasticsearch / ...？
- **端口号确认**：列出所有服务的默认端口，让用户确认或修改，避免与本地已有服务冲突
- Docker：本地是否已安装 Docker？是否用 docker-compose 管理开发环境？

基座 nest-template 的 `docker-compose.yml` 是 demo（MariaDB +
Redis），按用户选择替换为实际的服务组合。详见 `nest-api` skill。

**前端应用端口确认**：各 app 的 dev
server 端口也需确认，避免多个 app 同时开发时冲突。

详见 `references/phase-2-tech-stack.md`。

### Phase 3：架构设计

基于选型，产出模块划分、目录结构、数据流图。

- **严禁 AI 自己"按经验"划分模块**——必须基于 Phase 1 需求文档中的功能列表
- 模块边界不清时，停下来与用户讨论："功能 X 应归属于模块 A 还是 B？"
- 模块命名必须由用户确认（中英文对照）

详见 `references/phase-3-architecture.md`。

### Phase 4：UI/交互稿

请用户提供 Figma 链接 / 截图 / 文字描述，AI 整理为页面清单 + 关键交互。如用户提供截图或导出图，统一存放到
`docs/designs/`（按页面命名，如 `login.png`）。

- 用户没提供任何 UI 素材时，**严禁 AI 自己"想象"页面长什么样**
- 必须停下来问："你能提供设计稿 / 参考产品 / 文字描述吗？"
- 文字描述也要追问到具体（按钮、表单字段、交互反馈、空状态、错误提示）

详见 `references/phase-4-ui-spec.md`。

### Phase 5：接口契约

基于 UI + 架构反推 API，产出 Markdown 接口文档 + OpenAPI 片段。

- 字段命名风格（驼峰 / 下划线）→ 必须与用户确认
- 分页风格（page+size / cursor）→ 必须与用户确认
- 错误码规范（业务码 / HTTP 码 / 双层）→ 必须与用户确认
- 严禁 AI 自己"按主流做法"决定，必须列方案让用户选

详见 `references/phase-5-api-contract.md`。

### Phase 6：任务拆分

将开发拆为可执行的 task 清单（每个 task 1-4 小时粒度），编号、优先级、依赖关系。

- 任务粒度由用户确认（小颗粒 = 多 Gate 但安全；大颗粒 = 快但风险高）
- 优先级由用户决定，AI 只能建议不能自定

详见 `references/phase-6-task-list.md`。

### Phase 7：编码实现

按 task list 顺序实现，**每完成一个 task 都要 Gate**：

```
✅ Task #N: <标题> 完成

变更：
  - 创建 X 个文件
  - 关键文件：xxx

是否进入 Task #N+1？（继续 / 调整 / 回退）
```

编码过程中遇到任何疑问（命名、UI 文案、空状态、错误提示），**立即停下问**，禁止用"通用写法"或"TODO"应付。

如用户希望批量推进，可回复 `批量执行 N-M 不打断`。

详见 `references/phase-7-coding.md`。

### Phase 8：完结归档

回顾所有 docs，确认与最终代码一致；生成项目 README 和 CHANGELOG；询问是否进入维护期（切换到
`maintenance` skill）。

## 与其他 skill 的关系

- 加载基础：所有 `.agent/rules/*.md`（始终生效）
- Phase 2 选定栈后，加载对应 stack skill：`vue-app` / `nuxt-app` / `nest-api` 等
- Phase 3-5 涉及业务模式时，加载对应 pattern skill：`crud-page` / `auth-login` /
  `permission-rbac` / `admin-layout` / `api-layer`
- Phase 7 编码时，参考对应 stack 的 `examples/` 学习模式

## 资源目录

```
new-project/
├── SKILL.md                  本文件
├── references/               每阶段的详细操作指引（按需加载，仅复杂阶段需要）
│   ├── phase-1-requirements.md
│   ├── phase-2-tech-stack.md
│   ├── phase-3-architecture.md
│   ├── phase-4-ui-spec.md
│   ├── phase-5-api-contract.md
│   ├── phase-6-task-list.md
│   ├── phase-7-coding.md
│   └── phase-8-archive.md
├── assets/
│   └── templates/            产出文档骨架（复制到 docs/project/ 后填充）
│       ├── 10-requirements.md
│       ├── 20-tech-stack.md
│       ├── 30-architecture.md
│       ├── 40-ui-spec.md
│       ├── 50-api-contract.md
│       ├── 60-task-list.md
│       └── 90-decision-log.md
└── scripts/
    └── env-check.sh          Phase 0 环境体检脚本（仅检测，不安装）
```

**说明**：Phase
0 直接在 SKILL.md 中描述完毕，不单独建 references 文件。其他 Phase 如内容简单，也可不建 references。
