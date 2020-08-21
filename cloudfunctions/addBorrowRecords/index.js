// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const borrow = db.collection("bookroom_borrowing_table");
  const book_list = db.collection("bookroom_book");
  const _ = db.command;
  let result;

  for (item of event.userlists) {
    let bookname;
    await book_list.where({
      index: parseInt(item.bookname)
    }).get().then(res => {
      console.log(res)
      bookname = res.data[0].name;
    })
    result = await borrow.add({
      data: {
        name: item.name,
        bookname: bookname,
        num: item.totalNum,
        date: new Date(),
        status: 1
      }
    }).then(res => {});
    await book_list.where({
      index: parseInt(item.bookname)
    }).update({
      data: {
        borrowNum: _.inc(parseInt(item.totalNum))
      }
    })
  }

  return {
    msg: "添加记录完毕"
  };
}