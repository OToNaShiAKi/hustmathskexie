// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const examination = db.collection('examination');

  result=await examination.where({department:event.department,type:event.type}).get().then(res=>({res}));

  return result;
}