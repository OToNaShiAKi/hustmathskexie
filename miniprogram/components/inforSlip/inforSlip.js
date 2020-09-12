// components/inforSlip/inforSlip.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "标题"
    },
    content: {
      type: String | Number,
      value: "内容"
    },
    oneText: {
      type: Boolean,
      value: false
    },
    oneContent: {
      type: String | Number,
      value: "我不可复制"
    },
    pdXY: {
      type: String,
      value: "0"
    },
    fontColor: {
      type: String,
      value: "#fc8a2e"
    },
    fontSize: {
      type: String,
      value: "1.5em"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    textColor: "unset",
    flag: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeColor(event) {
      let timeSet = undefined;
      clearInterval(timeSet);
      let time = 0;

      this.setData({
        textColor: "#dfe6e9",
        flag: false
      });
      timeSet = setInterval(() => {
        time = time + 10;
        if (this.data.flag) {
          clearInterval(timeSet);
        } else {
          if (time >= 500) {
            wx.setClipboardData({
              data: event.currentTarget.dataset.ctn.toString()
            }).then(res => {
              wx.showToast({
                title: "已复制到剪切板",
                duration: 800
              })
            }).catch(err => {
              console.log(err);
              wx.showToast({
                title: '复制失败',
              });
            });
            this.setData({
              textColor: "unset"
            });
            clearInterval(timeSet);
          }
        }
      }, 10);

    },
    reColor(event) {
      this.setData({
        textColor: "unset",
        flag: true
      });

    }
  }
})