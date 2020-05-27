// miniprogram/pages/addTest/addTest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    depart: { key: '', name: '' },
    show: false,
    type: "face",
    place: "",
    limit: 5,
    lists: [],
    timer: new Date().getTime()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    const depart = this.data.depart
    const key = options.department;
    depart.key = key;

    if (key === 'editor') depart.name = '编辑部';
    else if (key === 'office') depart.name = '策划部';
    else if (key === 'media') depart.name = '媒体部';
    else if (key === 'onecho') depart.name = 'One Echo';
    else if (key === 'workshop') depart.name = '雁祉作坊';

    this.setData({ depart })
  },

  changeForm(event) {
    const key = event.currentTarget.dataset.key;
    const value = event.detail;
    this.setData({ [key]: value })
  },

  showTime(event) {
    const show = event.type === 'tap' ? true : false;
    this.setData({ show })
  },

  confirmTime(event) {
    const date = new Date(event.detail);
    const lists = this.data.lists;
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    lists.push(`${month}月${day}日 ${hour}:${minute}`);
    this.setData({ lists, show: false })
  },

  add() {
    const { type, place, limit, lists } = this.data;
    const key = this.data.depart.key;
  }
})