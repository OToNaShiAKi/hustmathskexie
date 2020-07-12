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
    booklists:[],
    borrowBooklists:[],
    confirm: '',
    value: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true,
      height:wx.getSystemInfoSync().windowHeight
    })
    wx.cloud.callFunction({
      name:"getBooks"
    }).then(res=>{
      this.setData({
        booklists:res.result.data
      })
    })
  },

  onSearch: function (event) {
    const {
      value
    } = this.data;
    var reg_value=".*";
    for(let i=0;i<value.length;i++){
      reg_value+=value[i]+".*";
    }
    wx.cloud.callFunction({
      name:"getBooks",
      data:{
        name:reg_value
      }
    }).then(res=>{
      this.setData({
        booklists:res.result.data
      })
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
    if(this.data.borrowBooklists.length===0){
      wx.showToast({
        title: '书籍已全部归还',
        duration:800,
        icon:'none'
      })
      return;
    }
    this.setData({
      dialog: true
    });
  },
  adminSignIn: function () {
    Dialog.confirm({
        title: '管理员验证',
      })
      .then(() => {
        const {
          confirm
        } = this.data;
        if (confirm != 1234)
          return;
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
    if(event.detail==''){
      wx.cloud.callFunction({
        name:"getBooks"
      }).then(res=>{
        this.setData({
          booklists:res.result.data
        })
      })
    }
  },
  
})