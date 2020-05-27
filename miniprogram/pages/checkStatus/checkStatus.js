// miniprogram/pages/checkStatus/checkStatus.js
const db = wx.cloud.database();
const recruit = db.collection("recruit")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    uid: 'U',
    department: {}
  },

  onLoad(options) {
    if (options.id)
      recruit.doc(options.id).get().then(res => {
        console.log(res);
        const { name, uid, department } = res.data;
        /* for(let key in department) {
        } */
        this.setData({ 
          name,
          uid,
          department
        })
      }).catch(err => {
        console.log(err)
        wx.showToast({
          title: '查询失败，请确认网络',
          icon: 'none'
        })
      })
  },

  checkStatus(event) {

  }

})