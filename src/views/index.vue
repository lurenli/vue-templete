<template>
    <div class="index">

        <!-- <div v-bind:class="{active:isActive,'text-danger':hasError}"></div> -->

        <!-- <div v-bind:class="[isActive ? activeClass:'',errorClass]"></div> -->
        <h2 @click="ToList()">去列表 快点来</h2>
        <ul>
            <li v-for="(item, index) in indexList" :key="index" class="item">
                <p>{{item.userName?item.userName:item.companyName}}</p>
                <p>{{item.departmentName}}</p>
                <p>{{item.jobNum?item.jobNum:''}}</p>
            </li>
        </ul>
        <h4>{{ValueTime}}</h4>

        <h3>距离倒计时还有{{Endtime}}</h3>

        <div class="box" ref="box" :style="{left:Left +'px'}" />

        <div v-show="btngrounpShow" @click="goTop" class="to_top"></div>
        <div class="telbox" @click="messageFunction()" ref="telbox">
            客
            服
        </div>
        <transition name="mybox">
            <div class="rightbox" ref="rightbox" v-show="boxshow">DIVQQ</div>
        </transition>

        <input placeholder="请输入纯数字" v-number-only class="num_input" v-model="text" />
        {{arrstr}}
        <Main />
    </div>
</template>
<script>
import qs from 'querystring';
import { getWeekNumber } from '@/utils/publicMed'
const Main = resolve => require(['./main'], resolve)
export default {
    components: { Main },
    data() {
        return {
            indexList: [],
            arr: [
                { name: '我', id: 12 },
                { name: '你', id: 34 },
                { name: '我', id: 12 },
                { name: '她', id: 56 },
            ],
            loginForm: {
                userName: 'admin',
                password: '123456',
                validCode: 'xb3p',
                grant_type: 'password',
                scope: 'app',
                client_id: 'webApp',
                client_secret: 'webApp',
                deviceId: 'F5C502760B0471FBDC6AC90CE8E29260',
            },
            ValueTime: '',
            Left: 20,
            boxshow: false,
            right: 0,
            Endtime: '',
            btngrounpShow: false,
            text: 12,
            arrstr: [1, 2, 3, 4, 5]
        }
    },
    created() {

        // new操作符具体干了什么呢?其实很简单，就干了三件事情。
        // (创建一个空对象，并使该空对象继承Func.prototype，执行构造函数，并将this指向刚刚创建的新对象,返回新对象)
        //   var obj  = {}; obj.__proto__ = Base.prototype; Base.call(obj);  

        // 第一行，我们创建了一个空对象obj
        // 第二行，我们将这个空对象的__proto__成员指向了Base函数对象prototype成员对象 
        // 第三行，我们将Base函数对象的this指针替换成obj，然后再调用Base函数，于是我们就给obj对象赋值了一个id成员变量，这个成员变量的值是”base”

        //  判断是否是数组 
        let arrobj = [1, 2, 3]
        console.log(Array.isArray(arrobj)) //如果是数组 是 true
        // arr.constructor  == Array
        // qs.stringify()将对象 序列化成URL的形式，以&进行拼接
        // 例如 // get拼接可快速
        let urla = { name: 'hehe', age: 10 };
        let newurla = qs.stringify(urla)

        console.log(newurla)
        // 'name=hehe&age=10'
        JSON.stringify(urla)
        // '{"name":"hehe","age":10}'

        // 10-30+50-70。。。1010 
        let Numarr = []
        let sum = 0
        for (let i = 10; i < 1011; i += 10) {
            if (i % 4 != 0) {
                Numarr[i] = i
            }
            Numarr.map((item, index) => {
                if (index % 2 == 0) {
                    sum -= item
                } else {
                    sum += item
                }
            })
        }
        console.log(sum)
        // let time = '2019/02/02'
        // let time = '2019-02-02'
        let time = '2019.02.02'
        let haomaio = new Date(time)
        console.log(haomaio.getTime())
        // console.log('========')
        // console.log(new Date(1549036800000))
        // split() 分割  把一个字符串分割成字符串数组
        // slice() //已有的数组中返回选定的元素
        // splice() //向/从数组中添加/删除项目，然后返回被删除的项目。
        // push() //数组末尾增加
        // pop() //数组末尾删除
        // unshift()//数组头部增加
        // shift()//数组头部删除
        // join('')//数组转为字符串
        // parseInt()//转为数组
        // isNaN() 查其参数是否是非数字值。是数字返回false否则true
        // JSON.parse(JSON.stringify()) // 利用JSON.stringify 将js对象序列化（JSON字符串），再使用JSON.parse来反序列化(还原)js对象
        // indexOf() //返回数组中某个指定元素的位置 （下标）。 不存在返回 -1
        // substring() //用于提取字符串中介于两个指定下标之间的字符。(不接受负的参数)
        // concat() //连接数组
        // sort() //数组排序
        // replace() //用于把一些字符替换另一些字符，或替换一个正则表达式匹配的子串 
        // replace(searchValue, replaceValue)
        //  replace方法对string进行查找和替换，并返回一个新字符串
        // 参数searchValue有两种形式：1、字符串 2、正则表达式
        // 参数replaceValue也有两种形式：1、字符串 2、函数
        // toUpperCase(字符串);   把字符串转换为大写。
        // toLowerCase() 作把字符串转换成小写。
        //findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。(每个元素都会走一次)
        //trim(); //干掉字符串两端的空格
        // reverse //反转数组
        let name = 'aaa bbb ccc'; //字符串中所有单词的首字母都转换为大写
        let uw = name.replace(/\b\w+\b/g, function (word) {
            return word.substring(0, 1).toUpperCase() + word.substring(1);        }
        );
        // 若 a 小于 b，即 a - b 小于零，则返回一个小于零的值，数组将按照升序排列。 //内部是依据冒泡排序进行的
        // 若 a 等于 b，则返回 0。
        // 若 a 大于 b, 即 a - b 大于零，则返回一个大于零的值，数组将按照降序排列。

        let arr = new Array(6)
        function sortNumber(a, b) {
            return a - b
        }

        arr[0] = "10"
        arr[1] = "5"
        arr[2] = "40"
        arr[3] = "25"
        arr[4] = "1000"
        arr[5] = "1"
        arr.sort(sortNumber)

        let BubbleSortArr = [10, 8, 5, 6, 9, 4, 3, 2, 1, 7];
        this.BubbleSort(BubbleSortArr)

        this.SetData()
        this.Time()

        if (!this.Cookies.get('access-token')) {
            this.GetToken()
        } else {
            this.Cookies.set('access-token', this.Cookies.get('access-token'))
        }



        //  替换位置
        let findValue = 4

        let fitstValue = this.arrstr[0]
        let Findex = this.arrstr.findIndex(item => item == findValue)
        this.arrstr[0] = findValue
        this.arrstr[Findex] = fitstValue

    },
    watch: {
        name(newVal, oldVal) {

        },
        'obj.name': {
            handler(newV, oldV) {
                console.log('watch中：', newV)
            },
            deep: true,
        },
        userArr: {
            handler(newVal, oldValue) {

            },
            // immediate: true, //是否刚进来就监听
            deep: true
        },
        text(newVal, oldVal) {
            console.log(newVal)
        },
    },
    mounted() {
        // require("@/../public/img/home/user.jpg ")
        this.sport()
        this.EndTimeFunction()

        window.addEventListener('scroll', this.handleScroll)
        window.addEventListener('resize', this.handleResize)


        let newTime = this.AddMouth('2019-02-29', 1)
        console.log(newTime)
    },
    //销毁
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        // 去重
        KillRepeat(val) {
            // 传进来的值 和数组里面的比较 //历史记录的使用
            if (localStorage.getItem('search')) {
                let arr = decodeURIComponent(localStorage.getItem("search")).split(",");
                this.historyArr = arr;
            } else {
                let noarr = [];
                this.historyArr = noarr;
            }
            for (var i = 0; i < this.historyArr.length; i++) {
                if (val === this.historyArr[i]) {
                    this.historyArr.splice(i, 1);
                }
            }
            for (var i = 0; i < this.historyArr.length; i++) {
                if (val === this.historyArr[i]) {
                    this.historyArr.splice(i, 1);
                }
            }
            //默认显示5条数据
            if (this.historyArr.length < 5) {
                this.historyArr.unshift(val);
            } else {
                //删除数组的最后一个元素
                this.historyArr.pop();
                //在数组首位添加元素
                this.historyArr.unshift(val);
            }
        },
        //返回顶部
        goTop() {
            let self = this;
            self.timer = setInterval(function () {
                //滚动定时器
                let bodyScroll =
                    document.documentElement.scrollTop ||
                    window.pageYOffset ||
                    document.body.scrollTop;
                /*用于设置速度差，产生缓动的效果
                    (如果Math.floor向下取整，需要转化为负数，滚动高度设置需要加上负值的速度差)
                    否则当快到顶部时，速度差向下取整等于0，滚动高度一直减去0，无法到达顶部，陷入死循环*/
                let speed = Math.ceil(bodyScroll / 10);
                document.documentElement.scrollTop = document.body.scrollTop =
                    bodyScroll - speed; //设置滚动高度
                /*速度差使用向下取整时，应该这样写：
                    var speed = Math.ceil(bodyScroll/10);
                    document.documentElement.scrollTop = document.body.scrollTop = bodyScroll - speed;//设置滚动高度
                    */
                self.isTop = true; //用于阻止滚动事件清除定时器
                if (bodyScroll == 0) {
                    //到顶停止定时器
                    clearInterval(self.timer);
                }
            }, 30);
        },
        //监听滚动
        handleScroll() {
            this.sharegrounp = false;
            let self = this;
            let scrollTop =
                document.documentElement.scrollTop ||
                window.pageYOffset ||
                document.body.scrollTop;
            if (scrollTop >= 1000) {
                //如果滚动高度大于300，显示按钮
                this.btngrounpShow = true;
            } else {
                //否则隐藏
                this.btngrounpShow = false;
            }
            //判断当点击回到顶部按钮后，滚动条在回滚过程中，若手动滚动滚动条，则清除定时器
            if (!this.isTop) {
                clearInterval(self.timer);
            }
            this.isTop = false;
        },
        EndTimeFunction() {
            let self = this
            setInterval(function () {
                let EndbirthTime = '2020/12/03'
                let dt = new Date();
                let ChaHaomiao = new Date(EndbirthTime).getTime() - dt.getTime()
                let Day = Math.floor(ChaHaomiao / 1000 / 60 / 60 / 24);//日
                let daysmod = ChaHaomiao - Day * 24 * 60 * 60 * 1000
                let Hour = Math.floor(daysmod / 1000 / 60 / 60 / 24);//小时
                let hoursmod = ChaHaomiao - (Day * 24 * 60 * 60 * 1000) - (Hour * 1000 * 60 * 60)
                let Minutes = Math.floor(hoursmod / 1000 / 60);//分钟
                let minutesmod = ChaHaomiao - (Day * 24 * 60 * 60 * 1000) - (Hour * 1000 * 60 * 60) - (Minutes * 1000 * 60)
                let Seconds = Math.floor(minutesmod / 1000) // 到这里结束，是将总毫秒转化成对应天数+小时数+分钟数+秒数的
                self.Endtime = Day + '天/' + Hour + '小时/' + Minutes + '分钟/' + Seconds + '秒'
            }, 1000)
        },
        // requestAnimationFrame是HTML5新增的定时器,不需要设置时间间隔
        sport() {
            let self = this
            this.Left += 10
            if (this.Left < 1200) {
                // window.requestAnimationFrame(self.sport)
            }
            console.log(this.Left)
        },
        // 时间常用方法
        Time() {
            // 举例
            setInterval(this.NextTime, 1000)
        },
        NextTime() {
            let dt = new Date();
            let Tyear = dt.getFullYear();//年
            let Month = dt.getMonth() + 1;//月---从0开始
            let Day = dt.getDate();//日
            let Hour = dt.getHours();//小时
            let Minutes = dt.getMinutes();//分钟
            let Second = dt.getSeconds();//秒
            dt.getDay();//星期---从0开始
            dt.toDateString();//日期
            dt.toLocaleDateString();//日期
            dt.toTimeString();//时间
            dt.toLocaleTimeString();//时间
            //     dt.valueOf();//毫秒
            dt.getTime();//毫秒

            dt.setDate(dt.getDate() - (dt.getDay() + 6)); // 获取上周周一 (当天周几-1) + 六天(数字可控)
            dt.setMonth(dt.getMonth() - 1); //前一月(数字可控)
            this.ValueTime = Tyear + '/' + this.FilterValue(Month) + '/' + this.FilterValue(Day) + ' ' + this.FilterValue(Hour) + ':' + this.FilterValue(Minutes) + ':' + this.FilterValue(Second)
        },
        AddMouth(date, num) {
            //date为格式化后的日期字符yyyy-MM-dd,num为增加的月份
            var monthnum = parseInt(num);
            var year = parseInt(date.substring(0, 4));
            var month = parseInt(date.substring(5, 7));
            var day = parseInt(date.substring(8, 10));
            if (month + monthnum > 12) {
                var newyear = year + 1;
                var newmonth = month + monthnum - 12;
                var newday = day;
            } else {
                var newyear = year
                var newmonth = month + monthnum;
                var newday = day;
            }
            var newdate = newyear + "-" + this.FilterValue(newmonth) + "-" + this.FilterValue(newday);
            return newdate;
        },
        FilterValue(value) {
            if (value < 10) {
                return '0' + value
            } else {
                return value
            }
        },
        // 冒泡排序
        BubbleSort(arr) {
            let i, j, temp;
            let flag = true;     //flag进行标记
            for (i = 0; i < arr.length - 1 && flag; i++) {  //若flag为false则退出循环
                flag = false;    //初始化为false
                for (j = arr.length - 1; j > i; j--) {
                    if (arr[j] < arr[j - 1]) { //j为从前往后循环
                        temp = arr[j - 1];
                        arr[j - 1] = arr[j];
                        arr[j] = temp;
                        flag = true; //如果有数据交换则为true
                    }
                }
            }
        },
        // 构造函数  new  以 new 关键字调用时，会创建一个新的内存空间，标记为 （函数名称） 的实例
        // new 关键字的作用，就是执行构造函数，返回一个实例对象。
        NewFunction(name, age, sex) {
            console.log(this) // this 指向该内存 就是（函数名称） 的实例 默认返回 this  添加一个复杂数据类型(对象)的返回值，最终返回该对象
            this.name = name
            this.age = age
            this.sex = sex
        },
        SetData() {
            let data = new this.NewFunction('小明', "12", '男')
            console.log(data)
        },
        GetToken() {
            this.$store.dispatch('user/login', this.loginForm)
        },
        async GetList() {
            let { datas } = await this.API.user.GetIndexList()
            this.indexList = datas.list
        },
        ToList() {
            this.$router.push({
                path: '/list'
            })
        },
        messageFunction() {
            this.boxshow = !this.boxshow
            this.$refs.telbox.style.right = (this.boxshow ? 100 : 0) + 'px'

            // Math.rand() : 四舍五入
            // Math.random() : 随机函数产生 0~1
            // Math.max() : 返回最大 ，多个参数 Math.max(20,10,21,22);
            // Math.min() : 返回最小
            // Math.abs() : 返回 绝对值
            // Math.ceil() : 向上取整
            // Math.floor() : 向下取整
            // Math.pow() : x 的 y 次方 Math.pow(x,y)
            // Math.sqrt() : 开平方
            // Math.sin/cos/tan() : 正弦/余弦/正切 Math.sin(2*Math.PI)
        },
        //显示列按钮 //多选个标签按钮的时候
        SelectItem(event, value, index) {
            let classList = event.target.classList;
            if (!classList.contains("el-button--info")) {
                if (this.selectButtonList.length < 10) {
                    classList.remove("el-button--primary");
                    //添加选中样式和数组对象
                    classList.add("el-button--info");
                    this.selectButtonList.push({
                        show: true,
                        name: value.name
                    });
                    value.show == true ? value.show = false : value.show = true
                } else {
                    this.$message({
                        type: 'error',
                        message: '最多添加10个标签,请删除后重试'
                    })
                }
            } else {
                classList.remove("el-button--info");
                classList.add("el-button--primary");
                value.show == true ? value.show = false : value.show = true
                this.TrimData = []
                this.selectButtonList.map((item, index) => {
                    if (item.name == value.name) {
                        this.selectButtonList.splice(index, 1)
                        this.TrimData.push({ name: value.name, show: false })
                    }
                })
            }
        },
        //点击分享 到微博 qq qq空间
        call(num) {
            var articlecontent = $('.article2').text().substr(0, 70) //获取一段内容
            var param = {
                url: href2,//国漫动向文章连接
                count: '1', /*是否显示分享数，1显示(可选)*/
                appkey: socrce, //文章来源 可选
                title: articletitle, //文章标题
                // pics:imgdomain + articleimg, //分享图片的路径(可选)
                summary: articlecontent,
                rnd: new Date().valueOf() //点击分享目前的时间
            }
            //微博
            if (num == 'wb') {
                param.pic = imgdomain + articleimg
            } else {
                //qq qq空间
                param.pics = imgdomain + articleimg
            }
            var temp = [];
            for (var p in param) {
                temp.push(p + '=' + encodeURIComponent(param[p] || ''))
            }
            // window.open 弹出新窗口的命令； 
            // 'page.html' 弹出窗口的文件名； 
            // 'newwindow' 弹出窗口的名字（不是文件名），非必须，可用空''代替； 
            // height=100 窗口高度； 
            // width=400 窗口宽度； 
            // top=0 窗口距离屏幕上方的象素值； 
            // left=0 窗口距离屏幕左侧的象素值； 
            // toolbar=no 是否显示工具栏，yes为显示； 
            // menubar，scrollbars 表示菜单栏和滚动栏。 
            // resizable=no 是否允许改变窗口大小，yes为允许； 
            // location=no 是否显示地址栏，yes为允许； 
            // status=no 是否显示状态栏内的信息（通常是文件已经打开），yes为允许；
            if (num === 'wb') {
                var target_url = "http://service.weibo.com/share/share.php?" + temp.join('&');
                window.open(target_url, 'toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=no');
            }
            if (num === 'qq') {
                var _shareUrl2 = "http://connect.qq.com/widget/shareqq/index.html?" + temp.join('&');
                window.open(_shareUrl2, 'toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=no');
            }
            if (num === 'qqzone') {
                var target_url2 = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + temp.join('&');
                window.open(target_url2, 'toolbar=no,menubar=no,scrollbars=no,resizable=1,location=no,status=no');
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.index {
    text-align: center;
}
h2 {
    cursor: pointer;
}
.item {
    margin-bottom: 15px;
}
.box {
    width: 80px;
    height: 80px;
    background: red;
    margin-top: 20px;
    position: absolute;
}

.telbox {
    width: 30px;
    height: 50px;
    background: red;
    position: fixed;
    top: 45%;
    right: 0px;
    text-align: center;
    line-height: 25px;
    transition: all 0.8s ease;
}
.rightbox {
    width: 100px;
    height: 100%;
    background: green;
    position: fixed;
    top: 0px;
    right: 0px;
    text-align: center;
}
// 给过渡的name加样式
.mybox-leave-active,
.mybox-enter-active {
    transition: all 0.8s ease;
}
.mybox-leave-active,
.mybox-enter {
    width: 0px !important;
}
.mybox-leave,
.mybox-enter-active {
    width: 100px;
}

.to_top {
    cursor: pointer;
    background: url("/static/images/fenxiang-sprite.png") no-repeat; /* 设置背景图片 */
    width: 55px;
    height: 55px;
    background-position: -0px -127px;
    transition: all 0.3s;
    position: fixed;
    bottom: 100px;
    right: 100px;
    height: 130px;
    z-index: 100;
}
.num_input {
    margin-top: 50px;
}
</style>
