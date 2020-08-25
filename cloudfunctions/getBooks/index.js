// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const book_lists = db.collection("bookroom_book");
  const _ = db.command;

  let result;

  event.index = event.index > 0 ? event.index : 1000;
  event.limit = isNaN(event.limit) ? 100 : event.limit;
  
  await book_lists.where({
    name: db.RegExp({
      regexp: event.name,
      options: 'i',
    }),
    index: _.lt(event.index)
  }).orderBy('index', 'desc').limit(event.limit).get().then(res => {
    result = res;
  })

  return result;
}