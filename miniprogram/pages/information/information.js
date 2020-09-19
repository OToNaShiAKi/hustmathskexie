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
    phone: '',
    qq: '',
    introduce: '',
    adjustment: 'no',
    lists: {
      // editor: {
      //   name: "编辑部"
      // },
      office: {
        name: "策划部"
      },
      media: {
        name: "媒体部"
      },
      onecho: {
        name: "One Echo"
      },
      workshop: {
        name: "雁祉作坊"
      }
    }
  },

  checkDepartment(event) {
    const value = event.detail;
    const lists = this.data.lists;

    for (let key in lists) {
      if (key === value[0])
        lists[key].wish = FirstWish;
      else if (key === value[1])
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
  onceclick: false,
  submitInfo() {
    if (this.onceclick) {
      return;
    }
    this.onceclick = true;
    const {
      lists,
      name,
      phone,
      qq,
      introduce,
      adjustment
    } = this.data;
    const department = {}
    var status = new Object();
    for (let key in lists) {
      const wish = lists[key].wish
      if (wish) {
        department[key] = lists[key]
        if (wish === FirstWish) {
          status[lists[key].name] = 0;
          department[key].wish = "第一志愿";
        } else if (wish === SecontWish) {
          status[lists[key].name] = 0;
          department[key].wish = "第二志愿";
        }
      }
    }

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
    };
    wx.showLoading({
      title: '正在提交信息'
    })

    wx.cloud.callFunction({
      name: "sign",
      data: {
        name,
        phone,
        qq,
        introduce,
        department,
        status,
        adjustment,
      }
    }).then(res => {
      if (res.result.status !== 200) throw res.result;
      wx.redirectTo({
        url: '/pages/checkStatus/checkStatus?name=' + name + '&phone=' + phone
      })
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: err.message || '报名失败，请确认网络后重试',
        icon: 'none'
      })
    }).finally(wx.hideLoading)
  }
})