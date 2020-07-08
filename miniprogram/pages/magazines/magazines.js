// miniprogram/pages/magazines/magazines.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    magazines: []
  },

  /**
   * 事件
   */

  toMagazine(event) {
    const issue = event.detail.issue;
    const pageNum = event.detail.pageNum;
    const title = event.detail.title;
    wx.navigateTo({
      url: '/pages/magazineContent/magazineContent?issue=' + issue+ '&pageNum=' + pageNum + '&title=' +title
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '查询杂志中',
    });
    wx.cloud.callFunction({
      name: "allMagazines"
    }).then(res => {
      if (res.result.status !== 200) throw res.result;
      const magazines = res.result.lists;
      //无封面时
      if( magazines.cover="none"){
        magazines.cover="https://i0.hdslb.com/bfs/bangumi/image/54d9ca94ca84225934e0108417c2a1cc16be38fb.png";
      };
      this.setData({
        magazines
      });
      wx.showToast({
        title: '查询成功',
      })
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: err.message || "查询失败",
        icon: "none"
      });
    })
  }
})