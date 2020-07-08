// miniprogram/pages/checkBooks/adminCheckBooks.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    booklists:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      height: wx.getSystemInfoSync().windowHeight
    })
    wx.cloud.callFunction({
      name:"getBooks"
    }).then(res=>{
      console.log(res);
      this.setData({
        booklists:res.result.data
      })
    })
  },

  onSearch: function (event) {
    const {
      value
    } = this.data;
    // console.log(this.data);
    var reg_value=".*";
    for(let i=0;i<value.length;i++){
      reg_value+=value[i]+".*";
    }
    console.log(reg_value)
    wx.cloud.callFunction({
      name:"getBooks",
      data:{
        name:reg_value
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        booklists:res.result.data
      })
    })
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    });
    if(e.detail==''){
      wx.cloud.callFunction({
        name:"getBooks"
      }).then(res=>{
        this.setData({
          booklists:res.result.data
        })
      })
    }
  },

  addBook:function(){
    wx.navigateTo({
      url: '/pages/addSomething/addBooks',
    })
  },

})