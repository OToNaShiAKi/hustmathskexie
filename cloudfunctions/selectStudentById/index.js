// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const recruit = db.collection('recruit');

  const result = await recruit.where({_id:event.id}).get().then(res=>({res}));
  return {
    result
  }
}