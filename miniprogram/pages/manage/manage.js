// miniprogram/pages/manage/manage.js
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

    wx.showLoading({
      title: '查询报名数据'
    })

    if (key === 'editor') depart.name = '编辑部';
    else if (key === 'office') depart.name = '策划部';
    else if (key === 'media') depart.name = '媒体部';
    else if (key === 'onecho') depart.name = 'One Echo';
    else if (key === 'workshop') depart.name = '雁祉作坊';

    const db = wx.cloud.database();
    const recruit = db.collection('recruit');
    recruit.get().then(res => {
      const firstWish = []
      const secondWish = []
      for(let register of res.data) 
        for (let depart in register.department) 
          if (depart === key) {
            if (register.department[depart].wish == '第一志愿')
              firstWish.push(register);
            else if (register.department[depart].wish == '第二志愿')
              secondWish.push(register);
            break;
          }

      wx.hideLoading()
      wx.showToast({
        title: '查询成功'
      })
      this.setData({ depart, firstWish, secondWish });
    }).catch(err => {
      console.log(err);
      wx.hideLoading()
      wx.showToast({
        title: '查询失败',
        icon: 'none'
      })
    })
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