import {
  DepartColor
} from "../../utils/FormatColor";

// miniprogram/pages/adminTest/adminTest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonColor: '#0060c7',
    department:'onecho',
    navData: [{
      text: '面试'
    }, {
      text: '笔试'
    }, {
      text: '实操'
    }, ],
    currentTab: 0,
    navScrollLeft: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const department = options.department;
    const buttonColor = DepartColor(department);
    console.log(options,buttonColor);
    this.setData({
      department: options.department,
      name: options.name,
      buttonColor
    });
  },

  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5    
    var singleNavWidth = this.data.windowWidth / 5; //tab选项居中      
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },

  switchTab(event) {
    console.log(event);
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },

})