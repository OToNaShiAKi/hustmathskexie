// miniprogram/pages/addSomething/addBorrowRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userlists: [{
      name: '',
      bookname:'',
      totalNum: 1
    }],
  },

  addBook: function () {
    const userlists = this.data.userlists;
    userlists.push({
      name: '',
      bookname:'',
      totalNum: 1
    })
    this.setData({
      userlists
    })
  },

  changeForm: function (event) {
    const key = event.currentTarget.dataset.key;
    const index = event.currentTarget.dataset.index;
    const value = event.detail;
    const userlists = this.data.userlists;
    userlists[index][key] = value;
    this.setData({
      userlists
    });
  },

  submit: function () {
    const {
      userlists
    } = this.data;
    for (let item of userlists) {
      if (item.name == "") {
        wx.showToast({
          title: '请填写好所有姓名',
          icon: 'none'
        })
        return;
      }
      if (item.bookname == "") {
        wx.showToast({
          title: '请填写好所有借阅id',
          icon: 'none'
        })
        return;
      }
      if(isNaN(item.bookname)){
        wx.showToast({
          title: '请检查借阅id是否数字',
          icon: 'none'
        })
        return;
      }
    }
    console.log(userlists)
    wx.cloud.callFunction({
      name: "addBorrowRecords",
      data: {
        userlists
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