/**
 * 排除任意路径段为 public/ 下的源码（如 MSW 生成的 mockServiceWorker.js），避免参与 eslint / prettier。
 */
const notUnderPublic = (file) => !/[/\\]public[/\\]/.test(file);

export default {
  '*.{js,ts,tsx,vue}': (filenames) => {
    const files = filenames.filter(notUnderPublic);
    if (files.length === 0) return [];
    return [`eslint --fix ${files.join(' ')}`, `prettier --write ${files.join(' ')}`];
  },
  '*.{json,md}': ['prettier --write'],
};
