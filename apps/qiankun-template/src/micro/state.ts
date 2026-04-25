import { computed, reactive, ref } from 'vue';
import type { MicroAppStateActions } from 'qiankun';

export interface HostState {
  appName: string;
  childReport: ChildReport | null;
  signal: number;
  updatedAt: string;
  userName: string;
}

export interface ChildReport {
  id: number;
  message: string;
  page: string;
  source: string;
  time: string;
}

export interface LifecycleLog {
  appName: string;
  detail: string;
  id: number;
  stage: string;
  time: string;
}

const hostState = reactive<HostState>({
  appName: 'qiankun-template',
  childReport: null,
  signal: 1,
  updatedAt: new Date().toLocaleTimeString(),
  userName: 'Host Admin',
});

const lifecycleLogs = ref<LifecycleLog[]>([]);
let logId = 0;
let globalActions: MicroAppStateActions | null = null;
let latestChildReportId = 0;

function snapshotHostState() {
  return { ...hostState };
}

// 把 qiankun 生命周期搬到页面上展示，发布用户能直接看到挂载链路。
export function addLifecycleLog(stage: string, appName: string, detail = '') {
  lifecycleLogs.value = [
    {
      appName,
      detail,
      id: ++logId,
      stage,
      time: new Date().toLocaleTimeString(),
    },
    ...lifecycleLogs.value,
  ].slice(0, 8);
}

// initGlobalState 返回的 actions 是主子应用通信入口。
// 这里集中保存，页面不需要直接依赖 qiankun API。
export function bindGlobalActions(actions: MicroAppStateActions) {
  globalActions = actions;
  globalActions.setGlobalState(snapshotHostState());
  addLifecycleLog('setGlobalState', hostState.appName, 'initial host state broadcast');
}

export function handleGlobalStateChange(state: Partial<HostState>) {
  if (!state.childReport || state.childReport.id === latestChildReportId) return;

  latestChildReportId = state.childReport.id;
  hostState.childReport = state.childReport;
  addLifecycleLog(
    'childReport',
    state.childReport.source,
    `${state.childReport.page}: ${state.childReport.message}`
  );
}

// 真实项目可以把用户、租户、权限摘要等放进 hostState，再广播给子应用。
export function broadcastHostState(source = 'host-control') {
  hostState.signal += 1;
  hostState.updatedAt = new Date().toLocaleTimeString();
  globalActions?.setGlobalState(snapshotHostState());
  addLifecycleLog('setGlobalState', hostState.appName, `${source} #${hostState.signal}`);
}

export function useQiankunHostState() {
  const latestLog = computed(() => lifecycleLogs.value[0]);

  return {
    broadcastHostState,
    hostState,
    latestLog,
    lifecycleLogs,
  };
}
