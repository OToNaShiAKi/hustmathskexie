// miniprogram/pages/selectStudent/selectStudent.js
import { DepartFormat } from './../../utils/Format'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    depart: { key: '', name: ''},
    interview:{ num:0,list:[] },
    written:{ num:0,list:[] },
    operation:{ num:0,list:[] },
    showIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const depart = this.data.depart
      const key = options.department;
      var result,data,interview,written,operation;
      interview={
        num:0,
        list:[]
      };
      written={
        num:0,
        list:[]
      };
      operation={
        num:0,
        list:[]
      };
      depart.key = key;
      depart.name = DepartFormat(key);

      wx.cloud.callFunction({
        name: 'selectStudent'
      }).then(res=>{
          result=res.result;
          data=result.result.res.data;
          for(let i=0;i<data.length;i++){
            switch(data[i].status){
              case 0:
                interview.num++;
                interview.list.push(data[i]);
              break;
              case 2:
                written.num++;
                written.list.push(data[i]);
              break;
              case 4:
                operation.num++;
                operation.list.push(data[i]);
              break;
            }
          }
        console.log(data,interview.list)
        this.setData({ interview,written,operation });
        })
      this.setData({ depart });
  },

  panel: function (e) {
    console.log(e);
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
  },

  linkto:function(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/infoDetail/infoDetail?id=' + e.currentTarget.dataset.id
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})