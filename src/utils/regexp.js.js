import configs from '../config/index'
/*取整数或者小数点后一位四舍五入*/
export function ToFixedNum(num) {
    if (num) {
        var orzero = num % 1;
        var length = num.toString().length;
        if (orzero === 0) {
            if (length < 5) {
                return num
            } else if (5 <= length && length < 9) {
                return parseInt(num / 1000) / 10 + '万'
            } else {
                return parseInt(num / 10000000) / 10 + '亿'
            }
        } else {
            let newnum = num.toFixed(1)
            let IntNum = newnum.split('.')[0]
            let xiaoshuNum = newnum.split('.')[1]
            if (IntNum.length < 5) {
                return newnum
            } else if (5 <= IntNum.length && IntNum.length < 9) {
                return parseInt(IntNum / 1000) / 10 + xiaoshuNum + '万'
            } else {
                return parseInt(IntNum / 10000000) / 10 + xiaoshuNum + '亿'
            }
        }
    } else {
        return 0
    }
}

/* 获取当前第几周(result+1) 上一周(result) /一年无论是平年还是闰年都是52周 平年有52周余1天 闰年有52周余2天*/
//(可传一个时间,获得一个周数)
export function getWeekOfYear(value) {
    let now = new Date();
    let NowzhouyiDay = now.getDay() 
    now.setDate(now.getDate() - (NowzhouyiDay + 6)); // 获取上周周一 (当天周几-1) + 六天
    let tYear = now.getFullYear()
    let tMonth = now.getMonth() + 1;
    let tDay = now.getDate();
    let Nowzhouyi = new Date(tYear + '/' + (tMonth < 10 ? ('0' + tMonth) : tMonth) + '/' + (tDay < 10 ? ('0' + tDay) : tDay))
    let lastWeekZhouyi = new Date(Nowzhouyi).getTime()
    let lastweekTime = formatDataByTimeStamp(lastWeekZhouyi, 'yyyy-MM-dd')

    let lastWeekYear = lastweekTime.split('-')[0]
    let lastWeekMonth = lastweekTime.split('-')[1]
    let lastWeekDay = lastweekTime.split('-')[2]
    let WhichWeek = getWeekNumber(lastWeekYear, lastWeekMonth, lastWeekDay)

    let result = WhichWeek.split('年第')[1].split('周')[0]
    return result;
};
// 获取某个日期第几周
export function getWeekNumber(y, m, d) {
    let targetDay = new Date(y, m - 1, d);
    let year = targetDay.getFullYear();
    let month = targetDay.getMonth();
    let days = targetDay.getDate();
    // 那一天是那一年中的第多少天
    for (var i = 1; i < m; i++) {
        days += getMonthDays(year, i);
    }
    // 那一年第一天是星期几
    let yearFirstDay = new Date(year, 0, 1).getDay();
    // 计算是第几周
    days += yearFirstDay;
    let week = Math.ceil(days / 7);
    if (week == 53) { //一年无论是平年还是闰年都是52周 平年有52周余1天 闰年有52周余2天
        return year+1 + '年' + '第' + 1 + '周';
    } else {
        return year + '年' + '第' + week + '周';
    }
}

/**
 *判断年份是否为润年
 */
export function isLeapYear(year) {
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}
/**
 *获取某年某月的天数
 */
