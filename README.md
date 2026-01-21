# 🚀 VUP CLI Templates - 多框架开发模板集合

VUP
CLI 的多框架开发模板集合，包含 Vue、Nuxt、VitePress、NestJS、Qiankun、UniApp、Capacitor、Electron、WXT、CLI、Component 等多种技术栈的完整开发模板。通过
`vup add` 命令快速创建项目，让你专注于业务逻辑开发。

## ✨ 特性

- 🚀 **VUP CLI 集成** - 通过 `vup add` 命令快速创建项目，`vup use`
  命令快速添加功能包
- 🏗️ **Monorepo 架构** - 基于 pnpm workspace 的多包管理
- 🎯 **多框架支持** - Vue、Nuxt、VitePress、NestJS、UniApp 等
- 🔧 **TypeScript** - 完整的类型支持
- ⚡ **现代化工具链** - Vite、ESLint、Prettier、Tailwind CSS
- 📦 **统一依赖管理** - 共享依赖，减少重复安装
- 🌍 **国际化支持** - 多语言开发模板
- 🚀 **一键部署** - 集成 Vercel、Docker 等部署方案
- 📱 **跨平台开发** - Web、移动端、桌面端全覆盖
- 🔄 **版本管理** - 集成 release-it 进行版本控制
- 🎨 **代码规范** - 统一的 ESLint 和 Prettier 配置

## 🛠️ 技术栈

### 前端框架

| 技术       | 版本 | 说明                    |
| ---------- | ---- | ----------------------- |
| Vue        | 3.5+ | 渐进式JavaScript框架    |
| Nuxt       | 3.0+ | Vue.js全栈框架          |
| VitePress  | 2.0+ | Vue驱动的静态站点生成器 |
| UniApp     | 3.0+ | 跨平台应用开发框架      |
| Capacitor  | 7.0+ | 混合应用开发平台        |
| Electron   | -    | 桌面应用开发框架        |
| Qiankun    | -    | 微前端框架              |
| WXT        | 3.0+ | 浏览器扩展开发框架      |
| Vue Router | 4.0+ | Vue 路由管理器          |
| Pinia      | 2.0+ | Vue 状态管理库          |
| vue-i18n   | 9.0+ | Vue 国际化插件          |

### 后端框架

| 技术   | 版本  | 说明              |
| ------ | ----- | ----------------- |
| NestJS | 11.0+ | Node.js企业级框架 |

### 开发工具

| 技术         | 版本 | 说明                         |
| ------------ | ---- | ---------------------------- |
| VUP CLI      | 1.0+ | 项目创建和管理工具           |
| TypeScript   | 5.0+ | JavaScript的超集             |
| Vite         | 6.0+ | 下一代前端构建工具           |
| pnpm         | 8.0+ | 快速、节省磁盘空间的包管理器 |
| ESLint       | 9.0+ | 代码质量检查工具             |
| Prettier     | 3.0+ | 代码格式化工具               |
| Tailwind CSS | 3.0+ | 实用优先的CSS框架            |
| SCSS         | -    | CSS 预处理器                 |
| release-it   | -    | 版本管理和发布工具           |

## 📁 项目结构

```
project-vue/
├── apps/       # 应用模板
├── packages/   # 功能包
│   └── demo/   # 功能包演示项目
├── deploy/     # Docker 部署配置
└── _shared/    # 共享资源与主题
```

## 🎨 \_shared/assets 主题与使用方法

`_shared/assets/styles` 统一维护全局主题与设计令牌：

- `base-colors.scss`：基础色板（0-9）
- `base-size.scss`：间距/圆角/字号/行高/控件高度
- `theme.scss`：语义色（primary/success/warning/error/info/neutral）
- `tailwind.scss`：把语义色与尺寸映射到 Tailwind `@theme`

**使用方式（Web/Vite 项目示例）**

1. 引入语义主题（CSS 变量）

