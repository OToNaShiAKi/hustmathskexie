// miniprogram/pages/test.js
Page({
  data: {
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2020, 10, 1).getTime(),
    currentDate:new Date().getTime()
  },

  onInput(event) {
    console.log(1)
    this.setData({
      // currentDate: event.detail,
    });
  },
});