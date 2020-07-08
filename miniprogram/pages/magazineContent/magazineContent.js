// pages/magazineContent/magazineContent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,
    issue: 15
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pageNum = options.pageNum;
    const issue = options.issue;
    const titles = options.title
    wx.setNavigationBarTitle({
      title: `第${issue}期 《${titles}》`
    })
    this.setData({
      pageNum,
      issue
    });
  }

})