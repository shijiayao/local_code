/*
 * <select name="year1"></select>
 * <select name="month1"></select>
 * <select name="day1"></select>
 * <script>
 * new YMDselect('year1','month1','day1',1990,2,10);
 * </script>
 * 年月联动
 *   new YMDselect('year1','month1');
 *   new YMDselect('year1','month1',1990);
 *   new YMDselect('year1','month1',1990,2);
 * 年月日联动
 *   new YMDselect('year1','month1','day1');
 *   new YMDselect('year1','month1','day1',1990);
 *   new YMDselect('year1','month1','day1',1990,2);
 *   new YMDselect('year1','month1','day1',1990,2,10);
 */
let SYT = '-请选择年份-';
let SMT = '-请选择月份-';
let SDT = '-请选择日期-';
let BYN = 100; //年份范围往前100年
let AYN = 100; //年份范围往后0年
function YMDselect() {
  this.SelY = document.getElementsByName(arguments[0])[0];
  this.SelM = document.getElementsByName(arguments[1])[0];
  this.SelD = document.getElementsByName(arguments[2])[0];
  this.DefY = this.SelD ? arguments[3] : arguments[2];
  this.DefM = this.SelD ? arguments[4] : arguments[3];
  this.DefD = this.SelD ? arguments[5] : arguments[4];
  this.SelY.YMD = this;
  this.SelM.YMD = this;
  this.SelY.onchange = function () {
    YMDselect.SetM(this.YMD);
  };
  if (this.SelD)
    this.SelM.onchange = function () {
      YMDselect.SetD(this.YMD);
    };
  YMDselect.SetY(this);
}
//设置年份
YMDselect.SetY = function (YMD) {
  let dDate = new Date();
  let dCurYear = dDate.getFullYear();
  YMD.SelY.options.add(new Option(SYT, '0'));
  for (let i = dCurYear + AYN; i > dCurYear - BYN; i--) {
    let YMDYT = i + '年';
    let YMDYV = i;
    let OptY = new Option(YMDYT, YMDYV);
    YMD.SelY.options.add(OptY);
    if (YMD.DefY == YMDYV) OptY.selected = true;
  }
  YMDselect.SetM(YMD);
};
//设置月份
YMDselect.SetM = function (YMD) {
  YMD.SelM.length = 0;
  YMD.SelM.options.add(new Option(SMT, '0'));
  if (YMD.SelY.value > 0) {
    for (let i = 1; i <= 12; i++) {
      let YMDMT = i + '月';
      let YMDMV = i;
      let OptM = new Option(YMDMT, YMDMV);
      YMD.SelM.options.add(OptM);
      if (YMD.DefM == YMDMV) OptM.selected = true;
    }
  }
  if (YMD.SelD) YMDselect.SetD(YMD);
};
//设置日期
YMDselect.SetD = function (YMD) {
  let YI = YMD.SelY.value;
  let MI = YMD.SelM.value;
  YMD.SelD.length = 0;
  YMD.SelD.options.add(new Option(SDT, '0'));
  if (YI > 0 && MI > 0) {
    let dPrevDate = new Date(YI, MI, 0);
    let daysInMonth = dPrevDate.getDate();
    for (let d = 1; d <= parseInt(daysInMonth); d++) {
      let YMDDT = d + '日';
      let YMDDV = d;
      let OptD = new Option(YMDDT, YMDDV);
      YMD.SelD.options.add(OptD);
      if (YMD.DefD == YMDDV) OptD.selected = true;
    }
  }
};
