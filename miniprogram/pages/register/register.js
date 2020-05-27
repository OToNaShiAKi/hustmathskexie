// miniprogram/pages/register/register.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialog: false,
    layout: [{
      title: "填写报名信息",
      desc: "科协想更了解你",
      color: "orange",
      icon: "edit",
      link: "information"
    }, {
      title: "报名须知",
      desc: "报名前一定要看哦",
      color: "green"
    }, {
      title: "部门简介",
      desc: "了解部门工作内容",
      color: "blue"
    }, {
      title: "查询报名状态",
      desc: "面试时间和录取状态都在里面",
      color: "red",
      icon: "status",
      link: 'checkStatus'
    }, {
      title: "联系部门",
      desc: "任何问题都可以问",
      color: "purple"
    }]
  },

  showDialog() {
    this.setData({ dialog: true })
  }
})