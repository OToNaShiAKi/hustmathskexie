// miniprogram/pages/datetest/datetest.js
const app = getApp()
Page({
  data: {
    show: true,
  },

  getUserInfo(event) {
    console.log(event.detail);
  },

  onClose() {
    this.setData({ close: false });
  },
});