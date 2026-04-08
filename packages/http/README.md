# @vup/http

基于 `axios` 的共享请求层基础包，服务于 vup-templates 中的 Vue / Electron /
Capacitor 等模板。

## 设计目标

- **共享基础能力**：拦截器、错误处理、统一数据解包。
- **应用保留适配层**：每个应用仍保留
  `src/api/request.ts`，处理本应用的 token、路由跳转、提示策略。
- **模块接口就近管理**：业务接口函数继续放在 `src/modules/<name>/api/`。

## 快速接入

```ts
import { createHttpClient } from '@vup/http';

const request = createHttpClient({
  baseURL: import.meta.env.VITE_API_BASE || '',
  getAccessToken: () => localStorage.getItem('access_token'),
  getLocale: () => localStorage.getItem('locale') || 'en_US',
  onUnauthorized: () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  },
  onResponseError: (_error, message) => {
    console.error('[http]', message);
  },
  onBusinessError: (_error, message) => {
    console.warn('[http business]', message);
  },
  // 推荐保持默认 true：如果后端返回不符合 ApiResponse，会立即抛错。
  strictResponse: true,
});

export default request;
```

## 请求取消（Cancel）

`@vup/http` 支持两类取消能力：

- 单条取消：`request.cancel('your-key')`
- 批量取消：`request.cancelAll()` 或 `request.cancelAll('scope-name')`
- 取消判断：`request.isCanceled(error)`

### 配置项（传给每个请求）

```ts
request.get('/tasks', {
  mode: 'takeLatest',
  cancelKey: 'demo:task-list:load',
  cancelScope: 'demo:task-list',
  silentCancel: true,
});
```

- `mode`：并发策略（`parallel` | `takeLatest` | `takeFirst`）
- `cancelKey`：请求唯一标识（推荐由业务调用方传入，语义最清晰）
- `cancelScope`：请求作用域，用于按页面/模块批量取消
- `silentCancel`：取消时不触发全局错误回调（默认 `true`）

### key 谁来实现

- **推荐：业务调用方显式传
  `cancelKey`**，因为业务语义最清晰（如“用户列表搜索”）。
- **HTTP 层负责兜底**：当 `mode` 为 `takeLatest` / `takeFirst` 且未传
  `cancelKey` 时，自动按 `method + url + params` 生成 key。
- 结论：业务定义语义，基础层提供通用机制，二者协同。

### key 设计建议

推荐格式：`模块:页面:动作[:参数]`，例如：

- `demo:task-list:load`
- `user:list:search:keyword`

> 说明：当 `mode` 为 `takeLatest` / `takeFirst` 且未传 `cancelKey`
> 时，内部会自动用 `method + url + params` 生成 key。

### 默认模式

- GET 请求默认 `takeLatest`（适合查询类场景，避免旧响应覆盖新状态）
- 非 GET 请求默认 `parallel`（避免写操作被误取消）

### 应用侧错误处理建议

主动取消请求不属于异常故障，建议在应用层静默处理：

```ts
onResponseError: (error, message) => {
  if (request.isCanceled(error)) return;
  console.error('[request]', message);
};
```

## 返回结构约定

默认按下面结构解包：

```ts
interface ApiResponse<T = unknown> {
  code: number;
  data?: T;
  message?: string | null;
}
```

- 默认 `code === 0` 视为成功。
- 若你的后端成功码不是 `0`，可通过 `isSuccessCode` 自定义。
- 默认 `strictResponse: true`，响应结构不符合 `ApiResponse` 会立即抛错。
- 在 `strictResponse: true` 下，`code` 字段必须存在且为 number；`data` /
  `message` 允许省略，兼容部分后端返回。
- 若你的后端存在非标准结构响应，可显式配置 `strictResponse: false`
  透传原始数据。
- 当 `code` 非成功码时，会触发
  `onBusinessError`，便于统一处理业务失败提示或埋点。
