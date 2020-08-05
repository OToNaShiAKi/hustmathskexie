// pages/departInfor/departInfor.js
var app;
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
    app=wx.getSystemInfoSync();
    wx.showLoading({
      title: '加载中',
    })
  },

  register:function (event){
    if(event.currentTarget.offsetTop>100)return;
    let {x,y}=event.detail;
    let width=app.windowWidth;
    let height=width*1.6;
    x/=width;
    y/=height;
    if(x<0.82&&x>0.18&&y<0.80&&y>0.70){
      wx.navigateTo({
        url: '/pages/information/information'
      })
    }
  }
})