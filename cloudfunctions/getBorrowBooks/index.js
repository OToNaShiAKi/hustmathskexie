// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const borrow = db.collection('bookroom_borrowing_table');

  let result;

  await borrow.where({
    name: event.name
  }).get().then(res => {
    result = res
  })

  return {
    result
  }
}