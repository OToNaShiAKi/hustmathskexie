// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const examination = db.collection('examination');
  const _=db.command;
  // return event;
  result=await examination.where({registeredPerson:event.name}).get().then(res=>({res}));
  if(result.res.data.length>0){
    return {text:"你已选择过场次,为保护珍贵的程序猿头发，想修改请直接联系各部门部长"};
  }
  result=await examination.where({_id:event._id}).update({
    data:{
      registeredNum:_.inc(1),
      registeredPerson:_.push(event.name)
    }
  }).then(res=>({res}));

  return result;
}