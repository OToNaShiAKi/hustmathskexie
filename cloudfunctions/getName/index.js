// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const stu = db.collection('bookroom_stu');

  let result;
  await stu.where({
    name: event.name
  }).get().then(res => {
    result = typeof (res.data[0].realName) === "undefined" ? 0 : res.data[0].realName;
  });
  return result;
}