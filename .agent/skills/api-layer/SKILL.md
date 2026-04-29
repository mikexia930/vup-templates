---
name: api-layer
description: >-
  Use when organizing module-level API functions, API request/response types,
  and request-layer file structure. Covers file naming (resource-name.ts),
  function naming (verb + resource), type re-export from @vup/http, and mock
  integration awareness. Works with http-client skill (provides request
  instance) and module-structure rule (defines directory layout).
---

# api-layer

模块 API 层的文件组织与命名约定。**核心原则：跟模块走、资源名命名、接口契约类型跟 API 走、通用类型从 @vup/http 统一导出、跨模块使用走模块 Public
API。**

## 适用范围

Vue / Electron 渲染进程 / Capacitor 的模块级 API 组织。

平台差异：

- Nuxt：不用 `src/modules/`，API 放 `src/api/<resource>.ts`，详见 `nuxt-app`
  skill
- uni-app：不用本 skill，API 组织已固化在 `uniapp-app` skill
- WXT：按 entrypoint/context 组织，只有采用 Vue 页面模块结构的 entrypoint 才参考本 skill

## 何时被加载

- new-project Phase 7 创建新模块的 API 文件
- new-feature 给现有模块加接口
- maintenance 调整 API 层结构

## 必须遵守

1. **文件位置**：模块接口放 `src/modules/<name>/api/<resource>.ts` （详见
   `.agent/rules/module-structure.md`）
2. **文件命名**：资源名单数 — `task.ts`、`user.ts`、`auth.ts`
   - ❌ 不要用 `taskService.ts`（`api/` 目录已表达"服务"语义）
   - ❌ 不要用 `task-api.ts`（后缀冗余）
3. **函数命名**：动词 + 资源 — `listTasks`、`getTask`、`createTask` （详见
   `.agent/rules/typescript.md`）
4. **通用类型 re-export**：`src/api/types.ts` 从 `@vup/http` re-export
   `ApiResponse`，不要重复定义
5. **接口契约类型跟 API 走**：请求参数、响应 DTO、列表返回项等只服务于接口的数据结构，放在
   `src/modules/<name>/api/types.ts` 或资源 API 文件旁；不要默认塞进模块
   `types/`
6. **模块 `types/` 只放模块级共享类型**：只有被 views / components / stores /
   api 多处共同理解的领域模型、筛选枚举、运行时状态类型，才放
   `src/modules/<name>/types/`
7. **一文件一资源**：一个 API 文件对应一个资源；跨资源拆新文件
8. **不要包 class / service factory**：直接导出具名 async 函数
9. **跨模块使用走 Public API**：如果其他模块需要调用本模块 API，在
   `src/modules/<name>/index.ts` 显式 re-export；禁止其他模块直接 import
   `src/modules/<name>/api/<resource>.ts`

## 目录结构

### 基础设施层（`src/api/`）

```
src/api/
├── request.ts          HTTP 客户端适配（见 http-client skill）
└── types.ts            通用类型 re-export + 项目级扩展类型
```

`types.ts` 标准内容：

```typescript
// 从 @vup/http re-export，避免重复定义漂移
export type { ApiResponse } from '@vup/http';

// 项目级扩展类型
export interface ApiListData<T = unknown> {
  items: T[];
  total: number;
}
```

### 业务层（`src/modules/<name>/api/`）

```
src/modules/
├── user/
│   ├── index.ts        用户模块 Public API
│   └── api/
│       ├── user.ts       用户资源 API
│       └── types.ts      用户接口请求 / 响应类型
├── order/
│   └── api/
│       ├── order.ts      订单资源 API
│       └── types.ts      订单接口请求 / 响应类型
└── demo/
    └── api/
        ├── task.ts       示例任务 API
        └── types.ts      示例任务接口契约类型
```

`index.ts` 只导出允许被外部模块复用的稳定能力：

```typescript
export { getUserOptions } from './api/user';
export type { UserOption } from './api/types';
```

## 标准 API 文件模板

```typescript
import request from '@/api/request';

// 接口契约类型：也可以放到同级 api/types.ts 后再 import type
export interface Task {
  id: number;
  title: string;
  status: 'pending' | 'done';
}

// 查询列表
export async function listTasks(params?: { status?: string }) {
  return request.get<Task[]>('/api/tasks', { params });
}

// 查询详情
export async function getTask(id: number) {
  return request.get<Task>(`/api/tasks/${id}`);
}

// 新增
export async function createTask(data: Omit<Task, 'id'>) {
  return request.post<Task>('/api/tasks', data);
}

// 更新
export async function updateTask(id: number, data: Partial<Task>) {
  return request.put<Task>(`/api/tasks/${id}`, data);
}

// 删除
export async function deleteTask(id: number) {
  return request.delete<null>(`/api/tasks/${id}`);
}
```

## Nuxt 例外

Nuxt 不使用 `src/modules/` 结构（详见 `.agent/rules/module-structure.md`
平台例外与 `nuxt-app` skill）。API 文件放在 `src/api/<resource>.ts`：

```
src/api/
├── request.ts          ofetch 适配层
├── types.ts            通用类型
├── task.ts             任务 API
└── user.ts             用户 API
```

## 与 Mock 的关系

- 基座使用 `@vup/mock`（MSW）拦截 API 请求提供开发环境数据
- API 文件本身不需要感知 mock——mock 在全局拦截层处理
- 只需确保 API 路径与 mock handler 路径一致
- 详见 `packages/mock/README.md`

## 关键决策点（AI 必须问用户）

1. **资源名**：这个接口对应的"资源"叫什么？（决定文件名和函数名前缀）
2. **类型放哪**：接口契约类型放 API 文件内，还是拆到
   `api/types.ts`？只有模块级共享领域类型才进入模块 `types/`
3. **是否需要 cancelKey**：列表查询是否需要搜索防抖 + takeLatest？

## 产出位置

- 基础设施：`apps/<app>/src/api/types.ts`
- 模块 API：`apps/<app>/src/modules/<name>/api/<resource>.ts`
- Nuxt：`apps/<nuxt>/src/api/<resource>.ts`

## 引用关系

本 skill 引用：

- `http-client` skill — 提供 `request` 实例
- `.agent/rules/module-structure.md` — 目录约定
- `.agent/rules/typescript.md` — 函数命名约定

本 skill 被引用：

- `crud-page` pattern — 实现 CRUD 页面时需要先建 API 层
- 各 stack skill — 实现新模块时加载

## 资源

```
api-layer/
└── SKILL.md              本文件（无需额外 examples，标准模板已内嵌）
```

**说明**：本 skill 不单独提供 examples 目录。API 文件模板已在 SKILL.md 内嵌，且
`http-client` skill 的 `examples/module-api/user.ts`
已是完整的模块接口范例。避免两处维护同一份 example。
