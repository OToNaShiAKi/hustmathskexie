// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const recruit = db.collection('recruit');

  var name,result;
  switch(event.name){
    case "编辑部":
      result = await recruit.where({"department.editor.name":"编辑部"}).get().then(res=>({res}));
      break;
    case "策划部":
      result = await recruit.where({"department.office.name":"策划部"}).get().then(res=>({res}));
      break;
    case "媒体部":
      result = await recruit.where({"department.media.name":"媒体部"}).get().then(res=>({res}));
      break;
    case "One Echo":
      result = await recruit.where({"department.onecho.name":"One Echo"}).get().then(res=>({res}));
      break;
    case "雁祉作坊":
      result = await recruit.where({"department.workshop.name":"雁祉作坊"}).get().then(res=>({res}));
      break;
  }
  return {
    name,
    result
  }
}