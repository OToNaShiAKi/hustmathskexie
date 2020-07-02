// components/confirm/confirm.js
import md5 from './../../miniprogram_npm/blueimp-md5/index.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialog: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    confirm: '',
    department: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    authentication(event) {
      const password = md5(this.data.confirm);
      const department = this.data.department;

      if (!department) {
        wx.showToast({
          title: '未选择部门',
          icon: 'none'
        })
        return false
      }
      // false:81dc9bdb52d04dc20036dbd8313ed055    PW:1234
      //true: 065b01521cf7f90f97d83235ed086dea
      // if (password === '065b01521cf7f90f97d83235ed086dea')
      if (password === '81dc9bdb52d04dc20036dbd8313ed055')
        wx.navigateTo({
          url: '/pages/manage/manage?department=' + department
        })

      else {
        this.setData({ confirm: '' })
        wx.showToast({
          title: '认证密码错误',
          icon: 'none'
        })
      }
    },

    changeData(event) {
      const key = event.currentTarget.dataset.key;
      this.setData({ [key]: event.detail });
    }
  }
})
