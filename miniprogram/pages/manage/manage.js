// miniprogram/pages/manage/manage.js
import {
  DepartFormat
} from './../../utils/Format';
import {
  DepartColor
} from './../../utils/FormatColor';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonColor: "",
    imgUrl: "",
    depart: {
      key: '',
      name: ''
    },
    firstWish: [],
    secondWish: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const depart = this.data.depart;
    const key = options.department;
    const imgUrl = `http://hustmaths.top/img_weixin/departlogos/${key}_bgc.png`;
    const buttonColor = DepartColor(key);
    depart.key = key;
    depart.name = DepartFormat(key);
    this.setData({
      depart,
      imgUrl,
      buttonColor
    })

  },

  addTest() {
    const depart = this.data.depart.key;
    wx.navigateTo({
      url: '/pages/addTest/addTest?department=' + depart
    })
  },

  selectStudent() {
    const depart = this.data.depart.key;
    wx.navigateTo({
      url: '/pages/selectStudent/selectStudent?department=' + depart
    })
  },

  unfold(event) {
    this.setData({
      panel: event.detail,
    });
  },

  changeStatus(event) {
    const id = event.currentTarget.dataset.id
  }
})