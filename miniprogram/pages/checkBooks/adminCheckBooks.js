// miniprogram/pages/checkBooks/adminCheckBooks.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: '',
    value2: '',
    current_id: '',
    booklists: [],
    userlists: [],
  },
  loading: false,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
      scrollHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750) * 350
    })
  },

  getBooks: function (event) {
    if (this.loading) {
      return;
    }
    wx.showLoading({
      title: 'Loading',
      mask: true,
      complete: () => {
        this.loading = true;
      }
    })
    wx.cloud.callFunction({
      name: "getBooks",
      data: {
        name: ".*",
        limit: 20,
        index: this.bookIndex
      }
    }).then(res => {
      let booklists = res.result.data;
      if (booklists.length == 0) {
        wx.hideLoading({
          complete: () => {
            this.loading = false;
          }
        });
        wx.showToast({
          title: '管理员桑翻遍书库是想找到什么呢？（笑）',
          icon: "none",
          duration: 2000
        })
        return
      }
      this.bookIndex = booklists[booklists.length - 1].index;
      booklists = this.data.booklists.concat(booklists);
      this.setData({
        booklists
      })
      setTimeout(() => {
        wx.hideLoading({
          complete: () => {
            this.loading = false;
          }
        });
      }, 1500)
    })
  },

  onShow: function (event) {
    wx.cloud.callFunction({
      name: "getBooks",
      data: {
        name: ".*",
        limit: 40,
        index: 0
      },
    }).then(res => {
      this.bookIndex = res.result.data[res.result.data.length - 1].index;
      this.setData({
        booklists: res.result.data
      })
    })
    wx.cloud.callFunction({
      name: "getUsers",
      data: {
        name: '.*'
      }
    }).then(res => {
      let userlists = res.result.result.data;
      for (let i = 0; i < userlists.length; i++) {
        userlists[i].displayDate = userlists[i].date.slice(0, userlists[i].date.indexOf('T'));
      }
      this.setData({
        userlists
      })
    })
  },

  onSearch: function (event) {
    const {
      value1
    } = this.data;
    let reg_value = ".*";
    for (let i = 0; i < value1.length; i++) {
      reg_value += value1[i] + ".*";
    }
    wx.cloud.callFunction({
      name: "getBooks",
      data: {
        name: reg_value
      }
    }).then(res => {
      this.setData({
        booklists: res.result.data
      })
    })
  },

  onChange(e) {
    this.setData({
      value1: e.detail,
    });
    if (e.detail == '') {
      wx.cloud.callFunction({
        name: "getBooks",
        data: {
          name: ".*",
          limit: 40,
          index: 0
        },
      }).then(res => {
        this.bookIndex = res.result.data[res.result.data.length - 1].index;
        this.setData({
          booklists: res.result.data
        })
      })
    }
  },

  addBook: function () {
    wx.navigateTo({
      url: '/pages/addSomething/addBooks',
    })
  },

  searchPeople: function (event) {
    const {
      value2
    } = this.data;
    let reg_value = ".*";
    for (let i = 0; i < value2.length; i++) {
      reg_value += value2[i] + ".*";
    }
    wx.cloud.callFunction({
      name: "getUsers",
      data: {
        name: reg_value
      }
    }).then(res => {
      let userlists = res.result.result.data;
      for (let i = 0; i < userlists.length; i++) {
        userlists[i].displayDate = userlists[i].date.slice(0, userlists[i].date.indexOf('T'));
      }
      this.setData({
        userlists
      })
    })
  },
  changeName(e) {
    this.setData({
      value2: e.detail,
    });
    console.log(e.detail)
    if (e.detail == '') {
      console.log(1)
      wx.cloud.callFunction({
        name: "getUsers",
        data: {
          name: ".*"
        }
      }).then(res => {
        let userlists = res.result.result.data;
        for (let i = 0; i < userlists.length; i++) {
          userlists[i].displayDate = userlists[i].date.slice(0, userlists[i].date.indexOf('T'));
        }
        this.setData({
          userlists
        })
      })
    }
  },

  addBorrowRecord: function () {
    wx.navigateTo({
      url: '/pages/addSomething/addBorrowRecord',
    })
  },

  returnBook: function (event) {
    let {
      bookname,
      name,
      num,
      _id
    } = event.currentTarget.dataset;
    if (this.data.current_id == _id) {
      return
    }
    this.setData({
      current_id: _id
    })
    wx.cloud.callFunction({
      name: "removeBorrowRecord",
      data: {
        name,
        bookname,
        num,
        _id
      }
    }).then(res => {
      this.onShow()
    })
  }

})