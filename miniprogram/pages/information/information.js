// miniprogram/pages/information/information.js
const FirstWish = '#FF9100';
const SecontWish = '#FFD180';
const PhoneRule = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
const QQRule = /^[1-9][0-9]{4,}$/;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    department: [],
    name: '',
    uid: 'U',
    phone: '',
    qq: '',
    introduce: '',
    lists: {
      editor: { name: "编辑部" },
      office: { name: "策划部" },
      media: { name: "媒体部" },
      onecho: { name: "One Echo" },
      workshop: { name: "雁祉作坊" }
    }
  },

  checkDepartment(event) {
    const value = event.detail;
    const lists = this.data.lists;

    for (let key in lists) {
      if(key === value[0]) 
        lists[key].wish = FirstWish;
      else if(key === value[1])
        lists[key].wish = SecontWish;
      else 
        lists[key].wish = '';
    }

    this.setData({
      department: value,
      lists
    })
  },

  changeForm(event) {
    const key = event.currentTarget.dataset.id;
    const value = event.detail;
    this.setData({
      [key]: value
    })
  },

  submitInfo() {
    const { lists, name, phone, qq, introduce } = this.data;
    const uid = this.data.uid.toUpperCase();

    const department = {}

    for (let key in lists) {
      const wish = lists[key].wish
      if (wish) {
        department[key] = lists[key]
        if (wish === FirstWish)
          department[key].wish = "第一志愿";
        else if (wish === SecontWish)
          department[key].wish = "第二志愿";
      }
    }

    if(!name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return
    }

    if(!uid.startsWith('U20')) {
      wx.showToast({
        title: '学号不符合规范',
        icon: 'none'
      });
      return
    } 

    if (!PhoneRule.test(phone)) {
      wx.showToast({
        title: '电话不符合规范',
        icon: 'none'
      });
      return
    } 

    if (!QQRule.test(qq)) {
      wx.showToast({
        title: 'QQ不符合规范',
        icon: 'none'
      });
      return
    } 

    if (!Object.keys(department).length) {
      wx.showToast({
        title: '请至少选择一个部门',
        icon: 'none'
      });
      return
    } 

    const db = wx.cloud.database();
    const recruit = db.collection('recruit');

    wx.showLoading({
      title: '正在提交信息'
    })

    recruit.where({ uid }).get().then(res => {
      const data = res.data

      if(data.length > 0) throw {
        message: '该学号已注册'
      }

      return recruit.add({
        data: {
          name,
          uid,
          phone,
          qq,
          introduce,
          department,
          time: db.serverDate()
        }
      })
    }).then(res => {
      wx.hideLoading()
      wx.redirectTo({
        url: '/pages/checkStatus/checkStatus?id=' + res._id,
      })
    }).catch(err => {
      wx.hideLoading()
      console.log(err);
      wx.showToast({
        title: err.message || '报名失败，请确认网络后重试',
        icon: 'none'
      })
    })
  }
})