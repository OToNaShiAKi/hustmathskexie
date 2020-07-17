const PI = 3.1415926;
const G = 9.79163;
//Map.get(value)
const P_KP=new Map([
  [0.500,0.675],
  [0.683,1.00],
  [0.900,1.65],
  [0.950,1.96],
  [0.955,2.00],
  [0.990,2.58],
  [0.997,3.00]
]);
const DISTRI_C=new Map([
["normality",3],
["triangel",Math.sqrt(6)],
["equality",Math.sqrt(3)],
["arcsin",Math.sqrt(2)],
["2point",1],
["ladder",2]
]);
const TP_N_P95 = new Map([
  [3,4.30],
  [4,3.18],
  [5,2.78],
  [6,2.57],
  [7,2.45],
  [8,2.37],
  [9,2.31],
  [true,1.96]
]);
export {
  PI,
  G,
  P_KP,
  DISTRI_C,
  TP_N_P95
}