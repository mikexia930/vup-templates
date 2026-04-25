export default defineBackground(() => {
  console.info('[wxt-template] background service worker ready', { id: browser.runtime.id });
});
