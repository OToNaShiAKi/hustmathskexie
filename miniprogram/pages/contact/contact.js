// pages/contact/contact.js
import {
  DepartFormat
} from './../../utils/Format';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    departContact: [],
    tabActive: 0,
    showPop:false
  },
  async compareTime(year, date) {
    const dateList = date.split("/");
    let past = `${year}/${dateList[0].padStart(2,"0")}/${dateList[1].padStart(2, "0")} ${dateList[2].padStart(4, "0")}:00`;
    let datepast = new Date(past);
    let now ;
    await wx.cloud.callFunction({
      name:"getTimes"
    }).then(res =>{
      now = new Date(res.result);
    });
    return new Promise((resolve,reject)=>{
     const judge = (datepast.getTime() >= now.getTime()) ? true : false;
     resolve(judge);
    })
  },
  getContacts() {
    wx.showLoading({
      title: '加载中'
    });
    
    wx.cloud.callFunction({
      name: "getContact",
    }).then(res => {
      let departContact = res.result;
      departContact.forEach(ele => {
        const noImgUrl = "https://i0.hdslb.com/bfs/bangumi/image/b94af13bdd10c1c1dd1912328d665333c4324d77.png";
        ele.departCN = DepartFormat(ele.department);
        ele.canDownload = (ele.imgUrl === "none") ? false : true;
        ele.imgUrl = (ele.imgUrl === "none") ? noImgUrl : ele.imgUrl;
      });
      
      this.setData({
        departContact
      });
      wx.showToast({
        title: '加载完成',
        duration:800
      })

    }).catch(err => {
      wx.showToast({
        title: '加载失败，请确认网络后重试',
        icon: 'none',
        duration:800
      })
      console.log(err);
    }).finally(wx.hideLoading);
  },
  /**
   * 事件函数
   */
  onClose() {
    this.setData({ showPop: false });
  },
   outBox(event){
     const canDownload=event.currentTarget.dataset.flag;
     if(!canDownload){return;}
     this.setData({showPop:true});
   },

scan(event){
//TODO
},

download(event){
//TODO
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getContacts();
this.compareTime(2020,"7/8/18:54").then(res=>{
      console.log(res);
      
    });
    // console.log(n);
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.getContacts();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})