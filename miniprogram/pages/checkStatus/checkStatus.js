// miniprogram/pages/checkStatus/checkStatus.js
const Query = (data, call) => {
  wx.showLoading({
    title: '查询报名信息'
  })

  wx.cloud.callFunction({
    name: "signStatus",
    data
  }).then(res => {
    if(res.result.status !== 200) throw res.result;
    wx.showToast({
      title: '查询成功'
    })
    call && call(res.result.data)
  }).catch(err => {
    console.log(err);
    wx.showToast({
      title: err.message || '查询失败，请确认网络后重试',
      icon: 'none'
    })
  }).finally(wx.hideLoading)
}

const PhoneRule = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    department: {},
    steps: [
      {
        text: '报名',
        desc: '核验报名信息数据',
      },
      {
        text: '步骤二',
        desc: '描述信息',
      },
      {
        text: '步骤三',
        desc: '描述信息',
      },
      {
        text: '步骤四',
        desc: '描述信息',
      },
    ],
    active: 2
  },

  onLoad(options) {
    if (!options.id) return;

    Query({id: options.id}, data => {
      const { name, phone, department } = data;
      this.setData({ name, phone, department })
    })
  },

  checkStatus() {
    const { name, phone } = this.data;
    if(!name.length) {
      wx.showToast({
        title: '请输入姓名',
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

    Query({ name, phone }, data => {
      const { department } = data;
      this.setData({ department })
    })
  },

  changeForm(event) {
    const key = event.currentTarget.dataset.id;
    const value = event.detail;
    this.setData({[key]: value});
  }
})