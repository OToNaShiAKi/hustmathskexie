// miniprogram/pages/magazines/magazines.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    magazines: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    wx.cloud.callFunction({
      name: "allMagazines"
    }).then(res => {
      if (res.result.status !== 200) throw res.result;
      const magazines = res.result.lists;
      this.setData({ magazines })
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: err.message || "查询失败",
        icon: "none"
      })
    })
  }
})