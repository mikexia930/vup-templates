---
name: crud-page
description: >-
  Use when implementing a standard CRUD page (table + search + pagination +
  dialog form + delete confirmation). This is the most common business page
  pattern in admin panels. Orchestrates api-layer, vup-ui, permission-rbac and
  module-structure rule into a complete working page.
---

# crud-page

标准增删改查页面模式。**适用于 90% 的后台管理页面**。

## 适用场景

- 用户管理、订单管理、商品管理等列表页
- 表格 + 搜索 + 分页 + 新增/编辑弹窗 + 删除确认

## 何时被加载

- new-project Phase 7 实现业务模块的列表页
- new-feature 在后台管理加新的 CRUD 模块

## 引用的 skills

| 能力      | 加载哪个 skill                                                   |
| --------- | ---------------------------------------------------------------- |
| API 函数  | `api-layer`（list / get / create / update / delete）             |
| HTTP 请求 | `http-client`（@vup/http）                                       |
| UI 组件   | `vup-ui`（VTable / VPagination / VDialog / VForm / VButton ...） |
| 按钮权限  | `permission-rbac`（v-permission 指令）                           |
| 目录约定  | `.agent/rules/module-structure.md`                               |

## 页面组成

```
┌─────────────────────────────────────────┐
│ 搜索区域（VForm inline）                │
│  [关键词] [状态下拉] [搜索] [重置]      │
├─────────────────────────────────────────┤
│ 操作栏                                  │
│  [+ 新增] [批量删除]                    │
├─────────────────────────────────────────┤
│ 数据表格（VTable）                      │
│  # │ 名称 │ 状态 │ 创建时间 │ 操作     │
│  1 │ ...  │ ...  │ ...      │ 编辑 删除│
│  2 │ ...  │ ...  │ ...      │ 编辑 删除│
├─────────────────────────────────────────┤
│ 分页（VPagination）                     │
│  < 1 2 3 ... 10 >   共 100 条          │
└─────────────────────────────────────────┘

弹窗（VDialog）
┌──────────────────────┐
│ 新增 / 编辑 <资源名>  │
│                      │
│  名称：[________]    │
│  状态：[下拉选择]    │
│                      │
│  [取消]  [确定]      │
└──────────────────────┘
```

## 文件结构

一个完整 CRUD 模块的文件：

```
src/modules/<name>/
├── views/
│   └── <Name>Page.vue              主页面（搜索 + 表格 + 分页）
├── components/
│   └── <Name>FormDialog.vue        新增/编辑弹窗
├── api/
│   └── <name>.ts                   5 个 CRUD 接口函数
├── stores/
│   └── use<Name>Store.ts           列表状态 + loading + 分页
└── types/
    └── <name>.ts                   接口类型
```

## 实现步骤

### Step 1：定义类型

```typescript
// types/<name>.ts
export interface User {
  id: number;
  username: string;
  status: 'active' | 'disabled';
  createdAt: string;
}

export interface UserQuery {
  keyword?: string;
  status?: string;
  page: number;
  size: number;
}
```

### Step 2：创建 API 文件

按 `api-layer`
skill 创建 5 个函数：`listUsers / getUser / createUser / updateUser / deleteUser`

### Step 3：创建 Store

```typescript
// stores/useUserStore.ts
export const useUserStore = defineStore('user', () => {
  const items = ref<User[]>([]);
  const total = ref(0);
  const query = ref<UserQuery>({ page: 1, size: 20 });
  const isLoading = ref(false);

  async function loadList() { ... }
  async function handleDelete(id: number) { ... }

  return { items, total, query, isLoading, loadList, handleDelete };
});
```

### Step 4：实现主页面

`<Name>Page.vue`：搜索表单 + 表格 + 分页 + 操作按钮

关键实现：

- 搜索：`VForm` inline 模式 + 防抖
- 表格：`VTable` + `VTableColumn`
- 分页：`VPagination` 绑定 `query.page` / `query.size` / `total`
- 操作列：编辑按钮 + 删除按钮（`VPopconfirm` 二次确认）
- 按钮权限：`v-permission="'user:create'"` / `v-permission="'user:delete'"`

### Step 5：实现弹窗表单

`<Name>FormDialog.vue`：

- props：`modelValue`（控制显隐）+ `editData`（编辑时传入，null 为新增）
- 新增 / 编辑共用同一个弹窗，通过 `editData` 区分模式
- 提交成功后 emit `success` → 主页面刷新列表
- 提交按钮加 loading 防重复提交

### Step 6：连接路由

在 `router/routes.ts` 添加路由（或由 permission-rbac 动态注入）。

## 关键决策点（AI 必须问用户）

1. **资源名**：中英文各叫什么？（决定文件名 / 组件名 / 路由）
2. **表格列**：显示哪些字段？哪些列需要排序？
3. **搜索条件**：哪些字段可搜索？什么控件？（输入框 / 下拉 / 日期范围）
4. **表单字段**：新增/编辑需要哪些字段？哪些必填？
5. **是否需要批量操作**：批量删除 / 批量导出？
6. **是否需要按钮权限**：哪些按钮需要权限控制？

## 产出位置

- 页面：`apps/<app>/src/modules/<name>/views/<Name>Page.vue`
- 弹窗：`apps/<app>/src/modules/<name>/components/<Name>FormDialog.vue`
- API：`apps/<app>/src/modules/<name>/api/<name>.ts`
- Store：`apps/<app>/src/modules/<name>/stores/use<Name>Store.ts`
- 类型：`apps/<app>/src/modules/<name>/types/<name>.ts`

## 资源

```
crud-page/
└── SKILL.md            本文件（无 examples，步骤已内嵌代码骨架）
```

完整组件用法参考 Element Plus 官方文档 + `vup-ui` skill。
