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
  console.log(event)
  await borrow.where({
    _id:event._id,
    name: event.name,
    bookname: event.bookname,
  }).update({
    data: {
      status: _.inc(1),
      returnDate:new Date(),
    }
  });

  console.log(-event.num)
  await book_list.where({
    name: event.bookname
  }).update({
    data: {
      borrowNum: _.inc(-event.num)
    }
  }).then(res => {
    console.log(res)
  })

  return 0;
}