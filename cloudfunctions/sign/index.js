// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const recruit = db.collection('recruit');
  if ((event.status.length == 0)) {
    if (typeof (event.department.workshop) != 'undefined') {
      event.status["雁祉作坊"] = 0;
    }
    if (typeof (event.department.onecho) != 'undefined') {
      event.status["One Echo"] = 0;
    }
    if (typeof (event.department.office) != 'undefined') {
      event.status["策划部"] = 0;
    }
    if (typeof (event.department.editor) != 'undefined') {
      event.status["编辑部"] = 0;
    }
    if (typeof (event.department.media) != 'undefined') {
      event.status["媒体部"] = 0;
    }
  }
  const result = await recruit.where({
    phone: event.phone
  }).get().then(res => {
    const lists = res.data

    if (lists.length > 0) throw {
      status: 501,
      message: '该手机号已注册'
    }

    const data = event;
    delete data.userInfo;
    data.time = db.serverDate();

    return recruit.add({
      data
    });
  }).then(res => ({
    status: 200,
    message: '报名成功',
    id: res._id
  })).catch(err => ({
    status: err.status || 502,
    message: err.message || "添加报名信息失败"
  }));

  return result
}