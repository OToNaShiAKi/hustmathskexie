// miniprogram/pages/physical/physical.js
import {
  PI,
  G
} from "./../../../utils/physicsVar"
import {
  LinearFunc,
  GetDataResult
} from "./../../../utils/physicsFunc";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "3.403291667E0;5.515208330E-1\n3.954812500E0;5.188541670E-1\n4.473666667E0;4.466250000E-1\n4.920291667E0;3.859791660E-1\n5.306270833E0;3.373333340E-1\n5.643604167E0;3.001041660E-1\n5.943708333E0;2.583958340E-1\n6.202104167E0;2.320625000E-1\n6.434166667E0;2.078750000E-1\n6.642041667E0;1.875208330E-1\n6.829562500E0;1.701458330E-1\n6.999708333E0;1.530416670E-1\n7.152750000E0;1.392916670E-1\n7.292041667E0;1.260833330E-1\n7.418125000E0;1.128125000E-1",
    type: [{
        value: 'uncertainty',
        name: '不确定度',
        checked: 'true'
      },
      {
        value: 'elasticBall',
        name: '弹性球速度及恢复系数'
      },
      {
        value: 'linearFunc',
        name: '线性拟合函数'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChange: function (event) {
    this.setData({
      value: event.detail.value
    })
  },
  radioChange: function (e) {
    const type = this.data.type
    for (let i = 0, len = type.length; i < len; ++i) {
      type[i].checked = type[i].value === e.detail.value
    }
    this.setData({
      type
    })
  },
  getValue: function (event) {
    const {
      value,
      type
    } = this.data;
    for (let i = 0; i < type.length; i++) {
      if (type[i].checked == true) {
        switch (type[i].value) {
          case 'uncertainty':
            this.getUncertainty(value);
            break;
          case 'elasticBall':
            this.geteOfBall(value)
            break;
          case 'linearFunc':
            LinearFunc([{
              xNum: 0.37229,
              yNum: 0.88504
            }, {
              xNum: 0.32950,
              yNum: 0.74096
            }, {
              xNum: 0.24414,
              yNum: 0.74686
            }, {
              xNum: 0.18234,
              yNum: 0.76381
            }]);
            break;
        }
        return;
      }
    }

  },
  getUncertainty: function (data) {
    data = data.split("\n");
    data = data.map(parseFloat);
    console.log(data);
    const tmp = GetDataResult({measureArr:data},{delta:0.005});
    // const n = data.length;
    // const average = this.count(data) / n;
    // let tmp = 0;
    // for (let i = 0; i < n; i++) {
    //   tmp += (average - data[i]) * (average - data[i]);
    // }
    // tmp /= (n * (n - 1));
    // tmp = Math.pow(tmp, 0.5);
    console.log(tmp);
    
    this.setData({
      answer: tmp
    })
  },
  geteOfBall: function (data) {
    data = data.split("\n");
    const n = data.length;
    let begin, last, tmp = [],
      answer = '',
      exp;
    for (let i = 0; i < n; i++) {
      begin = data[i].indexOf(';');
      last = data[i].lastIndexOf('E');
      exp = parseInt(data[i].substr(last + 2));
      data[i] = parseFloat(data[i].substr(begin + 1, last - begin - 1));
      data[i] /= Math.pow(10, exp);
    }
    for (let i = 0; i < n; i++) {
      tmp.push(0.5 * G * data[i] * data[i] * 0.25);
    }
    for (let i = 0; i < n - 1; i++) {
      answer += "入射速度：" + tmp[i].toString().substr(0, 7) + "恢复系数e：" + (tmp[i + 1] / tmp[i]).toString().substr(0, 7);
    }
    console.log(answer)
    this.setData({
      answer: answer
    })
  },
  count: function (data) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
    }
    return sum;
  }
})