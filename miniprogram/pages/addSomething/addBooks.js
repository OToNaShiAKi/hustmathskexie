// miniprogram/pages/addSomething/addBooks.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booklists: [{
      name: '',
      totalNum: 1
    }],
  },

  addBook: function () {
    const booklists = this.data.booklists;
    booklists.push({
      name: '',
      totalNum: 1
    })
    this.setData({
      booklists
    })
  },

  changeForm: function (event) {
    const key = event.currentTarget.dataset.key;
    const index = event.currentTarget.dataset.index;
    const value = event.detail;
    const booklists = this.data.booklists;
    booklists[index][key] = value;
    this.setData({
      booklists
    });
  },

  submit: function () {
    console.log(this.data)
    const {
      booklists
    } = this.data;
    for (let item of booklists) {
      if (item.name == "") {
        wx.showToast({
          title: '请填写好所有书名',
          icon: 'none'
        })
        return
      }
    }
    wx.cloud.callFunction({
      name: "addBooks",
      data: {
        booklists
      }
    }).then(res => {
      wx.navigateBack({
        complete: () => {
          wx.showToast({
            title: res.result.msg,
          })
        },
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})