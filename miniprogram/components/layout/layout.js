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
})
