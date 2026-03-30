---
name: auth-login-pattern
description: >-
  Standard authentication and login conventions for vup-templates apps. Use when
  implementing login pages, token management, auth stores, route guards, or JWT
  authentication in Nest backend.
---

# 认证登录规范

本规范定义前后端统一的认证流程。采用 JWT + Bearer
Token 模式，token 通过平台适配层存储。

## 认证流程

```
用户输入账号密码
  → 前端调用 POST /api/auth/login
  → 后端验证，返回 { accessToken, refreshToken, user }
  → 前端存储 token（tokenStorage）+ 用户信息（useAuthStore）
  → 后续请求自动携带 Authorization: Bearer <accessToken>
  → 401 时尝试 refreshToken，失败则跳转登录页
```

## Token 存储适配层

统一接口，各平台实现不同（具体路径见各 app skill）：

```typescript
// Vue / Electron / Capacitor → src/shared/utils/tokenStorage.ts
// Nuxt / WXT / uni-app → src/utils/tokenStorage.ts
export interface TokenStorage {
  getToken(): string | null;
  setToken(token: string): void;
  removeToken(): void;
  getRefreshToken(): string | null;
  setRefreshToken(token: string): void;
  removeRefreshToken(): void;
}
```

| 平台          | 实现方式                                    |
| ------------- | ------------------------------------------- |
| Vue / qiankun | `localStorage`                              |
| Nuxt（SSR）   | `useCookie`                                 |
| Capacitor     | `@capacitor/preferences`                    |
| Electron      | `electron-store` 或 `safeStorage`           |
| uni-app       | `uni.setStorageSync` / `uni.getStorageSync` |
| WXT 扩展      | `browser.storage.local`                     |

## 前端 Auth Store

使用 Pinia 组合式写法：

```typescript
// src/stores/auth.ts
export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserInfo | null>(null);
  const isLoggedIn = computed(() => !!tokenStorage.getToken());

  async function login(credentials: LoginParams) {
    const res = await authApi.login(credentials);
    tokenStorage.setToken(res.data.accessToken);
    tokenStorage.setRefreshToken(res.data.refreshToken);
    user.value = res.data.user;
  }

  function logout() {
    tokenStorage.removeToken();
    tokenStorage.removeRefreshToken();
    user.value = null;
    router.push('/login');
  }

  async function fetchUser() {
    const res = await authApi.getUserInfo();
    user.value = res.data;
  }

  return { user, isLoggedIn, login, logout, fetchUser };
});
```

## 路由守卫

```typescript
// src/router/index.ts
router.beforeEach(async (to, from, next) => {
  const hasToken = !!tokenStorage.getToken();

  if (to.meta.requiresAuth && !hasToken) {
    return next({ path: '/login', query: { redirect: to.fullPath } });
  }

  if (to.path === '/login' && hasToken) {
    return next('/');
  }

  next();
});
```

路由定义中通过 `meta.requiresAuth: true` 标记需要登录的页面。

## 登录页约定

- 路由路径：`/login`
- 文件位置：`src/modules/auth/views/login.vue`
- 登录成功后跳转 `route.query.redirect` 或默认首页

## 后端（Nest）

### JWT 模块

```typescript
// src/auth/auth.module.ts
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
```

### Auth Guard

```typescript
// src/auth/guards/jwt-auth.guard.ts
@Injectable()
export class JwtAuthGuard implements CanActivate {
  // 验证 Authorization header 中的 Bearer token
  // 解码后将 user 挂载到 request.user
}
```

### Public 装饰器

不需要认证的接口用 `@Public()` 标记：

```typescript
@Public()
@Post('login')
async login(@Body() dto: LoginDto) { ... }
```

## 注意事项

- mcp-template 使用自己的认证方式（Fastify + @fastify/jwt），不遵循本规范
- refreshToken 逻辑建议在请求拦截器中用队列实现，避免并发刷新
- 密码传输建议前端 hash 后发送，后端再 bcrypt
