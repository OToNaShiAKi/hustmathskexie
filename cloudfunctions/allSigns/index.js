// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const recruit = db.collection('recruit');

  const result = await recruit.get().then(res => {
    const firstWish = []
    const secondWish = []
    for (let register of res.data)
      for (let depart in register.department)
        if (depart === key) {
          if (register.department[depart].wish == '第一志愿')
            firstWish.push(register);
          else if (register.department[depart].wish == '第二志愿')
            secondWish.push(register);
          break;
        }

    wx.showToast({
      title: '查询成功'
    })
    this.setData({
      depart,
      firstWish,
      secondWish
    });
  }).catch(err => {
    wx.showToast({
      title: '查询失败',
      icon: 'none'
    })
  })

  return result;
}