// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const book_lists = db.collection("bookroom_book");

  var result;
  if (event.name != null) {
    await book_lists.where({
      name: db.RegExp({
        regexp: event.name,
        options: 'i',
      })
    }).get().then(res => {
      result = res;
    })
  } else {
    await book_lists.get().then(res => {
      result = res;
    })
  }

  return result;
}