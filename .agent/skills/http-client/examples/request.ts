// 范例：apps/<app>/src/api/request.ts
//
// HTTP 客户端适配层。适用 4 个 stack：vue / electron / capacitor / wxt。
//
// 关键设计：本文件不直接接触平台细节（token / locale / 路由跳转），
// 全部委托给其他 skill：
//   - token 存取 → token-storage skill（按平台实现）
//   - locale 来源 → 各 stack skill（i18n 章节）
//   - 401 路由跳转 → 各 stack skill（router 章节）
//
// AI 使用：参考结构与命名，按当前 app 的具体 token-storage 实现重写。

import { createHttpClient } from '@vup/http';
// 由 token-storage skill 按平台提供具体实现
import { getAccessToken, removeAccessToken } from '@/shared/utils/tokenStorage';

const request = createHttpClient({
  baseURL: import.meta.env.VITE_API_BASE || '',
  getAccessToken,
  // locale 实现见对应 stack skill 的 i18n 章节
  getLocale: () => 'en_US',
  // 401 处理：清 token + 跳登录页（跳转方式见对应 stack skill 的 router 章节）
  onUnauthorized: () => {
    removeAccessToken();
    // 例：window.location.href = '/login' (vue/electron)
    // 例：router.replace('/login')        (capacitor)
    // 例：browser.runtime.sendMessage(...) (wxt)
  },
  // 主动取消属于受控行为，不当作异常噪声
  onResponseError: (error, message) => {
    if (request.isCanceled(error)) return;
    console.error('[request]', message);
  },
});

export const isRequestCanceled = request.isCanceled;

export default request;
