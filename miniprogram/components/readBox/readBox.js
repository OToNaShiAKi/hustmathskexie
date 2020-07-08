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
    helpShow: false,
    indicatorDots: true,
    isLoad: [],
    imgUrl: [],
    head: "",
    //放图片的地方
    urlHead: "http://hustmaths.top/img_weixin/magazine",
    //图片格式 
    imgType: `).jpg`
  },
  observers: {
    'showPage': function (showPage) {
      let isLoad = this.data.isLoad;
      if (showPage - 3 <= 0) {
        for (let i = 0; i <= showPage; i++) {
          isLoad[i] = true;
        }
      } else if ((this.data.pageNum - 1) - showPage <= 3) {
        for (let i = showPage; i < this.data.pageNum; i++) {
          isLoad[i] = true;
        }
      } else {
        for (let i = showPage - 3; i <= showPage + 3; i++) {
          isLoad[i] = true;
        }
      };
      this.setData({
        isLoad
      });
    }
  },
  lifetimes: {
    ready() {
      let pageArr = this.data.pageArr;
      let isLoad = this.data.isLoad;
      let showPage = 0;
      let head = `${this.data.urlHead}/${this.properties.issue}/Vol.${this.properties.issue}-page%20(`;
      for (let i = 0; i < this.properties.pageNum; i++) {
        pageArr.push(i + 1);
        isLoad.push(false);
      };

      this.setData({
        isLoad,
        head,
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
            menuOn: !this.data.menuOn
          });
        }
      } else {
        this.setData({
          menuOn: !this.data.menuOn
        });
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
    },
    help(event) {
      this.setData({
        helpShow: true
      });
    },
    onClickHide() {
      this.setData({
        helpShow: false
      });
    },
    changePage(event) {
      this.setData({
        showPage: event.detail.value - 1
      })

    }
  }
})