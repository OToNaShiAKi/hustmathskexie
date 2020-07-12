// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const examination = db.collection('examination');

  result =await examination.where({_id:event._id}).remove().then(res=>({res}))
  
  return result;
}