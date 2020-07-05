// miniprogram/pages/selectTestTime/selectTestTime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var testType, result;
    switch (options.testType) {
      case '0':
        testType = 'face';
        break;
      case '1':
        testType = 'pen';
        break;
      case '2':
        testType = "test";
        break;
    }
    // console.log(testType);
    wx.cloud.callFunction({
      name: 'selectExams',
      data: {
        department: options.department,
        type: testType
      }
    }).then(res => {
      result = res.result.res.data;
      for (let item of result) {
        console.log(item.lists.date)
        switch (item.type) {
          case 'face':
            item.type = "面试";
            break;
          case 'pen':
            item.type = "笔试";
            break;
          case 'test':
            item.type = "实操";
            break;
        }
        item.expired = this.compareTime('2020', item.lists.date);
        item.registeredNum = item.registeredNum || 0;
        item.fullPerson = item.registeredNum < item.lists.limit ? false : true;
      }
      this.setData({
        testList: result,
        name: options.name
      });
      // console.log(result);
    })
  },

  chooseTest: function (event) {
    console.log(event);
    const {
      name
    } = this.data;
    wx.cloud.callFunction({
      name: "chooseExam",
      data: {
        _id: event.currentTarget.dataset.id,
        name: name
      }
    }).then(res => {
      console.log(res.result.text);
      if (typeof (res.result.text) !== 'undefined') {
        wx.showModal({
          title: '友情提示',
          content: res.result.text,
          showCancel: false,
          confirmText: "退出",
          success(res) {
            if (res.confirm) {
              wx.navigateBack();
            }
          }
        })
      } else {
        wx.navigateBack({
          complete: () => {
            wx.showToast({
              title: '选择成功',
              duration: 2000,
            })
          }
        });
      }
    });
  },

  compareTime: function (year, date) {
    const dateList = date.split("/");
    let past = `${year}/${dateList[0].padStart(2,"0")}/${dateList[1].padStart(2, "0")} ${dateList[2].padStart(4, "0")}:00`;
    console.log(past);
    const datepast = new Date(past);
    let now = new Date();
    return datepast.getTime() >= now.getTime() ? true : false;
  }
})