export function getMonthDays(year, month) {
    return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

/**
 * 数组 分组
 * @param {数组} arr 
 * @param {每组几个} num 
 */
export function chunk(arr, num) {
    num = num * 1 || 1;
    var ret = [];
    arr.forEach(function (item, i) {
        if (i % num === 0) {
            ret.push([]);
        }
        ret[ret.length - 1].push(item);
    });
    return ret;
}

//排序前三名方法
export function filterSort(value) {
    switch (value) {
        case 1:
            value = configs.staticUrl + "/static/images/icon-No.1.svg";
            break;
        case 2:
            value = configs.staticUrl + "/static/images/icon-No.2.svg";
            break;
        case 3:
            value = configs.staticUrl + "/static/images/icon-No.3.svg";
            break;
    }
    return value;
}
//五大平台显示样式
export function filterAppName(appname) {
    let newsrc = ''
    switch (appname) {
        case '快看漫画':
            newsrc = configs.staticUrl + "/static/images/icon-kk@3x.png";
            break;
        case '微博动漫':
            newsrc = configs.staticUrl + "/static/images/icon-wb@3x.png";
            break;
        case '波洞星球':
            newsrc = configs.staticUrl + "/static/images/icon-bdxq@3x.png";
            break;
        case '腾讯动漫':
            newsrc = configs.staticUrl + "/static/images/icon-txdm@3x.png";
            break;
        case '看漫画':
            newsrc = configs.staticUrl + "/static/images/icon-kmh@3x.png";
            break;
    }
    return newsrc
}
//排名上升 下降 不变 图片
export function rankingChange(params) {// 过滤排名变化图标
    let iconimg = '';
    if (params > 0) {
        //上升
        iconimg = configs.staticUrl + "/static/images/icon-rising@3x.png";
    } else if (params < 0) {
        //下降
        iconimg = configs.staticUrl + "/static/images/icon-down@3x.png";
    } else {
        //不变
        iconimg = configs.staticUrl + "/static/images/icon-bubian@3x.png"
    }
    return iconimg;
}

//去除下划线后面的字符
export function filterName(name) {
    let newname = name.split('_')
    return newname[0]
}

//上N周开始时间
export function LastweekTime(n) {
    var now = new Date();
    var year = now.getFullYear();
    //因为月份是从0开始的,所以获取这个月的月份数要加1才行
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var day = now.getDay();
    //判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
    // var newdate = day-(day-1)
    if (day !== 0) {
        n = n + (day - 1);
    } else {
        n = n + day;
    }
    if (day) {
        //这个判断是为了解决跨年的问题
        if (month > 1) {
            month = month;
        }//这个判断是为了解决跨年的问题,月份是从0开始的
        else {
            year = year - 1;
            month = 12;
        }
    }
    // now.setDate(now.getDate() + n);	//下几周
    now.setDate(now.getDate() - n);	//上几周
    year = now.getFullYear();
    month = now.getMonth() + 1;
    date = now.getDate();
    let s = year + "." + (month < 10 ? ('0' + month) : month) + "." + (date < 10 ? ('0' + date) : date);
    // let s = (month < 10 ? ('0' + month) : month) + "." + (date < 10 ? ('0' + date) : date);
    return s;
}
var arr = new Array()
//上N周结束时间(数组总和开始时间和结束时间)
export function WeekStarEndTime() {
    arr = []
    let starttime = new Date('2019/06/10').getTime(); //得到毫秒数
    let nowdata = formatDataByTimeStamp(getWeekStr()[0], 'yyyy/MM/dd')
    let nowzhouyihaomiao = new Date(nowdata).getTime();
    let haomiaochatime = nowzhouyihaomiao - starttime
    let onedayhaomiao =  24 *60 * 60 * 1000
    let whichday = haomiaochatime / onedayhaomiao / 7
    // console.log(whichday) //多少期

    for (var i = 1; i < whichday; i++) {
        let newStarTime = LastweekTime(7 * i)
        let newTime = newStarTime.replace(/\./g, '/')
        let haomiao = new Date(newTime).getTime(); //得到毫秒数
        let biaozhuntime = new Date(haomiao - 24 * 60 * 60 * 1000); //前一天
        let NewDate = new Date(biaozhuntime);
        let year = NewDate.getFullYear();
        let month = NewDate.getMonth() + 1;
        let date = NewDate.getDate();
        let endtime = (month < 10 ? ('0' + month) : month) + "." + (date < 10 ? ('0' + date) : date);
        

        let newWeek = getWeekNumber(LastweekTime(7 * (i + 1)).split('.')[0], LastweekTime(7 * (i + 1)).split('.')[1], LastweekTime(7 * (i + 1)).split('.')[2])
        arr.push( newWeek + ' ' + (LastweekTime(7 * (i + 1))).slice(5) + '至' + endtime)
    }
    arr.unshift(new Date().getFullYear() + '年' + '第' + getWeekOfYear() + '周' + ' ' + LastweekTime(7).slice(5) + '至' + LastweekTime(1).slice(5))
    let newarr = arr.splice(0,arr.length-7)
    return newarr.slice(0, 12)
}

//月份三个月(具体，前几数字可控) 
export function getPrevMonth() {
    let resultarr = [];
    let newarrarr = [];
    let bigarr = []

    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let defaultTime = '2019/06/10'
    let initDate = new Date(defaultTime);

    let whcihyear = year - 2019
    let newmonth = 0
    if (year > 2019) {
        newmonth = 6 + (whcihyear - 1) + month
    } else {
        newmonth = 6
    }
    for (let i = 1; i < newmonth; i++) {
        resultarr.unshift(addMonth(initDate, i)[0]);
        newarrarr.unshift(addMonth(initDate, i)[1]);
    }
    resultarr.push('2019年06月')
    newarrarr.push('2019年06月')

    let newMontharr1 = resultarr.splice(0,resultarr.length-2)
    let newMontharr2 = newarrarr.splice(0,newarrarr.length-2)
    bigarr.push(newMontharr1.slice(0, 3))
    bigarr.push(newMontharr2.slice(0, 3))
    return bigarr;
}
//追加月份
export function addMonth(date, months) {
    let d = new Date(date);
    let yuefeng = d.getMonth() + months
    d.setMonth(d.getMonth() + months);//设置几月份，月份从零开始 0->一月份
    let month = ''
    if (yuefeng == 1) {
        month = d.getMonth()
    } else {
        month = d.getMonth() + 1;// getMonth 返回的月份要比实际月份少一个月 ，从0开始的，所以要加一
    }
    let day = d.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    let val = d.getFullYear() + "年" + month + "月";
    let val2 = d.getFullYear() + "年" + month + "月";
    let timearr = []
    timearr.push(val)
    timearr.push(val2)
    return timearr;
}

//周一到周日
export function getWeekStr() {
    var now = new Date();
    var nowTime = now.getTime();
    var day = now.getDay();
    var oneDayTime = 24 * 60 * 60 * 1000;

    //显示周一
    var MondayTime = nowTime - (day - 1) * oneDayTime;
    //显示周日

    var SundayTime = nowTime + (7 - day) * oneDayTime;
    // //初始化日期时间
    // var monday = new Date(MondayTime);
    // var sunday = new Date(SundayTime);
    let startendtime = []
    startendtime.push(MondayTime)
    startendtime.push(SundayTime)
    return startendtime
}

// 把时间戳转成本地时间格式
Date.prototype.toLocaleString = function () {
    return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + "/ " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
};
// 把时间 格式化
Date.prototype.format = function (fmt) {
    const o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      return fmt;
    // var o = {
    //     "M+": this.getMonth() + 1, //月份 
    //     "d+": this.getDate(), //日 
    //     "h+": this.getHours(), //小时 
    //     "m+": this.getMinutes(), //分 
    //     "s+": this.getSeconds(), //秒 
    //     "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    //     "S": this.getMilliseconds() //毫秒 
    // };
    // if (/(y+)/.test(fmt)) {
    //     fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    // }
    // for (var k in o) {
    //     if (new RegExp("(" + k + ")").test(fmt)) {
    //         fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    //     }
    // }
    // return fmt;
};

/*把毫秒时间戳转换成 指定格式  @param {*} timestamp  @param {*} format  */
export function formatDataByTimeStamp(timestamp, format) {
    let changetime 
    if(timestamp){
        let oDate = new Date(timestamp*1),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth()+1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime = oYear +'/'+ getBz(oMonth) +'/'+ getBz(oDay) +' '+ getBz(oHour) +':'+ getBz(oMin) +':'+getBz(oSen);//拼接时间
            changetime = oTime
    }else{
        changetime = ''
    }
    // let time =  new Date(changetime).toLocaleString();
    var curTime = new Date(changetime).format(format);
    return curTime;
}
//补0
function getBz(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}
// 判断是否为PC端
export function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
