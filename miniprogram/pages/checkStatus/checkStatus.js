// miniprogram/pages/checkStatus/checkStatus.js
const Query = (data, call) => {
  wx.showLoading({
    title: '查询报名信息'
  })

  wx.cloud.callFunction({
    name: "signStatus",
    data
  }).then(res => {
    // console.log(res)
    if (res.result.status !== 200) throw res.result;
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
    onceClick: false,
    steps: {
      'media': [{
          text: '报名成功',
          desc: '等待面试通知',
        },
        {
          text: '面试',
          desc: '面试已过，等待笔试通知',
        },
        {
          text: '笔试',
          desc: '笔试已通过，onecho等待实操',
        },
        {
          text: '实操',
          desc: '全部考核通过，入部成功',
        },
      ],
      "office": [{
          text: '报名成功',
          desc: '等待面试通知',
        },
        {
          text: '面试',
          desc: '面试已过，等待笔试通知',
        },
        {
          text: '笔试',
          desc: '笔试已通过，onecho等待实操',
        },
        {
          text: '实操',
          desc: '全部考核通过，入部成功',
        },
      ],
      "onecho": [{
          text: '报名成功',
          desc: '等待面试通知',
        },
        {
          text: '面试',
          desc: '面试已过，等待笔试通知',
        },
        {
          text: '笔试',
          desc: '笔试已通过，onecho等待实操',
        },
        {
          text: '实操',
          desc: '全部考核通过，入部成功',
        },
      ],
      "workshop": [{
          text: '报名成功',
          desc: '等待面试通知',
        },
        {
          text: '面试',
          desc: '面试已过，等待笔试通知',
        },
        {
          text: '笔试',
          desc: '笔试已通过，onecho等待实操',
        },
        {
          text: '实操',
          desc: '全部考核通过，入部成功',
        },
      ],
    },
    active: 0
  },

  onLoad(options) {
    if (!options.name) return;

    this.setData({
      name: options.name,
      phone: options.phone
    })
    this.checkStatus();
  },

  checkStatus() {
    var {
      onceClick
    } = this.data;
    const {
      name,
      phone
    } = this.data;
    if (!name.length) {
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

    Query({
      name,
      phone
    }, data => {
      if (this.data.status == 504) {
        return;
      }
      if (onceClick == false) {
        onceClick = true;
        this.setData({
          onceClick
        });
      } else {
        return;
      }
      const {
        department,
        status
      } = data;
      const {
        steps
      } = this.data;
      for (let item in department) {
        if(isNaN(status[department[item].name])){
          status[department[item].name]=0;
        }
        if (status[department[item].name] % 2 == 1) {
          status[department[item].name] = Math.ceil(status[department[item].name] / 2);
          let s = status[department[item].name];
          steps[item][s].desc = steps[item][s].text + "未通过";
          steps[item][s].activeIcon = 'cross';
          steps[item][s].activeColor = '#ff0000';
          for (let i = s + 1; i < 4; i++) {
            steps[item].pop();
          }
        } else {
          status[department[item].name] /= 2;
          let s = status[department[item].name];
          steps[item][s].activeIcon = 'success';
          steps[item][s].activeColor = '#38f';
          if (s < 3) {
            steps[item][s + 1].desc = '';
            for (let i = s + 2; i < 4; i++) {
              steps[item].pop();
            }
          }
        }
      }
      this.setData({
        department,
        status,
        steps
      })
    })
  },

  changeForm(event) {
    const key = event.currentTarget.dataset.id;
    const value = event.detail;
    this.setData({
      [key]: value
    });
  },

  linkToSelect(event) {
    const {
      name
    } = this.data;
    if (event.detail != event.currentTarget.dataset.active || event.currentTarget.dataset.icon == "cross" || event.detail == 3) {
      return;
    }
    wx.navigateTo({
      url: '/pages/selectTestTime/selectTestTime?testType=' + event.detail + "&department=" + event.currentTarget.dataset.index + "&name=" + name,
    })
  }
})