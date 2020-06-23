// miniprogram/pages/manage/manage.js
import { DepartFormat } from './../../utils/Format'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    depart: { key: '', name: ''},
    firstWish: [],
    secondWish: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    const depart = this.data.depart
    const key = options.department;
    depart.key = key;
    depart.name = DepartFormat(key);
    this.setData({ depart })

    /* wx.showLoading({
      title: '查询报名数据'
    })

    wx.cloud.callFunction({
      name: "allSigns",
      data: { key }
    }).then(res => {
      console.log(res);
    }) */
  },

  addTest() {
    const depart = this.data.depart.key;
    wx.navigateTo({
      url: '/pages/addTest/addTest?department=' + depart
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