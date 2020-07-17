//物理一些通用函数
import {
  P_KP,
  DISTRI_C,
  TP_N_P95
} from "./physicsVar";

const LinearFunc = (pointSet = {}) => {
  let xMean = 0;
  let yMean = 0;
  let xyMean = 0;
  let x2Mean = 0;
  let y2Mean = 0;
  let n = pointSet.length;
  pointSet.forEach((value, index) => {
    const x = value.xNum;
    const y = value.yNum;
    xMean += x
    yMean += y
    xyMean += x * y;
    x2Mean += x ** 2;
    y2Mean += y ** 2;
  });
  [xMean, yMean, xyMean, x2Mean, y2Mean] = [xMean, yMean, xyMean, x2Mean, y2Mean].map(i => i / n);
  let b = (xyMean - xMean * yMean) / (x2Mean - xMean ** 2);
  let a = yMean - b * xMean;
  let r = (xyMean - xMean * yMean) / (Math.sqrt((x2Mean - xMean ** 2) * (y2Mean - yMean ** 2)));
  console.log(a, b, r);
  return {
    a,
    b,
    r
  };
}
//[{xNum:0.37229,yNum:0.88504},{xNum:0.32950,yNum:0.74096},{xNum:0.24414,yNum:0.74686},{xNum:0.18234,yNum:0.76381}]

const GetDataResult = (optionA = {}, optionB = {}) => {
  const UB = _getUB(optionB);
  const UABox = _getUA(optionA);
  let UA, simgaMeanX, simgaX;
  const newArr = UABox.newArr;
  const mean = GetMean(newArr);
  if (!UB) {
    UB = 0;
  }
  if (!UABox.status) {
    UA = 0;
    simgaX = UABox.simgaX;
    simgaMeanX = UABox.simgaMeanX;
  } else {
    UA = UABox.UA;
    simgaX = UABox.simgaX;
    simgaMeanX = UABox.simgaMeanX;
  };
  const UX = Math.sqrt(UA ** 2 + UB ** 2);
  return {
    newArr,
    mean,
    UX,
    UA,
    UB,
    simgaX,
    simgaMeanX
  };
};

const _getUA = ({
  measureArr = {}
} = []) => {
  
  const simgaXBox = _getSigmaX(measureArr);
  if (simgaXBox.status) {
    const n = simgaXBox.newArr.length;
    console.log(n);
    const simgaMeanX = simgaXBox.simgaX / Math.sqrt(n);
    let UA;
    if (TP_N_P95.has(n)) {
      UA = TP_N_P95.get(n)*simgaMeanX;
    } else {
      UA = "次数无效";
      simgaXBox.status = false;
    }
    simgaXBox.simgaMeanX = simgaMeanX;
    simgaXBox.UA = UA;
  };
  return simgaXBox;

}

const _getSigmaX = (measureArr = []) => {
  const mean = GetMean(measureArr);
  let sum = 0;
  const n = measureArr.length;
  if (n <= 1) {
    return {
      newArr: measureArr,
      status: false
    };
  };
  for (let value of measureArr) {
    sum += ((value - mean) ** 2) / (n - 1)
  }
  let simgaX = Math.sqrt(sum);
  let newArr = measureArr.filter((value) => {
    let absolute = Math.abs(value - mean);
    return absolute <= (3 * simgaX);
  });
  if (newArr.length === n) {
    return {
      newArr,
      simgaX,
      status: true
    }
  } else {
    return _getSigmaX(newArr);
  }
};

const GetMean = (arr = []) => {
  let sum = 0;
  for (let value of arr) {
    sum += value;
  }
  return sum / arr.length;
}

const _getUB = ({
  delta,
  P = 0.950,
  Distri = "equality"
} = {}) => {
  if (DISTRI_C.has(Distri) && P_KP.has(P)) {
    const Kp = P_KP.get(P);
    const C = DISTRI_C.get(Distri);
    const UB = Kp * delta / C;
    return UB;
  } else {
    return false;
  }
};


export {
  LinearFunc,
  GetDataResult
}