// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const recruit = db.collection('recruit');

  const query = {};
  if (event.id) {
    query._id = event.id
  } else if(event.name && event.phone) {
    query.name = event.name
    query.phone = event.phone
  } else throw {
    status: 503,
    message: "请输入正确查询信息"
  }
  
  const result = await recruit.where(query).get().then(res => {
    const lists = res.data
    if(lists.length === 0) throw {
      status: 504,
      message: "您尚未报名"
    }

    const { name, phone, department, status} = lists[0];
    /* let 
    for(let key in department) {

    } */
    return {
      status: 200,
      message: "查询成功",
      data: { name, phone, department, status}
    }
  }).catch(err => ({
    status: err.status || 505,
    message: err.message || "添加报名信息失败"
  }))

  return result
}