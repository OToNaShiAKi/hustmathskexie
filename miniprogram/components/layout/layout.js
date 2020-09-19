// components/layout/layout.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    color: String,
    line: {
      type: Boolean,
      value: false
    },
    desc: String,
    icon: {
      type: String,
      value: ''
    },
    link: String
  },

  /**
   * 组件的方法列表
   */
  methods: {
    linkTo() {
      if (this.data.title == "公房借用") {
        wx.showModal({
          title: '公房借用系统网址',
          content: 'http://hustmaths.top/manage',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.setClipboardData({
                data: 'http://hustmaths.top/manage'
              }).then(res => {
                wx.showToast({
                  title: "已复制到剪切板",
                  duration: 500
                })
              }).catch(err => {
                wx.showToast({
                  title: '复制失败',
                });
              });
            }
          }
        })
      } else if (this.data.title == "物理实验数据处理") {
        wx.showModal({
          title: '物理实验数据处理系统网址',
          content: 'http://hustmaths.top/physics/',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.setClipboardData({
                data: 'http://hustmaths.top/physics/'
              }).then(res => {
                wx.showToast({
                  title: "已复制到剪切板",
                  duration: 500
                })
              }).catch(err => {
                wx.showToast({
                  title: '复制失败',
                });
              });
            }
          }
        })
      } else {
        const link = this.data.link;
        if (link)
          wx.navigateTo({
            url: `/pages/${link}/${link}`
          })
        else
          wx.showToast({
            title: '该功能尚未整合，请从官网使用',
            icon: 'none'
          })
      }
    }
  }
})