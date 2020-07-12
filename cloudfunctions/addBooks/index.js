// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const book_lists = db.collection('bookroom_book');
  const _ = db.command;
  var duplicate = false;
  for (item of event.booklists) {
    result = await book_lists.add({
      data: {
        name: item.name,
        totalNum: item.totalNum,
        borrowNum: 0,
        status: 1
      }
    }).then(res => {
      duplicate = false;
    }).catch(() => {
      //存在同名的书，即相同的书，则在totalNum上加上新增的totalNum
      duplicate = true;
    });
    if (duplicate) {
      result = await book_lists.where({
        name: item.name
      }).update({
        data: {
          totalNum: _.inc(item.totalNum)
        }
      })
    }
  }

  return {msg:"添加完毕"}
}