import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import type { MicroAppStateActions } from 'qiankun';
import { registerMicroApps, start, initGlobalState } from 'qiankun';

const app = createApp(App);
app.use(router);

router.isReady().then(() => {
  app.mount('#qiankun-micro-app');

  // 注册微应用
  registerMicroApps(
    [
      {
        name: 'vue-template',
        entry: 'http://localhost:9301',
        container: '#auto-app-container',
        activeRule: '/auto/vue/',
        props: {
          name: 'vue-template-atuo',
          baseRoute: '/auto/vue',
          container: '#auto-app-container',
        },
      },
    ],
    {
      // 添加生命周期钩子
      beforeLoad: (app) => {
        console.log('beforeLoad', app);
        return Promise.resolve();
      },
      beforeMount: (app) => {
        console.log('beforeMount', app);
        return Promise.resolve();
      },
      afterMount: (app) => {
        console.log('afterMount', app);
        return Promise.resolve();
      },
      beforeUnmount: (app) => {
        console.log('beforeUnmount', app);
        return Promise.resolve();
      },
      afterUnmount: (_app) => {
        return Promise.resolve();
      },
    }
  );

  // 初始化 state
  const state = {
    name: 'qiankun-template',
  };
  const actions: MicroAppStateActions = initGlobalState(state);

  actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });
  actions.setGlobalState(state);

  // actions.offGlobalStateChange();

  start();
});
