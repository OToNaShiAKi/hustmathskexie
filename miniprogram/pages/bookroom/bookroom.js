// miniprogram/pages/bookroom/bookroom.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      height: wx.getSystemInfoSync().windowHeight + 'px'
    })
  },

  bindGetUserInfo: function (event) {
    if (event.detail.errMsg != "getUserInfo:ok") {
      return;
    }
    app.globalData.userInfo = event.detail.userInfo
    wx.cloud.callFunction({
      name: "getUserIdInfo",
      data: {
        UserInfo: wx.cloud.CloudID(event.detail.cloudID)
      }
    }).then(res => {
      wx.cloud.callFunction({
        name: "addBookUsers",
        data: {
          name: event.detail.userInfo.nickName,
          id: res.result
        }
      })
    })
    wx.navigateTo({
      url: '/pages/checkBooks/userCheckBooks',
    })
  }
})