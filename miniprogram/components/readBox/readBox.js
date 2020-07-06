// components/readBox/readBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageNum: {
      type: Number,
      value: 30
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pageArr: [],
    showPage:1
  },

  lifetimes: {
    attached() {
      let pageArr = this.data.pageArr;
      for (let i = 0; i < this.properties.pageNum; i++) {
        pageArr.push(i + 1);
      }
      console.log(pageArr);
      
      this.setData({
        pageArr
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})