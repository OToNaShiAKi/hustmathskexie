// components/showTest/showTest.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    testType: {
      type: Number,
      value: 0
    },
    department: {
      type: String,
      value: ''
    },
    name: {
      type: String,
      value: ''
    },
    identify: {
      type: String,
      value: 'student'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  pageLifetimes: {

    show: function () {
      var testType, result;
      switch (this.data.testType) {
        case 0:
          testType = 'face';
          break;
        case 1:
          testType = 'pen';
          break;
        case 2:
          testType = "test";
          break;
      }
      wx.cloud.callFunction({
        name: 'selectExams',
        data: {
          department: this.data.department,
          type: testType
        }
      }).then(res => {
        result = res.result.res.data;
        for (let item of result) {
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
          item.expired = this.compareCurrentTime('2020', item.lists.date);
          item.registeredNum = item.registeredNum || 0;
          item.fullPerson = item.registeredNum < item.lists.limit ? false : true;
        }


        //按时间早晚从晚到早往下排
        var x, y, ex;
        for (let i = result.length - 1; i >= 0; i--) {
          x = result[i].lists.date;
          for (let j = result.length - 1; j > i; j--) {
            y = result[j].lists.date;
            if (!this.compareTwoTimes('2020', x, '2020', y)) {
              ex = result[i];
              result[i] = result[j];
              result[j] = ex;
            }
          }
        }
        //转化时间格式为xx月xx日xx:xx
        var z;
        for (let item of result) {
          z=item.lists.date.split('/');
          item.lists.date=z[0]+"月"+z[1]+"日"+z[2];
        }
        this.setData({
          testList: result,
          name: this.data.name
        });
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

    chooseTest: function (event) {
      const {
        name,
        department
      } = this.data;
      wx.cloud.callFunction({
        name: "chooseExam",
        data: {
          _id: event.currentTarget.dataset.id,
          name: name,
          department
        }
      }).then(res => {
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

    compareCurrentTime: function (year, date) {
      const dateList = date.split("/");
      let past = `${year}/${dateList[0].padStart(2,"0")}/${dateList[1].padStart(2, "0")} ${dateList[2].padStart(4, "0")}:00`;
      const datepast = new Date(past);
      let now = new Date();
      return datepast.getTime() >= now.getTime() ? true : false;
    },

    compareTwoTimes: function (year1, date1, year2, date2) {
      const dateList1 = date1.split("/");
      let date1_ = `${year1}/${dateList1[0].padStart(2,"0")}/${dateList1[1].padStart(2, "0")} ${dateList1[2].padStart(4, "0")}:00`;
      const dateList2 = date2.split("/");
      let date2_ = `${year2}/${dateList2[0].padStart(2,"0")}/${dateList2[1].padStart(2, "0")} ${dateList2[2].padStart(4, "0")}:00`;
      const date_1 = new Date(date1_);
      const date_2 = new Date(date2_);
      return date_1.getTime() >= date_2.getTime() ? true : false;
    },

    infoTest(event){
      let date=event.currentTarget.dataset.date;
      date=date.replace('月','/');
      date=date.replace('日','/');

    }
  }
})