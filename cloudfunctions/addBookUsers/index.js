// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const stu_lists = db.collection('bookroom_stu');
  var openId=0;
  result=await stu_lists.where({name:event.name}).get().then(res=>{
    if(res.data.length>0){
      openId=res.data[0].openId;
    }
  })
  if(openId){
    return openId;
  }
  result=await stu_lists.add({
    data:[{
    name:event.name,
    openId:event.id
  }]
})

  return {
    result
  }
}