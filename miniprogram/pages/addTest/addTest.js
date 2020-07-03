// miniprogram/pages/addTest/addTest.js
import {
  DepartColor
} from './../../utils/FormatColor';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonColor: "",
    depart: {
      key: '',
      name: ''
    },
    type: "face",
    lists: [{
      limit: 6,
      place: "",
      time: ""
    }],
    tip: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const depart = this.data.depart
    const key = options.department;
    const buttonColor = DepartColor(key);
    depart.key = key;

    if (key === 'editor') depart.name = '编辑部';
    else if (key === 'office') depart.name = '策划部';
    else if (key === 'media') depart.name = '媒体部';
    else if (key === 'onecho') depart.name = 'One Echo';
    else if (key === 'workshop') depart.name = '雁祉作坊';

    this.setData({
      depart,
      buttonColor
    })
  },

  changeForm(event) {
    const key = event.currentTarget.dataset.key;
    const index = event.currentTarget.dataset.index;
    const value = event.detail;
    const lists = this.data.lists;
    lists[index][key] = value;
    this.setData({
      lists
    });
  },

  changeType(event) {
    const key = event.currentTarget.dataset.key;
    const value = event.detail;
    this.setData({
      [key]: value
    });
  },

  addPlace() {
    const lists = this.data.lists;
    lists.push({
      limit: 6,
      place: "",
      time: ""
    })
    this.setData({
      lists
    })
  },

  close(event) {
    const index = event.currentTarget.dataset.index;
    const lists = this.data.lists;
    if (lists.length === 1) {
      wx.showToast({
        title: '至少添加一场测试',
        icon: 'none'
      })
      return;
    }
    lists.splice(index, 1);
    this.setData({
      lists
    })
  },

  submit() {
    const {
      type,
      lists,
      tip
    } = this.data;
    const department = this.data.depart.key;

    const db = wx.cloud.database();
    const examination = db.collection('examination')

    for (let item of lists)
      if (!item.place || !item.time || !item.limit) {
        wx.showToast({
          title: '输入不可为空',
          icon: 'none'
        })
        return;
      }

    examination.add({
      data: {
        type,
        lists,
        department,
        time: db.serverDate(),
        tip
      }
    }).then(res => {

    })
  },

  adminTest() {

  }
})