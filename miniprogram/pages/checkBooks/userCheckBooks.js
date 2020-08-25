// miniprogram/pages/userCheckBooks/userCheckBooks.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    dialog: false,
    label: "",
    type: "",
    name: "",
    booklists: [],
    borrowBooklists: [],
    confirm: '',
    qq: '',
    value: ''
  },
  bookIndex: 0,
  loading: false,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true,
      height: wx.getSystemInfoSync().windowHeight,
      scrollHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750) * 270
    })
    wx.cloud.callFunction({
      name: "getName",
      data: {
        name: this.data.userInfo.nickName
      }
    }).then(res => {
      if (!res.result) {
        this.userSignIn();
      } else {
        this.setData({
          name: res.result
        })
      }
    })
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
      name: "getBorrowBooks",
      data: {
        name: this.data.name
      }
    }).then(res => {
      this.setData({
        borrowBooklists: res.result
      })
    })
  },

  onSearch: function (event) {
    const {
      value
    } = this.data;
    var reg_value = ".*";
    for (let i = 0; i < value.length; i++) {
      reg_value += value[i] + ".*";
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
          title: '书库已经被你个无聊鬼翻完了!',
          icon: "none",
          duration: 1000
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

  showInfo: function (event) {
    this.setData({
      show: true
    });
  },

  onClose: function (event) {
    this.setData({
      show: false
    })
  },

  showBorrowBook: function () {
    if (this.data.name === "") {
      this.userSignIn();
      return;
    }
    wx.cloud.callFunction({
      name: "getBorrowBooks",
      data: {
        name: this.data.name
      }
    }).then(res => {
      let userlists = res.result.result.data;
      for (let i = 0; i < userlists.length; i++) {
        userlists[i].date = userlists[i].date.slice(0, userlists[i].date.indexOf('T'));
      }
      this.setData({
        borrowBooklists: userlists
      })
      if (this.data.borrowBooklists.length === 0) {
        wx.showToast({
          title: '书籍已全部归还',
          duration: 800,
          icon: 'none'
        })
        return;
      }
      this.setData({
        dialog: true
      });
    })
  },

  userSignIn: function () {
    this.setData({
      label: "真实姓名",
      type: "text"
    })
    Dialog.confirm({
      title: '君の名は？'
    }).then(res => {
      const {
        confirm,
        qq
      } = this.data;
      wx.cloud.callFunction({
        name: "setName",
        data: {
          name: this.data.userInfo.nickName,
          realName: confirm,
          qq
        }
      })
      this.setData({
        name: confirm
      })
    }).catch(e => {})
  },

  adminSignIn: function () {
    this.setData({
      label: "管理员验证",
      type: "password"
    })
    Dialog.confirm({
        title: '管理员验证'
      })
      .then(() => {
        const {
          confirm
        } = this.data;
        if (confirm != 'August010') {
          wx.showToast({
            title: '密码错误',
            duration: 500,
            icon: "none"
          })
          this.setData({
            confirm: ''
          })
          return;
        }
        wx.navigateTo({
          url: 'adminCheckBooks',
        })
      })
      .catch(() => {});
  },

  changeData(event) {
    const key = event.currentTarget.dataset.key;
    this.setData({
      [key]: event.detail
    });
    if (event.detail == '') {
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

})