```ts
import '@_shared/assets/styles/theme.scss';
```

2. 使用 Tailwind 令牌（如项目启用 Tailwind），大部分模版已载入。

```ts
import '@_shared/assets/styles/tailwind.scss';
```

## 🚀 快速开始

### 1. 安装 VUP CLI

```bash
# 全局安装 vup-cli
npm install -g vup-cli
```

### 2. 创建项目

```bash
# 初始项目
vup init my-project
# 添加新项目
vup add my-app

# 选择模板类型
? 请选择项目模板:
  ❯ Vue 3 模板 (vue-template)
    Nuxt 3 模板 (nuxt-template)
    VitePress 文档模板 (vitepress-template)
    NestJS 后端模板 (nest-template)
    Qiankun 微前端模板 (qiankun-template)
    UniApp 跨平台模板 (uniapp-template)
    Capacitor 混合应用模板 (capacitor-template)
    Electron 桌面应用模板 (electron-template)
    WXT 浏览器扩展模板 (wxt-template)
    CLI 命令行工具模板 (cli-template)
    Component 组件库模板 (component-template)
```

### 3. 启动开发服务器

```bash
# 进入项目目录
cd my-project

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 📖 模板概览

| 模板                   | 技术栈                         | 适用场景                             | 文档                                            |
| ---------------------- | ------------------------------ | ------------------------------------ | ----------------------------------------------- |
| **vue-template**       | Vue 3 + Vite + TypeScript      | SPA 应用、管理后台、企业级前端       | [查看文档](./apps/vue-template/README.md)       |
| **nuxt-template**      | Nuxt 3 + Vue 3 + TypeScript    | 全栈应用、SEO 友好网站、博客         | [查看文档](./apps/nuxt-template/README.md)      |
| **vitepress-template** | VitePress + Vue 3 + Markdown   | 文档网站、技术博客、产品介绍         | [查看文档](./apps/vitepress-template/README.md) |
| **nest-template**      | NestJS + TypeScript + Prisma   | API 服务、微服务、企业级后端         | [查看文档](./apps/nest-template/README.md)      |
| **qiankun-template**   | Qiankun + Vue 3 + Vite         | 微前端应用、子应用模板               | [查看文档](./apps/qiankun-template/README.md)   |
| **uniapp-template**    | UniApp + Vue 3 + TypeScript    | 移动应用、小程序、H5 应用            | [查看文档](./apps/uniapp-template/README.md)    |
| **capacitor-template** | Capacitor + Vue 3 + TypeScript | 混合移动应用、桌面应用               | [查看文档](./apps/capacitor-template/README.md) |
| **electron-template**  | Electron + Vue 3 + Vite        | 桌面应用                             | [查看文档](./apps/electron-template/README.md)  |
| **wxt-template**       | WXT + Vue 3 + TypeScript       | Chrome 扩展、Firefox 插件、Edge 扩展 | [查看文档](./apps/wxt-template/README.md)       |
| **cli-template**       | Node.js CLI                    | 命令行工具模板                       | [查看文档](./apps/cli-template/README.md)       |
| **component-template** | Vue 3 + TypeScript             | 组件/组件库模板                      | [查看文档](./apps/component-template/README.md) |

### 4. 添加功能包

```bash
# 为已有项目添加功能包
vup use my-package

# 选择功能包
? 请选择功能包:
  ❯ @vup/ui - UI 组件库
    @vup/iconfont - Iconfont 图标组件
    @vup/richeditor - 富文本编辑器
    @vup/nest-upload - NestJS 上传模块
