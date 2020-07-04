// miniprogram/pages/addTest/addTest.js
import {
  DepartColor
} from './../../utils/FormatColor';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonColor: "",
    depart: {
      key: '',
      name: ''
    },
    type: "face",
    lists: [{
      limit: 6,
      place: "",
      date: ""
    }],
    tip:'',
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const depart = this.data.depart
    const key = options.department;
    const buttonColor = DepartColor(key);
    depart.key = key;

    if (key === 'editor') depart.name = '编辑部';
    else if (key === 'office') depart.name = '策划部';
    else if (key === 'media') depart.name = '媒体部';
    else if (key === 'onecho') depart.name = 'One Echo';
    else if (key === 'workshop') depart.name = '雁祉作坊';

    this.setData({
      depart,
      buttonColor
    })
  },

  changeForm(event) {
    const key = event.currentTarget.dataset.key;
    const index = event.currentTarget.dataset.index;
    const value = event.detail;
    const lists = this.data.lists;
    lists[index][key] = value;
    this.setData({
      lists
    });
  },

  changeType(event) {
    const key = event.currentTarget.dataset.key;
    const value = event.detail;
    this.setData({
      [key]: value
    });
  },

  addPlace() {
    const lists = this.data.lists;
    lists.push({
      limit: 6,
      place: "",
      date: ""
    })
    this.setData({
      lists
    })
  },

  close(event) {
    const index = event.currentTarget.dataset.index;
    const lists = this.data.lists;
    if (lists.length === 1) {
      wx.showToast({
        title: '至少添加一场测试',
        icon: 'none'
      })
      return;
    }
    lists.splice(index, 1);
    this.setData({
      lists
    })
  },

  submit() {
    const {
      type,
      lists,
      tip
    } = this.data;
    const department = this.data.depart.key;

    console.log(lists);
    for(let item of lists) {
      if(!item.place || !item.date || !item.limit) {
        wx.showToast({
          title: '输入不可为空',
          icon: 'none'
        })
        return;
      }
      wx.cloud.callFunction({
        name:"addExamination",
        data:{
          type,
          lists:item,
          department,
          tip
        }
      }).then(res=>{
        wx.showToast({
          title: '添加成功',
          icon:"success"
        })
        wx.navigateBack();
      })
    }
      

  },

  adminTest() {

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
    const lists=this.data.lists;
    lists[event.currentTarget.dataset.id-1].date=this.formatDate(event.detail);
    this.setData({
      show: false,
      lists
    });
    console.log(event);
  },
})