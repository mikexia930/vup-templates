// 测试子应用默认使用 examples/qiankun。生产项目通常会把这个值改成
// 环境变量，指向独立部署后的子应用地址。
export const childAppEntry = import.meta.env.VITE_QIANKUN_CHILD_ENTRY || 'http://localhost:9393';

// 自动模式：qiankun 根据 activeRule 匹配当前 URL，并把子应用挂载到 container。
// 主应用只声明路由前缀，子应用内部的二级路由由子应用自己接管。
export const autoMicroApp = {
  activeRule: '/auto/',
  container: '#auto-app-container',
  entry: childAppEntry,
  name: 'example-qiankun',
  props: {
    baseRoute: '/auto/',
    host: 'qiankun-template',
    mode: 'auto',
  },
};

// 手动模式：不依赖 activeRule，由页面组件调用 loadMicroApp() 控制挂载时机。
// 适合弹窗、局部工作台、按需加载等需要精细控制的场景。
export const manualMicroApp = {
  container: '#manual-app-container',
  entry: childAppEntry,
  name: 'example-qiankun',
  props: {
    baseRoute: '/manual/',
    host: 'qiankun-template',
    mode: 'manual',
  },
};

// 默认使用 experimentalStyleIsolation，兼容性比 Shadow DOM 更好；
// 如果业务强依赖强隔离，可以评估 strictStyleIsolation。
export const sandboxSummary = 'sandbox: experimentalStyleIsolation';
