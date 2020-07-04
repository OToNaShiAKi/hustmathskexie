// miniprogram/pages/datetest/datetest.js
Page({
  data: {
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date().getTime()+5184000000,//最多两个月
    currentDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }else if (type === 'day'){
        return `${value}日`;
      }else if(type === 'hour'){
        return `${value}时`;
      }else if(type === 'minute'){
        return `${value}分`;
      }
      return value;
    },
    date: '',
    show: false,
  },

  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    var minute;
    if(date.getMinutes()<10){
      minute ='0' + date.getMinutes();
    }else{
      minute=date.getMinutes();
    }
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getHours()}:${minute}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
    console.log(event.detail);
  },
});