```

## 📦 功能包概览

`packages/`
目录用于沉淀可复用的功能包（组件库、业务组件、服务模块），供各应用按需引用：

| 包名                 | 技术栈/说明          | 适用场景                  | 文档                                         |
| -------------------- | -------------------- | ------------------------- | -------------------------------------------- |
| **@vup/ui**          | Element Plus + Vue 3 | UI 组件封装、组件库适配层 | [查看文档](./packages/ui/README.md)          |
| **@vup/iconfont**    | Iconfont + Vue 3     | 图标字体组件封装          | [查看文档](./packages/iconfont/README.md)    |
| **@vup/richeditor**  | WangEditor + Vue 3   | 富文本编辑器封装          | [查看文档](./packages/richeditor/README.md)  |
| **@vup/nest-upload** | NestJS + TypeORM     | 文件上传模块（可复用）    | [查看文档](./packages/nest-upload/README.md) |

## 🔧 开发工具

### 代码规范

```bash
# 检查所有应用代码
pnpm lint:all

# 修复所有应用代码
pnpm lint:fix

# 格式化所有应用代码
pnpm format:all
```

### 版本管理

```bash
# 版本发布（release-it）
pnpm release
```

### 构建和部署

```bash
# 构建所有应用
pnpm build:all

# 部署 VitePress 到 Vercel
pnpm deploy:vitepress

# 启动 NestJS 的 Docker 环境
cd apps/nest-template
pnpm docker:up
```

## 🌍 环境变量配置

### 使用方法

1. 复制 `.env.example` 为 `.env.local`：

```bash
cp .env.example .env.local
```

2. 根据实际需求修改 `.env.local` 中的配置

### Vite 环境变量规则

- **客户端变量**：必须以 `VITE_` 开头
- **服务端变量**：可以任意命名（如 `NODE_ENV`）

### 变量优先级（从高到低）

1. `.env.local`（本地环境，不提交到 Git）
2. `.env.development`（开发环境）
3. `.env.production`（生产环境）
4. `.env`（通用环境）

### 常用配置

```bash
# 应用基础配置
VITE_APP_TITLE=应用标题
VITE_APP_DESCRIPTION=应用描述
VITE_API_BASE_URL=https://api.example.com

