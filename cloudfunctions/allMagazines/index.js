// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const magazine = db.collection("magazine");

  const result = await magazine.field("title issue cover").get().then(res => {
    const lists = res.data;
    if (lists.length === 0) throw {
      status: 201,
      message: "无杂志数据"
    }

    return {
      status: 200,
      lists:lists.sort((a,b)=>b.issue-a.issue)
    }
  }).catch(err => ({
    status: err.status || 505,
    message: "获取杂志失败"
  }))

  return result;
}