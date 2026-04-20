# extends/

本目录用于存放**基座支持不了的功能扩展**——主要是非 JS/TS 技术栈的独立项目，如 Python 服务、Go 微服务、Java 服务、Rust 工具等。

## 与 apps/ packages/ 的区别

| 目录        | 范畴                                          | 依赖管理          |
| ----------- | --------------------------------------------- | ----------------- |
| `apps/`     | pnpm workspace 内的应用（Vue/Nuxt/Nest 等）   | 根 `pnpm install` |
| `packages/` | pnpm workspace 内的共享包（@vup/\* 等）       | 根 `pnpm install` |
| `extends/`  | **非 JS 项目** / 独立于 pnpm workspace 的扩展 | **各自独立管理**  |

## 何时使用

- 需要 Python 服务（如 AI 模型推理、数据处理）
- 需要 Go / Rust 高性能服务
- 需要独立部署的脚本工具集
- 任何 pnpm workspace 无法管理的项目类型

**注意**：如果某能力 JS 生态有成熟方案，**优先用 JS** 放到 `apps/` 或
`packages/`，避免技术栈分散。

## 目录命名规范

```
extends/
└── <feature-name>-<lang>/
```

- `<feature-name>`：功能名（kebab-case，如 `payment` / `image-process`）
- `<lang>`：语言后缀，明确技术栈（`-py` / `-go` / `-rs` / `-java`）

**示例**：

```
extends/
├── payment-py/             Python 支付服务
├── image-process-py/       Python 图像处理
├── crawler-go/             Go 爬虫服务
└── README.md               本文件
```

## 通用约定

每个 `extends/<name>/` 目录必须包含：

```
<name>/
├── README.md               项目说明（必需）
│                             - 功能简述
│                             - 技术栈版本（如 Python 3.11+）
│                             - 启动方式
│                             - 与 apps/ 中应用的对接方式（如有）
├── .env.example            环境变量模板（必需，禁止提交真实 .env）
└── <项目代码>
```

## 编码规范

各语言的编码规范由对应 rule 文件定义（按需启用）：

- Python → `.agent/rules/python-style.md`
- Go → `.agent/rules/go-style.md`（按需创建）
- Rust → `.agent/rules/rust-style.md`（按需创建）

通用规范（任何语言都遵守）：

- 注释用中文，代码标识符用英文
- 不提交 `.env` / 真实密钥到仓库
- 每个项目独立的依赖锁定文件（`requirements.txt` / `poetry.lock` / `go.sum` /
  `Cargo.lock`）
- 启动脚本统一封装在项目内 `Makefile` 或 `README` 的命令清单中

## 与 apps/ 应用的对接

`extends/` 下的服务通常作为 apps/ 中应用的后端 / 工具被调用：

- HTTP 接口：apps/ 通过 `axios` 调用 `extends/payment-py` 的 REST API
- 进程间：apps/ 通过 child_process 调用 `extends/cli-tool-go` 的可执行文件
- 消息队列：apps/ 与 extends/ 通过 Redis / RabbitMQ 异步通信

对接细节在各项目 README 中说明，并在 `docs/project/30-architecture.md`
中体现整体架构。

## 部署

`extends/`
下的项目通常需要独立的部署流水线（独立 Docker 镜像 / 独立服务器）。部署方案应在
`docs/project/80-deployment.md` 中明确。

## 何时不该用 extends/

- ❌ 仅是脚本片段（放 `scripts/` 目录）
- ❌ JS/TS 工具（放 `packages/`）
- ❌ 临时实验代码（放本地分支或独立仓库）
