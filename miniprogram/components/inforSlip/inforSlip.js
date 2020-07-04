// components/inforSlip/inforSlip.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:"标题"
    },
    content:{
      type:String|Number,
      value:"内容"
    },
    oneText:{
      type:Boolean,
      value:false
    },
    oneContent:{
      type:String|Number,
      value:"我不可复制"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
