# WXT Template - 浏览器扩展开发模板

基于 WXT + Vue 3 +
TypeScript 的现代化浏览器扩展开发模板，提供完整的开发工具链和最佳实践。

## 🚀 技术栈

### 核心框架

- **[WXT](https://wxt.dev/)** - 现代化的浏览器扩展开发框架
- **[Vue 3](https://vuejs.org/)** - 渐进式 JavaScript 框架
- **[TypeScript](https://www.typescriptlang.org/)** -
  JavaScript 的超集，提供类型安全
- **[Vite](https://vitejs.dev/)** - 快速的构建工具

### 样式系统

- **[Tailwind CSS](https://tailwindcss.com/)** - 实用优先的 CSS 框架
- **[SCSS](https://sass-lang.com/)** - CSS 预处理器

### 开发工具

- **[ESLint](https://eslint.org/)** - JavaScript 代码检查工具
- **[Prettier](https://prettier.io/)** - 代码格式化工具
- **[pnpm](https://pnpm.io/)** - 快速、节省磁盘空间的包管理器

## 📚 文档链接

- [WXT 官方文档](https://wxt.dev/)
- [Vue 3 官方文档](https://vuejs.org/guide/)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [Chrome 扩展开发文档](https://developer.chrome.com/docs/extensions/)
- [Firefox 扩展开发文档](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)

## 🛠️ 使用方法

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# Chrome 扩展开发
pnpm run dev

# Firefox 扩展开发
pnpm run dev:firefox
```

### 构建生产版本

```bash
# Chrome 扩展构建
pnpm run build

# Firefox 扩展构建
pnpm run build:firefox
```

### 打包扩展

```bash
# Chrome 扩展打包
pnpm run zip

# Firefox 扩展打包
pnpm run zip:firefox
```

### 代码质量

```bash
# 代码检查
pnpm run lint

# 自动修复代码问题
pnpm run lint:fix

# 代码格式化
pnpm run format

# 检查代码格式
pnpm run format:check
```

## 📁 项目结构

```
wxt-template/
├── src/
│   ├── entrypoints/           # 扩展入口点
│   │   ├── background.ts      # 后台脚本
│   │   ├── content.ts         # 内容脚本
│   │   ├── newtab.html        # 新标签页
│   │   ├── newtab/            # 新标签页组件
│   │   │   ├── main.ts        # Vue 应用入口
│   │   │   └── App.vue        # 新标签页组件
│   │   ├── options.html       # 设置页面
│   │   ├── options/           # 设置页面组件
│   │   │   ├── main.ts        # Vue 应用入口
│   │   │   └── App.vue        # 设置页面组件
│   │   └── popup/             # 弹窗页面
│   │       ├── index.html     # 弹窗 HTML
│   │       ├── main.ts        # Vue 应用入口
│   │       ├── App.vue        # 弹窗组件
│   │       └── style.css      # 弹窗样式
│   ├── components/            # 共享组件
│   ├── composables/           # Vue 组合式函数
│   ├── assets/                # 静态资源
│   └── manifest.ts            # 扩展清单配置
├── public/                    # 公共资源
│   └── icon/                  # 扩展图标
├── .output/                   # 构建输出目录
├── wxt.config.ts              # WXT 配置文件
├── package.json               # 项目配置
└── README.md                  # 项目说明
```

## ✨ 功能特性

### 🎯 多入口点支持

- **弹窗页面** (`popup`) - 点击扩展图标显示
- **新标签页** (`newtab`) - 替换浏览器新标签页
- **设置页面** (`options`) - 扩展配置界面
- **后台脚本** (`background`) - 扩展后台逻辑
- **内容脚本** (`content`) - 页面注入脚本

### 🎨 现代化 UI

- 渐变背景设计
- 响应式布局
- 交互动画效果
- 品牌元素展示
- 技术栈介绍

### 🔧 开发体验

- 热重载开发
- TypeScript 类型安全
- ESLint + Prettier 代码规范
- 多浏览器支持
- 自动构建优化

### 📱 扩展功能

- 设置数据持久化
- 跨页面通信
- 权限管理
- 图标和清单配置

## 🎨 启动页设计

### 新标签页启动页

- **全屏体验** - 类似网站首页的完整界面
- **品牌展示** - VUP 1.5x 品牌元素和速度标识
- **功能展示** - 扩展功能和技术栈介绍
- **交互设计** - 按钮和动画效果

### 弹窗启动页

- **紧凑设计** - 适合快速访问的界面
- **快速操作** - 功能切换和快速设置
- **导航链接** - 跳转到新标签页和设置页面

### 设置页面

- **完整配置** - 基本设置和外观设置
- **数据存储** - 使用 Chrome Storage API
- **用户友好** - 直观的设置界面

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd wxt-template
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发

```bash
pnpm run dev
```

### 4. 加载扩展

1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions/`
3. 开启"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择 `.output/chrome-mv3` 目录

### 5. 测试功能

- 点击扩展图标查看弹窗
- 打开新标签页查看启动页
- 右键扩展图标选择"选项"查看设置页面

## 🔧 配置说明

### WXT 配置 (`wxt.config.ts`)

```typescript
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-vue'],
  alias: {
    '@_shared': path.resolve(__dirname, '../../_shared'),
  },
  // ... 其他配置
});
```

### 扩展清单 (`src/manifest.ts`)

```typescript
export default defineManifest({
  name: 'VUP 1.5x',
  description: '基于 WXT + Vue 3 的现代化浏览器扩展开发模板',
  version: '1.1.0',
  manifest_version: 3,
  // ... 其他配置
});
```

## 📦 构建和部署

### 开发构建

```bash
pnpm run build
```

输出目录：`.output/chrome-mv3/`

### 生产打包

```bash
pnpm run zip
```

生成文件：`wxt-chrome-mv3.zip`

### 发布到商店

1. 构建生产版本
2. 打包扩展文件
3. 上传到 Chrome Web Store 或 Firefox Add-ons

## 🧪 测试指南

### 功能测试

- 测试所有入口点是否正常加载
- 验证设置页面的数据持久化
- 检查跨页面通信功能
- 测试不同浏览器的兼容性

### 性能测试

- 检查扩展加载时间
- 监控内存使用情况
- 测试大量数据处理的性能

## 🐛 常见问题

### Q: 扩展无法加载？

A: 检查 manifest.json 配置，确保所有文件路径正确。

### Q: 样式不生效？

A: 检查 Tailwind CSS 配置，确保 content 路径正确。

### Q: TypeScript 类型错误？

A: 检查类型定义，确保所有依赖都有正确的类型声明。

### Q: 构建失败？

A: 检查 WXT 配置，确保入口点配置正确。

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [WXT](https://wxt.dev/) - 优秀的浏览器扩展开发框架
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架

---

**VUP 1.5x** - 跳过复杂配置，专注于浏览器扩展开发！ 🚀
