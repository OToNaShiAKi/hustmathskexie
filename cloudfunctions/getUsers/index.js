// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const borrow = db.collection('bookroom_borrowing_table');

  let result;
  await borrow.where({
    name: db.RegExp({
      regexp: event.name,
      options: 'i',
    }),
    status:1
  }).get().then(res => {
    result = res;
  });

  return {
    result
  }
}