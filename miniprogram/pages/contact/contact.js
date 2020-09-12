// pages/contact/contact.js
import {
  DepartFormat
} from './../../utils/Format';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    departContact: [],
    tabActive: 0,
    showPop: false,
    fontSize:"1em"
  },
  getContacts() {
    wx.showLoading({
      title: '加载中'
    });

    wx.cloud.callFunction({
      name: "getContact",
    }).then(res => {
      let departContact = res.result;
      departContact.forEach(ele => {
        const noImgUrl = "https://i0.hdslb.com/bfs/bangumi/image/b94af13bdd10c1c1dd1912328d665333c4324d77.png";
        ele.departCN = DepartFormat(ele.department);
        ele.canDownload = (ele.imgUrl === "none") ? false : true;
        ele.imgUrl = (ele.imgUrl === "none") ? noImgUrl : ele.imgUrl;
      });

      this.setData({
        departContact
      });
      wx.showToast({
        title: '加载完成',
        duration: 800
      })

    }).catch(err => {
      wx.showToast({
        title: '加载失败，请确认网络后重试',
        icon: 'none',
        duration: 800
      })
      console.log(err);
    }).finally(wx.hideLoading);
  },
  /**
   * 事件函数
   */
  onClose() {
    this.setData({
      showPop: false
    });
  },
  outBox(event) {
    const canDownload = event.currentTarget.dataset.flag;
    if (!canDownload) {
      return;
    }
    this.setData({
      showPop: true
    });
  },

  //扫描二维码

  //下载二维码
  download(event) {
    const img = event.currentTarget.dataset.img;
    this.setData({
      showPop: false
    });
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.downloadFile({
      fileID: img
    }).then(res => {
      return wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
      })
    }).then(res => {

      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 1000
      }).catch(error => {
        wx.showToast({
          title: '保存失败，请检查网络状态',
          duration: 1000
        }).finally(wx.hideLoading);
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getContacts();
  }
})