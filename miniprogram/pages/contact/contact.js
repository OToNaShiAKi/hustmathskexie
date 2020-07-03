// pages/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    departContact: []
  },
  getContacts(){
    wx.showLoading({
      title: '加载中'
    })
    wx.cloud.callFunction({
      name: "getContact",
    }).then(res => {
      const departContact = res.result;
      this.setData({
        departContact
      });
      wx.showToast({
        title: '加载完成'
      })

    }).catch(err => {
      wx.showToast({
        title: '加载失败，请确认网络后重试',
        icon: 'none'
      })
      console.log(err);

    }).finally(wx.hideLoading)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getContacts();
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
    // this.getContacts();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})