// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const contact = db.collection('departContact');
  const result = await contact.get().then(res => {
   return res.data;
   }).catch(err => err);
  return result
}