---
name: api-layer-pattern
description: >-
  Standard API request layer conventions for vup-templates apps. Use when
  creating API services, HTTP clients, request interceptors, or when working
  with backend API integration in any app template.
---

# API 请求层规范

本规范定义 API 请求的目录结构、封装方式和错误处理标准。各 app 按平台选用不同 HTTP 客户端，但目录约定和类型定义保持统一。

## HTTP 客户端选型

| 平台                                 | 客户端                  | 原因                |
| ------------------------------------ | ----------------------- | ------------------- |
| Vue / Electron / Capacitor / qiankun | **axios**               | 拦截器成熟，生态广  |
| Nuxt                                 | **ofetch** / `useFetch` | Nuxt 原生，支持 SSR |
| uni-app                              | **uni.request**         | 平台内置 API        |

## 目录约定

```
src/
├── api/
│   ├── request.ts              # 客户端实例 + 拦截器（全局基础设施）
│   └── types.ts                # ApiResponse 等通用类型
├── modules/
│   ├── user/
│   │   └── api/user.ts         # 用户模块接口（跟随业务模块）
│   └── order/
│       └── api/order.ts        # 订单模块接口
├── stores/
│   └── auth.ts                 # 全局 auth store 中的登录接口可放此处
```

业务 API 跟随模块走（`src/modules/<name>/api/`），只有 HTTP 客户端实例和通用类型放
`src/api/`。

## 通用响应类型

所有后端接口应遵循统一响应结构：

```typescript
interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}
```

## 环境变量

| 平台                       | 变量名                                           | 用途                                    |
| -------------------------- | ------------------------------------------------ | --------------------------------------- |
| Vue / Electron / Capacitor | `VITE_API_BASE`                                  | API 基础地址                            |
| Nuxt                       | `NUXT_PUBLIC_API_BASE`                           | API 基础地址（客户端 + 服务端代理共用） |
| uni-app                    | 在 `src/api/request.ts` 中按环境硬编码或读取配置 |

环境变量通过 `.env` / `.env.development` / `.env.production`
管理，不要提交含真实地址的 `.env` 到仓库。

## 拦截器职责

请求拦截器和响应拦截器需处理以下逻辑（具体实现因客户端而异，参考各 app skill）：

### 请求拦截

1. 从 tokenStorage 读取 token，注入 `Authorization: Bearer <token>` header
2. 可选：注入 `Accept-Language` header（配合 vue-i18n）

### 响应拦截

1. 统一解包：直接返回 `response.data`（axios）或解析 JSON（ofetch）
2. 业务错误判断：`code !== 0`（或约定的成功码）时抛出或提示
3. HTTP 401：清除 token，跳转登录页
4. HTTP 403：提示无权限
5. 网络错误 / 超时：统一 toast 提示

## 请求治理（必须考虑）

在实现请求层或模块 API 时，AI 必须同时评估并落地以下能力：

### 1) 频次控制

- 搜索联想、筛选输入、滚动加载等高频触发场景，必须加防抖/节流
- 提交类操作必须防重复触发（按钮 loading / 禁用态 / 请求锁）
- 避免在 `watch` / `watchEffect` 中无条件重复发请求

### 2) 并发模式（mode）

- 查询类请求默认 `mode: 'takeLatest'`，保证页面状态以最新请求为准
- 写请求默认 `mode: 'parallel'`，避免误取消导致用户认知与后端状态不一致
- 需要“首个优先”场景可使用 `mode: 'takeFirst'`
- 推荐显式传 `cancelKey`（`模块:页面:动作[:参数]`）与 `cancelScope`

### 3) 反馈与遮挡

- 首次进入页面可使用全局 loading，集中拉取关键稳定数据并写入缓存
- 首次完成后优先局部 loading，筛选/分页/局部刷新不应整页遮挡
- 全局 loading 必须配置退出条件和超时兜底，避免长时间不可操作
- `ERR_CANCELED` 属于受控行为，应默认静默处理，不提示为异常

### 4) 缓存与失效

- 对字典、列表、详情等可复用查询，优先考虑缓存
- 新增列表页时，必须声明缓存策略（是否缓存、TTL、失效条件）
- 缓存必须定义 TTL 与失效机制（写操作后主动失效）
- 缓存键应稳定可预测，禁止使用不稳定对象序列化结果

## 接口定义规范

每个模块文件导出具名函数，函数名以 HTTP 方法为前缀或用语义化动词：

```typescript
// src/modules/user/api/user.ts
import request from '@/api/request';
import type { ApiResponse } from '@/api/types';

interface UserInfo {
  id: number;
  name: string;
  avatar: string;
}

export function getUserInfo(id: number) {
  return request.get<ApiResponse<UserInfo>>(`/api/user/${id}`);
}

export function updateUser(id: number, data: Partial<UserInfo>) {
  return request.put<ApiResponse<null>>(`/api/user/${id}`, data);
}
```

## 开发代理

本地开发时通过 Vite / Nuxt 代理转发 `/api` 请求，避免跨域：

- **Vue 系**：在 `vite.config.js` 的 `server.proxy` 中配置
- **Nuxt**：在 `nuxt.config.ts` 的 `vite.server.proxy` + `nitro.devProxy`
  中配置（已预置）

```javascript
// vite.config.js 示例
server: {
  proxy: {
    '/api': {
      target: process.env.VITE_API_BASE || 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
    },
  },
}
```
