// components/readBox/readBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageNum: {
      type: Number,
      value: 30
    },
    issue: {
      type: Number,
      value: 15
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pageArr: [],
    showPage: 0,
    menuOn: true,
    //放图片的地方
    urlHead: "http://hustmaths.top/img_weixin/magazine"
  },

  lifetimes: {
    ready() {
      let pageArr = this.data.pageArr;
      let showPage = 0;
      for (let i = 0; i < this.properties.pageNum; i++) {
        pageArr.push(i + 1);
      };
      this.setData({
        pageArr,
        showPage
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    taped(event) {
      const width = wx.getSystemInfoSync().windowWidth;
      let p = this.data.showPage;
      let sup = this.properties.pageNum;
      if (!this.data.menuOn) {
        if (event.detail.x <= 80) {
          this.setData({
            showPage: (p > 0) ? (p - 1) : p
          })
        } else if (event.detail.x >= width - 80) {
          this.setData({
            showPage: (p < sup - 1) ? (p + 1) : p
          });
        } else {
          this.setData({
            menuOn: !this.data.menuOn,
            menuOn:this.data.menuOn
          });
          const detail = {
            nowPage: this.data.showPage + 1,
          };
          const option = {};
          this.triggerEvent('clicks', detail, option);
        }
      } else {
        this.setData({
          menuOn: !this.data.menuOn
        });
        console.log(2);

        const detail = {
          nowPage: this.data.showPage + 1,
          menuOn:this.data.menuOn
        };
        const option = {};
        this.triggerEvent('close', detail, option);
      }
    },
    changed(event) {
      if (event.detail.source === "touch") {
        let showPage = event.detail.current;
        this.setData({
          showPage
        });
      } else {
        return;
      }
    }
  }
})