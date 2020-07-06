// components/cover/cover.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "标题"
    },
    issue: {
      type: Number,
      value: 0
    },
    cover: {
      type: String,
      value: ""
    },
    pageNum: Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clicked() {
      const detail = {
        issue: this.properties.issue,
        pageNum: this.properties.pageNum
      };
      const option = {};
      this.triggerEvent('clicks', detail, option);

    }
  }
})