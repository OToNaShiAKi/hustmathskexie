// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const contact = db.collection('interestGroup');
  const result = await contact.get().then(res => {
   let group = res.data;
   group.forEach(ele=>{
     const date = new Date(ele.time);
     ele.timeset=date.getTime();
     ele.time = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
   })
   group.sort((a,b)=>{
     return a.timeset-b.timeset;
   })
   return group;
   }).catch(err => err);
  return result
}