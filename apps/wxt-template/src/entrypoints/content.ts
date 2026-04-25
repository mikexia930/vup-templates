export default defineContentScript({
  matches: ['https://example.com/*'],
  main() {
    console.info('[wxt-template] content script loaded', window.location.href);
  },
});