# 功能开关
VITE_ENABLE_MOCK=true
VITE_ENABLE_DEVTOOLS=true
VITE_ENABLE_ANALYTICS=false
```

## 🚀 部署方案

### 前端应用部署

- **Vercel**: VitePress、Vue、Nuxt 应用（推荐）
- **Netlify**: 静态站点
- **GitHub Pages**: 文档站点

### 后端应用部署

- **Docker**: 应用容器化部署（推荐，详见下方）
- **Railway**: 无服务器部署
- **Heroku**: 传统云平台部署

### Docker 容器化部署

项目提供了完整的 Docker Compose 部署方案，适用于生产环境（DAU ≤ 5000）。

#### 特性

- 🐳 **Docker Compose** - 一键启动所有服务
- 📦 **Volume 映射** - 更新时只需替换文件并重启，无需 rebuild 镜像
- 🔒 **资源限制** - CPU、内存、进程数限制，防止资源耗尽
- 📊 **健康检查** - 自动检测服务健康状态
- 💾 **数据持久化** - 数据库和上传文件持久化存储

#### 快速开始

1. **构建应用**（仅示例，请根据实际项目路径调整）

   ```bash
   # 构建 API 服务
   cd apps/nest-template
   pnpm build
   cp -r .output ../../deploy/builds/api

   # 构建前端（仅示例，请根据实际项目路径调整）
   cd apps/nuxt-template
   pnpm build
   cp -r .output ../../deploy/builds/frontend
   ```

2. **配置环境变量**

   ```bash
   cd deploy
   cp .env.example .env
   # 编辑 .env 文件，配置数据库、API、域名等信息
   ```

3. **启动服务**

   ```bash
   docker-compose up -d
   ```

4. **运行数据库迁移**
   ```bash
   docker-compose --profile migration run --rm migration
   ```

#### 详细文档

完整的部署文档、配置说明、故障排查等，请查看：[Docker 部署文档](./deploy/README.md)

### 移动应用发布

- **App Store**: iOS 应用
- **Google Play**: Android 应用
- **小程序平台**: 微信、支付宝等

### Vercel 自动部署

#### 配置说明

项目已配置 `vercel.json` 文件，支持多应用部署：

```json
{
  "buildCommand": "cd apps/{project_name} && pnpm build",
  "outputDirectory": "apps/{project_name}/.output",
  "installCommand": "pnpm install --no-frozen-lockfile && cd apps/{project_name} && pnpm install --no-frozen-lockfile",
  "devCommand": "cd apps/{project_name} && pnpm dev"
}
```

#### 部署步骤

1. **在 Vercel 控制台创建项目**
2. **设置环境变量**：
   - `PROJECT_NAME`: 要部署的应用名称（如 `vitepress-template`）
3. **连接 GitHub 仓库**
4. **自动部署**：推送到 main 分支即可自动部署

#### 支持的应用

- `vitepress-template` - 文档网站
- `vue-template` - Vue 应用
- `nuxt-template` - Nuxt 应用

## 🌟 最佳实践

### 1. Monorepo 管理

- 使用 pnpm workspace 管理依赖
- 共享配置和工具链
- 统一的代码规范

### 2. 版本控制

- 使用 release-it 管理版本
- 语义化版本号
- 自动化发布流程

### 3. 代码质量

- ESLint + Prettier 统一代码风格
- TypeScript 类型安全
- VSCode 预置配置（推荐安装相关扩展）
- 自动化测试和 CI/CD

### 4. 部署策略

- 环境变量管理
- 自动化部署流程
- 多环境配置

## 📚 文档

### 模板文档

每个模板都有详细的文档说明，包含技术栈、使用方法、配置说明等：

- [Vue 3 模板文档](./apps/vue-template/README.md) - SPA 应用开发
- [Nuxt 3 模板文档](./apps/nuxt-template/README.md) - 全栈应用开发
- [VitePress 模板文档](./apps/vitepress-template/README.md) - 文档网站开发
- [NestJS 模板文档](./apps/nest-template/README.md) - 后端 API 开发
- [Qiankun 模板文档](./apps/qiankun-template/README.md) - 微前端应用
- [UniApp 模板文档](./apps/uniapp-template/README.md) - 跨平台移动应用
- [Capacitor 模板文档](./apps/capacitor-template/README.md) - 混合应用开发
- [Electron 模板文档](./apps/electron-template/README.md) - 桌面应用开发
- [WXT 模板文档](./apps/wxt-template/README.md) - 浏览器扩展开发
- [CLI 模板文档](./apps/cli-template/README.md) - 命令行工具开发
- [Component 模板文档](./apps/component-template/README.md) - 组件库开发

### 功能包文档

功能包详细文档请参考 [功能包概览](#-功能包概览) 表格中的文档链接。

### 部署文档

- [Docker 部署文档](./deploy/README.md) - 完整的 Docker Compose 部署方案

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

感谢以下开源项目的支持：

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Nuxt](https://nuxt.com/) - Vue.js 全栈框架
- [VitePress](https://vitepress.dev/) - Vue 驱动的静态站点生成器
- [NestJS](https://nestjs.com/) - Node.js 企业级框架
- [UniApp](https://uniapp.dcloud.net.cn/) - 跨平台应用开发框架
- [Capacitor](https://capacitorjs.com/) - 混合应用开发平台
- [Electron](https://www.electronjs.org/) - 桌面应用开发框架
- [Qiankun](https://qiankun.umijs.org/) - 微前端框架
- [WXT](https://wxt.dev/) - 浏览器扩展开发框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [pnpm](https://pnpm.io/) - 快速、节省磁盘空间的包管理器
- [release-it](https://github.com/release-it/release-it) - 版本管理和发布工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Element Plus](https://element-plus.org/) - Vue 3 组件库
- [WangEditor](https://www.wangeditor.com/) - 富文本编辑器
- [Iconfont](https://www.iconfont.cn/) - 图标字体库

---

**Happy Coding! 🎉**
