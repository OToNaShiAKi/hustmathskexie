// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const examination = db.collection('examination');

  result = examination.add({
    data: {
      type:event.type,
      lists:event.lists,
      department:event.department,
      time: db.serverDate(),
      tip:event.tip
    }
  }).then(res => {
    res
  })
  return result;
}