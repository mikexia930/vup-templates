import { computed, reactive } from 'vue';
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

export type ChildMode = 'auto' | 'manual' | 'standalone';

export interface HostState {
  appName?: string;
  signal?: number;
  updatedAt?: string;
  userName?: string;
}

export interface ChildReport {
  id: number;
  message: string;
  page: string;
  source: string;
  time: string;
}

export interface QiankunRenderProps {
  baseRoute?: string;
  container?: Element;
  mode?: ChildMode;
  onGlobalStateChange?: (
    callback: (state: HostState, prev: HostState) => void,
    fireImmediately?: boolean
  ) => void;
  setGlobalState?: (state: { childReport: ChildReport }) => boolean;
}

const runtime = reactive({
  baseRoute: '/',
  hostState: {} as HostState,
  mode: 'standalone' as ChildMode,
  reportCount: 0,
});

let setGlobalState: QiankunRenderProps['setGlobalState'] | null = null;

export function bindQiankunProps(props: QiankunRenderProps = {}) {
  runtime.baseRoute = props.baseRoute ?? '/';
  runtime.mode = props.mode ?? 'standalone';
  setGlobalState = props.setGlobalState ?? null;

  props.onGlobalStateChange?.((state) => {
    runtime.hostState = state;
  }, true);
}

export function resetQiankunRuntime() {
  runtime.baseRoute = '/';
  runtime.hostState = {};
  runtime.mode = 'standalone';
  setGlobalState = null;
}

export function reportToHost(page: string) {
  runtime.reportCount += 1;
  const report: ChildReport = {
    id: Date.now(),
    message: `Child ${page} interaction #${runtime.reportCount}`,
    page,
    source: 'example-qiankun',
    time: new Date().toLocaleTimeString(),
  };

  setGlobalState?.({ childReport: report });
}

export function useQiankunRuntime() {
  const modeLabel = computed(() =>
    qiankunWindow.__POWERED_BY_QIANKUN__ ? 'Mounted by host app' : 'Running standalone'
  );

  return {
    modeLabel,
    reportToHost,
    runtime,
  };
}
