// pages/interest/interest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group:[],
    activename:[],
    color:"#30336b"
  },
  onChange(event) {
    console.log(event);
    
    this.setData({
      activename: event.detail,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '查询课堂中',
    });
    wx.cloud.callFunction({
      name: "getInterest"
    }).then(res => {
      const group = res.result;
      console.log(res);
      this.setData({
        group
      });
      wx.showToast({
        title: '查询成功',
      });
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: err.message || "查询失败",
        icon: "none"
      });
    })
  }
})