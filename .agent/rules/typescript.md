# TypeScript 规范

## auto-import：不要手动 import 已自动导入的 API

项目配置了 `unplugin-auto-import`，以下 API 已全局可用，**不要手动 import**：

```typescript
// ❌ 不需要，已自动导入
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { defineStore, storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

// ✅ 直接使用
const count = ref(0);
const router = useRouter();
const { t } = useI18n();
```

## 路径引用

```typescript
// ✅ 用 @ 别名
import { tokenStorage } from '@/common/utils/tokenStorage';
import UserCard from '@/modules/user/components/UserCard.vue';

// ❌ 不要用多级相对路径
import { tokenStorage } from '../../../common/utils/tokenStorage';
```

- `@/` → 当前应用的 `src/` 目录（Electron 渲染进程为 `src/renderer/`）
- `@_shared` → 仓库根 `_shared/` 目录

## 类型

- 优先用 `interface`，联合类型 / 交叉类型场景用 `type`
- 避免 `any`，不确定类型时用 `unknown` 再收窄
- API 响应统一用 `ApiResponse<T>` 包裹

## API 函数命名

```typescript
// ✅ 动词 + 资源
export async function listTasks() { ... }
export async function getTask(id: number) { ... }
export async function createTask(data: CreateTaskInput) { ... }
export async function updateTask(id: number, data: UpdateTaskInput) { ... }
export async function deleteTask(id: number) { ... }

// ✅ 认证类直接用业务动作名
export async function login() { ... }
export async function logout() { ... }
export async function refreshTokens() { ... }
export async function fetchUserInfo() { ... }

// ❌ 不要写成含糊命名
export async function getList() { ... }
export async function submit() { ... }
export async function doRequest() { ... }
```

## Store 命名

```typescript
// ✅ use*Store + 组合式
export const useUserStore = defineStore('user', () => { ... })

// ❌ 不要用非标准命名
export const storeUser = defineStore('user', () => { ... })
// ❌ 不要用 Options 式
export const useUserStore = defineStore('user', { state: () => ({}) })
```
