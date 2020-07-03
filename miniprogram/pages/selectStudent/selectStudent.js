// miniprogram/pages/selectStudent/selectStudent.js
import { DepartFormat } from './../../utils/Format'
import { DepartColor } from './../../utils/FormatColor';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonColor:"",
    depart: { key: '', name: '' },
    interview: { num: 0, list: [] },
    written: { num: 0, list: [] },
    operation: { num: 0, list: [] },
    showIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const depart = this.data.depart;
    const key = options.department;
    const buttonColor = DepartColor(key);
    depart.key = key;
    depart.name = DepartFormat(key);
    this.selectStudent(depart.name);
    this.setData({ depart , buttonColor });
  },

  panel: function (e) {
    console.log(e);
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
  },

  selectStudent: function (name) {
    let result, data, interview, written, operation;
    interview = {
      num: 0,
      list: []
    };
    written = {
      num: 0,
      list: []
    };
    operation = {
      num: 0,
      list: []
    };
    wx.cloud.callFunction({
      name: 'selectStudent',
      data: {
        name: name
      }
    }).then(res => {
      result = res.result;
      data = result.result.res.data;
      for (let i = 0; i < data.length; i++) {
        switch (data[i].status) {
          case 0:
            interview.num++;
            interview.list.push(data[i]);
            break;
          case 2:
            written.num++;
            written.list.push(data[i]);
            break;
          case 4:
            operation.num++;
            operation.list.push(data[i]);
            break;
        }
      }
      console.log(data, res)
      this.setData({ interview, written, operation });
    })
  },

  linkto: function (e) {
    console.log(e);
    var button;
    if (e.target.dataset.name) {
      wx.navigateTo({
        url: '/pages/infoDetail/infoDetail?id=' + e.currentTarget.dataset.id
      })
    } else if (button = e.target.dataset.button) {
      console.log(button);
      wx.cloud.callFunction({
        name: "selectPassOrNot",
        data: {
          choice: button,
          id: e.currentTarget.dataset.id
        }
      }).then(res => {
        this.selectStudent(this.data.depart.name);
        console.log(res);
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})