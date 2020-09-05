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

  close(event) {
    const index = event.currentTarget.dataset.index;
    const booklists = this.data.booklists;
    if (booklists.length === 1) {
      wx.showToast({
        title: '至少添加一本书籍',
        icon: 'none'
      })
      return;
    }
    booklists.splice(index, 1);
    this.setData({
      booklists
    })
  },

  onceClick: false,
  submit: function () {
    if (this.onceClick) return;
    const {
      booklists
    } = this.data;
    if (!this.onceClick) {
      this.onceClick = true;
    }
    for (let item of booklists) {
      if (item.name == "") {
        wx.showToast({
          title: '请填写好所有书名',
          icon: 'none'
        })
        return
      }
      if (item.totalNum < 0) {
        wx.showToast({
          title: '请检查好书的数量不能为负数',
          icon: 'none'
        })
        return
      }
      if (isNaN(item.totalNum)) {
        wx.showToast({
          title: '请检查好书的数量必须为数字',
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

})