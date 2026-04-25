export function copyText(text: string, successTitle: string, failTitle: string) {
  uni.setClipboardData({
    data: text,
    success: () => {
      uni.showToast({
        title: successTitle,
        icon: 'success',
        duration: 1600,
      });
    },
    fail: () => {
      uni.showModal({
        title: failTitle,
        content: text,
        showCancel: false,
      });
    },
  });
}

export function showInfo(title: string, content: string, confirmText: string) {
  uni.showModal({
    title,
    content,
    showCancel: false,
    confirmText,
  });
}
