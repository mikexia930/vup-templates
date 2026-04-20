<!--
AI 必读：

1. 字段命名风格（驼峰 / 下划线）必须用户确认，禁止"按主流"自定
2. 分页风格（page+size / cursor）必须用户确认
3. 错误码规范（业务码 / HTTP / 双层）必须用户确认
4. 详细接口定义放 docs/api/openapi.yaml，本文件只记录约定 + 接口索引
-->

# 接口契约

> 项目：<...> · 创建：<YYYY-MM-DD>

## 1. 通用约定

- **字段命名**：<camelCase / snake_case>
- **分页**：<page+size / cursor，参数名：page/size/total>
- **响应结构**：`{ code: number, data: T, message: string }`
- **成功码**：`code === 0`
- **错误码段**：<例：1xxx 业务 / 2xxx 权限 / 5xxx 系统>
- **认证**：`Authorization: Bearer <token>`
- **时间格式**：<ISO 8601 / Unix timestamp>

## 2. 接口索引

按模块分组，详细 schema 见 `docs/api/openapi.yaml`：

### auth

| 方法 | 路径              | 用途     |
| ---- | ----------------- | -------- |
| POST | `/api/auth/login` | 登录     |
| GET  | `/api/auth/me`    | 当前用户 |

### user

| 方法   | 路径             | 用途     |
| ------ | ---------------- | -------- |
| GET    | `/api/users`     | 用户列表 |
| POST   | `/api/users`     | 新增用户 |
| PUT    | `/api/users/:id` | 更新用户 |
| DELETE | `/api/users/:id` | 删除用户 |

## 3. 跨模块共享类型

```typescript
interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

interface PageResult<T> {
  list: T[];
  total: number;
  page: number;
  size: number;
}
```
