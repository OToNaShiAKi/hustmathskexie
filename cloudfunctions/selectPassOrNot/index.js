// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const recruit = db.collection('recruit');
  const _ = db.command;
  var result;
  // return event;
  if (event.choice == "pass") {
    await recruit.where({
      _id: event.id
    }).get().then(res => {
      res.data[0]['status'][event.name] += 2;
      console.log(res.data[0]['status']);
      result = res.data[0]['status'];
    })
    console.log(result);
    return await recruit.where({
      _id: event.id
    }).update({
      data: {
        status: result
      }
    }).then(res => ({
      res
    }));
  } else if (event.choice == "reject") {
    await recruit.where({
      _id: event.id
    }).get().then(res => {
      res.data[0]['status'][event.name] += 1;
      console.log(res.data[0]['status']);
      result = res.data[0]['status'];
    })
    console.log(result);
    return await recruit.where({
      _id: event.id
    }).update({
      data: {
        status: result
      }
    }).then(res => ({
      res
    }));
  }
}