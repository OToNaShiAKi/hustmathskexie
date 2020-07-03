// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const recruit = db.collection('recruit');
  const _=db.command;
  var result;
  if(event.choice=="pass"){
    result = await recruit.where({_id:event.id}).update({
      data:{
        status:_.inc(2)
      }
    }).then(res=>({res}));
  }else if(event.choice=="reject"){
    result = await recruit.where({_id:event.id}).update({
      data:{
        status:_.inc(1)
      }
    }).then(res=>({res}));
  }
  
  return {
    result
  }
}