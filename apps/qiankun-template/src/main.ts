import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { registerMicroApps, start, initGlobalState } from 'qiankun';
import { autoMicroApp } from './micro/config';
import { addLifecycleLog, bindGlobalActions, handleGlobalStateChange } from './micro/state';

const app = createApp(App);
app.use(router);

router.isReady().then(() => {
  // 先挂载基座，再启动 qiankun。子应用需要容器 DOM 已经存在。
  app.mount('#qiankun-micro-app');

  // 自动加载模式：URL 命中 activeRule 时，qiankun 会拉取 entry 并挂载到 container。
  registerMicroApps(
    [
      {
        ...autoMicroApp,
      },
    ],
    {
      beforeLoad: (microApp) => {
        addLifecycleLog('beforeLoad', microApp.name, 'fetch child assets');
        return Promise.resolve();
      },
      beforeMount: (microApp) => {
        addLifecycleLog('beforeMount', microApp.name, 'prepare host container');
        return Promise.resolve();
      },
      afterMount: (microApp) => {
        addLifecycleLog('afterMount', microApp.name, 'child app mounted');
        return Promise.resolve();
      },
      beforeUnmount: (microApp) => {
        addLifecycleLog('beforeUnmount', microApp.name, 'route leaves activeRule');
        return Promise.resolve();
      },
      afterUnmount: (microApp) => {
        addLifecycleLog('afterUnmount', microApp.name, 'container released');
        return Promise.resolve();
      },
    }
  );

  // 主应用初始化共享状态。子应用 mount 时会通过 props 拿到状态通信方法。
  const actions = initGlobalState({
    appName: 'qiankun-template',
    childReport: null,
    signal: 1,
    updatedAt: new Date().toLocaleTimeString(),
    userName: 'Host Admin',
  });
  actions.onGlobalStateChange((state) => {
    handleGlobalStateChange(state);
    addLifecycleLog('stateChange', 'global-state', 'received child or host state update');
  });
  bindGlobalActions(actions);

  // sandbox 控制样式隔离；prefetch 会在空闲时预取子应用资源，提升切换速度。
  start({
    sandbox: {
      experimentalStyleIsolation: true,
    },
    singular: false,
    prefetch: true,
  });
});
