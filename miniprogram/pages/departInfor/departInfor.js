// pages/departInfor/departInfor.js
Page({

  /**
   * 页面的初始数据
   */

  loaded(event) {
    const led = this.data.led + 1;
    this.setData({
      led
    });
    if (led >= 5) {
      wx.showToast({
        title: '加载完成',
        duration: 800
      })
    }
  },
  data: {
    urlHead: "cloud://hustmathskexie-ccc2t.6875-hustmathskexie-ccc2t-1302087472/departImage/inforImage_",
    img: ["1.png", "2.png", "3.png", "4.png", "5.png"],
    led: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})