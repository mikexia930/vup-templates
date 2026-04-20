# 模块化目录规范

所有业务代码按业务功能聚合到 `src/modules/<name>/`，每个模块自包含、可独立剥离。

## 前端模块结构（Vue / Electron / Capacitor）

```
src/
├── modules/                         # 业务模块（每个可独立剥离）
│   └── <name>/
│       ├── views/                   # 页面
│       ├── components/              # 模块内组件
│       ├── stores/                  # 模块 store
│       ├── api/                     # 模块 API 接口
│       ├── types/                   # 模块类型
│       └── composables/             # 模块 composable（可选）
├── shared/                          # 跨模块共享代码
│   ├── components/                  # 公共组件
│   ├── composables/                 # 公共 composable
│   ├── utils/                       # 工具函数（含 tokenStorage）
│   └── types/                       # 公共类型
├── api/
│   ├── request.ts                   # HTTP 客户端实例（基础设施）
│   └── types.ts                     # ApiResponse 等通用类型
├── layouts/                         # 布局组件
├── router/                          # 根路由配置
├── stores/                          # 全局 store（仅 app 级：auth、permission、app）
└── main.ts
```

## 后端模块结构（Nest）

Nest 本身已按模块化设计，保持一致即可：

```
src/
├── <module>/
│   ├── <module>.module.ts
│   ├── <module>.controller.ts
│   ├── <module>.service.ts
│   ├── dto/
│   ├── entities/
│   └── guards/（可选）
├── common/                          # 跨模块共享（拦截器、管道、过滤器）
└── database/
```

## Nuxt 例外

Nuxt 的 `pages/`、`components/`、`composables/`
是框架强制的自动导入目录，不能移入 `modules/`。Nuxt 应用的模块化体现在：

- 业务 store 按模块拆分到 `stores/<module>/`（如 `stores/user/index.ts`）
- 业务 API 按模块拆分到 `api/<module>/`（如 `api/user.ts`）
- 页面仍用 `pages/` 文件系统路由（Nuxt 约定）
- 组件仍用 `components/` 自动导入（Nuxt 约定）

## 模块 API 命名

- 模块接口文件放在 `src/modules/<name>/api/`
- 文件名用**资源名单数**：`task.ts`、`user.ts`、`auth.ts`
- 不要用 `taskService.ts`、`userService.ts` 这类重复命名（`api/`
  目录已表达语义）
- 一个文件代表一个资源的 API 集合；跨资源再拆新文件，不要堆到一个大文件

## 核心原则

- **模块间禁止互相 import**：如需共享，提取到 `shared/` 或 `common/`
- **全局 store 仅限 app 级**（auth、permission、app 设置），业务 store 跟模块走
- **新增业务功能 = 新增一个 module 目录**，不要往已有模块里混入无关逻辑
- **模块 API 跟模块走**：基础设施放 `src/api/`，业务请求函数放
  `src/modules/<name>/api/` 下对应资源文件中即可，不额外包一层 service class /
  service factory
- **通用响应类型从共享包导出**：`src/api/types.ts` 应 re-export `@vup/http` 的
  `ApiResponse`，避免多处重复定义漂移
- **Mock 只是开发辅助**：模块 API 文件可被 mock 拦截，但 mock 逻辑不要反向侵入业务模块结构；详见
  `packages/mock/README.md`（按需）
