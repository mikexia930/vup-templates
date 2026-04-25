import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronTemplate', {
  getRuntimeInfo: () => ipcRenderer.invoke('app:get-runtime-info'),
});
