Vue实现数据双向绑定的原理：Object.defineProperty（）

采用数据劫持结合发布者 - 订阅者模式的方式，通过Object.defineProperty（）来劫持各个属性的setter，getter，
在数据变动时发布消息给订阅者，触发相应监听回调。

vue 优点
低耦合、可重用、性独立开发
mvvm
Model     View    viewModel

eventBus vuex

getters
类似vue的计算属性，主要用来过滤一些数据。
读取的状态集中放在store中； 改变状态的方式是提交mutations，这是个同步的事物； 异步逻辑应该封装在action中。
全局指令 Vue.directive

keep - alive是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。
mixins 混入(mixins)


$route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。
而$router是“路由实例”对象包括了路由的跳转方法，钩子函数

//定义路由  
const routes = [
    { path: "/", redirect: "/home" },//重定向,指向了home组件  
    {
        path: "/home", component: home,
        children: [
            { path: "/home/game", component: game }
        ]
    }
]

  // babel-core babel-loader  es6 编译器

watch 为了监听某个响应数据的变化。
computed 是自动监听依赖值的变化，从而动态返回内容，主要目的是简化模板内的复杂运算。所以区别来源于用法，只是需要动态值，那就用 computed ；
需要知道值的改变后执行业务逻辑，才用 watch。
methods是一个方法，它可以接受参数，而computed 不能，computed 是可以缓存的，methods 不会。computed 可以依赖其他 computed，甚至是其他组件的 data。


给vue组件绑定事件时候，必须加上native ，不然不会生效（监听根元素的原生事件，使用.native 修饰符）

nextTick
对数据更改--刷新后的 DOM 做相应的处理
    .native 修饰符就是用来注册元素的原生事件而不是组件自定义事件的

this.$nextTick(() => {

})
async / await的基础用法(进程 > 线程 > 协程)
Promise使用then函数进行链式调用，一直点点点，是一种从左向右的横向写法；
async / await从上到下，顺序执行，就像写同步代码一样，更符合代码编写习惯；
Promise是根据函数式编程的范式，对异步过程进行了一层封装，async / await基于协程的机制，

async 只是返回值是一个Promise对象
async function testAsync() {
    return "hello async";
}

const result = testAsync(); // 返回一个Promise对象
console.log(result);

// async函数返回的是一个Promise对象，async函数 （包括函数语句、函数表达式、Lambda表达式）会返回一个Promise对象，
// 如果在函数中return一个直接量，async会把这个直接量通过Promise.resolve() 封装成 Promise 对象；

await await只能在async函数内部使用：不能放在普通函数里面，否则会报错 不处理异步error
await后面也可以跟同步代码
// 所以 await 可以用于等待一个 async 函数的返回值——这也可以说是 await 在等 async 函数，
// 但要清楚，它等的实际是一个返回值。注意到 await 不仅仅用于等 Promise 对象，它可以等任意表达式的结果，
const a = await 'hello world'
// 相当于
const a = await Promise.resolve('hello world');
// 跟同步代码是一样的，还不如省事点，直接去掉await关键字
const a = 'hello world';

// js
浏览器可视区域的宽高 document.body.clientWidth/clientHeight || document.documentElement.clientHeight
获取滚动条相对于顶部的高度 document.body.scrollTop || document.documentElement.scrollTop

clientHeight: 表示的是可视区域的高度, 不包含border和滚动条
offsetHeight: 表示可是区域的高度, 包含了border和滚动条
scrollHeight: 表示了所有区域的高度, 包含了滚动条被隐藏的部分
clientTop: 表示边框border的厚度, 在为指定的情况下,一般为0
scrollTop: 滚动后被隐藏的高度, 获取对象相对于offsetParent属性指定的父坐标距离顶部的距离

let query = Object.assign({}, params, { access_token: getToken('_token') })
window.location.href = `${CONFIG.baseUrl}api-project/project/exportProjectExcel?${qs.stringify(query)}`


window.onload和DOMContentLoaded的区别
window.addEventListener(‘load’,function(){
//页面的所有资源加载完才会执行, 包括图片和视频等
})
document.addEventListener(‘DOMContentLoaded’,function(){
//DOM渲染完即可执行, 此时图片,视频还可能没有加载完成
})
Array.prototype.slice.call( 伪数组名称 ) 将伪数组转换为真数组

面向对象



foreach  map 区别
foreach 不能返回修改之后的新数组
var oldArr = [1, 2, 3, 4, 5];
var sum = 0;
var newArr = oldArr.forEach(function (value, index, arr) {
    //forEach可以修改oldArr的值
    console.log(arr)
    return arr[index] = value * 10;
    return value * 10;
});//value值是必须的，其他两个参数，index和arr可选。按照顺序是array.forEach(function(value，index，arr){})
console.log(oldArr); //原数组
console.log(newArr);//在这这里，无法像map方法一样获得newArr的值，所以这就是forEach和map方法的一个区别； 这里打印出来的undefined

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

var oldArr2 = [1, 2, 3, 4, 5];
var newArr2 = oldArr2.map(function (value, index, arr) {
    //map也可以修改oldArr的值
    //return arr[index]=value*10;
    //如果想保留oldArr，则应该声明一个newArr来获得map方法的返回值
    return value * 10

})
some()  some表示只要有一项满足就可以
every()表示必须每每每一项满足就可以返回true

console.log(oldArr2); //原数组
console.log(newArr2); //改变之后的数组

ES6 常用语法
let const
const (声明常量) 一旦声明 立即要初始化 不能改变的是指向的地址，里面的值还是能变的。
4.想将对象冻结，可以使用const foo = Object.freeze({});
结构赋值
模板字符串
箭头函数
拷贝  Object.assign()  {...obj } JSON.parse(JSON.stringify(data)
Number 的扩展方法  Number.parseInt(), Number.parseFloat()
Math 的扩展方法  Math.trunc方法用于去除一个数的小数部分，返回整数部分。Math.sign方法用来判断一个数到底是正数、负数、还是零
Array.from方法用于将两类对象转为真正的数组
增加了函数参数的默认值 如
function log(x, y = 'World') {
        console.log(x, y);
    }
合并数组[...arr1, ...arr2, ...arr3]

    ES7 常用语法
1.Arr.includes() 判断是否存在 存在返回true否则false
2.a ** b  相当于  Math.pow(a, b)
3.Object.keys()
ES8 常用语法
1.async / await
2.Object.values()


//显示列按钮
//可以选择多个按钮的时候 
SelectItem(event, value, index, type) {
    let classList = event.target.classList;

    let selectArr = this[type + 'selectButtonList']

    // contains方法用来查看dom元素的包含关系
    if(!classList.contains("el-button--info")) {
    if (selectArr.length < 10) {
        classList.remove("el-button--primary");
        //添加选中样式和数组对象
        classList.add("el-button--info");
        selectArr.push({
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
    // value.show = !value.show
    value.show == true ? value.show = false : value.show = true
    this.TrimData = []
    selectArr.map((item, index) => {
        if (item.name == value.name) {
            selectArr.splice(index, 1)
            this.TrimData.push({ name: value.name, show: false })
        }
    })
}
},


typeof 2      输出   number
typeof null   输出   object
typeof {}    输出   object
typeof []    输出   object
typeof (function () { })   输出  function
typeof undefined         输出  undefined
typeof '222'                 输出    string
typeof true                   输出     boolean

这里面包含了js里面的五种数据类型  number   string    boolean   undefined     object和函数类型 function
    看到这里你肯定会问了：我怎么去区分对象，数组和null呢 ? constructor 也可以
接下来我们就用到另外一个利器：Object.prototype.toString.call() 对象的一个原生原型扩展函数, 用来更精确的区分数据类型
var gettype = Object.prototype.toString
gettype.call('aaaa')        输出[object String]
gettype.call(2222)         输出[object Number]
gettype.call(true)          输出[object Boolean]
gettype.call(undefined)  输出[object Undefined]
gettype.call(null)                  输出[object Null]
gettype.call({})                   输出[object Object]
gettype.call([])                    输出[object Array]
gettype.call(function () { })     输出[object Function]

JQ常用方法
$().addClass(css中定义的样式类型); 给某个元素添加样式
$().attr({ src: ”test.jpg”, alt: ”test Image” }); 给某个元素添加属性 / 值，参数是map
$().html();
$().removeClass(”class ”)
$().val(value);
$().after(content);
$().append(content);
$().before(content);
$().remove(”exp”);
blur()                             元素失去焦点 a, input, textarea, button, select, label, map, area
change()                       用户改变域的内容 input, textarea, select
click()                             鼠标点击某个对象 几乎所有元素
dblclick()                        鼠标双击某个对象 几乎所有元素
error()                          当加载文档或图像时发生某个错误 window, img
focus()                         元素获得焦点 a, input, textarea, button, select, label, map, area
keydown()                   某个键盘的键被按下 几乎所有元素
keypress()                   某个键盘的键被按下或按住 几乎所有元素
keyup()                       某个键盘的键被松开 几乎所有元素
load(fn)                        某个页面或图像被完成加载 window, img
mousedown(fn)          某个鼠标按键被按下 几乎所有元素
mousemove(fn)           鼠标被移动 几乎所有元素
mouseout(fn)              鼠标从某元素移开 几乎所有元素
mouseover(fn)            鼠标被移到某元素之上 几乎所有元素
mouseup(fn)              某个鼠标按键被松开 几乎所有元素
resize(fn)                  窗口或框架被调整尺寸 window, iframe, frame
scroll(fn)                      滚动文档的可视部分时 window
select()                      文本被选定 document, input, textarea
submit()                    提交按钮被点击 form
unload(fn)                    用户退出页面 window
eq() 方法将匹配元素集缩减值指定 index 上的一个。
siblings() 方法返回被选元素的所有同级元素。

$('.list').on('click', '.page', function () {
    $(this).addClass("current").siblings().removeClass("current");
}
解决跨域方式
// header 后台
header('Access-Control-Allow-Origin:*');//允许所有来源访问  CORS                                
header('Access-Control-Allow-Method:POST,GET');//允许访问的方式 　
JSONP(jsonp缺点：只能实现get一种请求。)
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://www.domain2.com:8080/login?user=admin&callback=handleCallback';
插件  nginx proxy

var socket = io('http://www.domain2.com:8080');

<script src="https://cdn.bootcss.com/socket.io/2.2.0/socket.io.js"></script>

WebSocket协议跨域

// 连接成功处理
socket.on('connect', function () {
    // 监听服务端消息
    socket.on('message', function (msg) {
        console.log('data from server: ---> ' + msg);
    });

    // 监听服务端关闭
    socket.on('disconnect', function () {
        console.log('Server socket has closed.');
    });
});

document.getElementsByTagName('input')[0].onblur = function () {
    socket.send(this.value);
};


小程序 生命周期
onLaunch > onReady > onLoad > onShow > onHide

onLoad 监听页面加载
onReady 初次渲染完成
onLaunch 全局只触发一次 监听初始化
onShow 监听页面显示
onHide 监听页面隐藏
onError 监听错误
onUnload 监听页面卸载
onPageNotFound 页面不存在的监听函数

当小程序执行了onUnload的时候，wxml绑定的数据就会消失，然后再进入小程序才会走onLoad方法


移动端兼容
防止放大缩小
    < !DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd" >
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" />


图片显示模糊情况  图片在手机里显示更为清晰，必须使用2x的背景图来代替img标签（一般情况都是用2倍）。例如一个div的宽高是100100，背景图必须得200200
移动端图片居多，加载过慢，使用延迟加载 | 懒加载（ lazyload.js）

<script src="jquery.js" type="text/javascript"></script>
    <script src="jquery.lazyload.js" type="text/javascript"></script>
    <img src="img/grey.gif" data-original="img/example.jpg" width="640" heigh="480"></img> src 属性的值指向占位图片，添加 data - original 属性，让其指向真正的图像地址。
$("img.lazy").lazyload();
$("img.lazy").lazyload({ threshold: 200 }); 提前加载

上下拉滚动卡慢
body {
    -webkit - overflow - scrolling: touch;
    overflow - scrolling: touch;
}

IOS中input键盘事件keyup、keydown、keypress支持不是很好
用html5的oninput事件去代替keyup


去除input默认样式

input[type = number] {
    -moz - appearance: textfield;
}
input[type = number]:: -webkit - inner - spin - button,
    input[type = number]:: -webkit - outer - spin - button {
    -webkit - appearance: none;
    margin: 0;
}

一般在移动端用tap事件来取代click事件。
$("#haorooms").on("touchend", function (event) {
    event.preventDefault();
});


function browserRedirect() {
    var ua = navigator.userAgent.toLowerCase();
    var ipad = ua.match(/ipad/i) == "ipad";
    var iphone = ua.match(/iphone os/i) == "iphone os";

    var mid = ua.match(/midp/i) == "midp";

    //midp，即Mobile Internet Device pad，一种新的“比智能电话大，比笔记本小”的互联网终端。

    var uc7 = ua.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var uc = ua.match(/ucweb/i) == "ucweb";
    var android = ua.match(/android/i) == "android";
    var ce = ua.match(/windows ce/i) == "windows ce";
    var mobile = ua.match(/windows mobile/i) == "windows mobile";
    if (ipad || iphone || mid || uc7 || uc || android || ce || mobile) {
        //跳转移动端页面
        window.location.href = "http://www.wanshaobo.com/mobile/index.html";
    } else {
        //跳转pc端页面
        window.location.href = "http://www.wanshaobo.com/index.html";
    }
}



css 难点属性

划线
h1 { text - decoration: overline; } 上面
h2 { text - decoration: line - through; } 中间
h3 { text - decoration: underline; } 下面

1.画三角形

    .d2{
    width: 0;
    height: 0;
    border - width: 100px;
    border - style: solid;
    border - color:#FFCCCC #0099CC #996699 #339933;
}
css3
windowScroll() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //变量windowHeight是可视区的高度
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //变量scrollHeight是滚动条的总高度
    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    //滚动条到底部的条件
    if (scrollTop + windowHeight == scrollHeight) {
        //加载页数
        this.getcard();
    }
},

@media screen and(min - width: 1704px) and(max - width: 1915px) { }
@media only screen and(max - width: 1552px) { }
从上到下的线性渐变：
background - image: linear - gradient(direction, color - stop1, color - stop2, ...);

从左到右的线性渐变：
#grad {
    height: 200px;
    background - image: linear - gradient(to right, red, yellow);
}

2D
transform
translate() //根据左(X轴)和顶部(Y轴)位置给定的参数，从当前元素位置移动。
rotate() //在一个给定度数顺时针旋转的元素。负值是允许的，这样是元素逆时针旋转。
scale() // 该元素增加或减少的大小，取决于宽度（X轴）和高度（Y轴）的参数：
skew() //分别表示X轴和Y轴倾斜的角度，如果第二个参数为空，则默认为0，参数为负表示向相反方向倾斜。
matrix() //方法有六个参数，包含旋转，缩放，移动（平移）和倾斜功能。

3D
transform: rotateX(120deg);


// 属性设置元素的垂直对齐方式
vertical - align: middle
// 在父元素定义了line-height的条件下，vertical-align的作用是让（inline/inline-block）子元素依据父元素的基点对齐。

flex 布局

flex - direction
row（默认值）：主轴为水平方向，起点在左端。
row - reverse：主轴为水平方向，起点在右端。
column：主轴为垂直方向，起点在上沿。
column - reverse：主轴为垂直方向，起点在下沿。


flex - wrap: nowrap | wrap | wrap - reverse; 是否换行

justify - content：flex - start | flex - end | center | space - between | space - around; 属性定义了项目在主轴上的对齐方式。

align - items：flex - start | flex - end | center | baseline | stretch; 属性定义项目在交叉轴上如何对齐。

align - content: flex - start | flex - end | center | space - between | space - around | stretch; 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

flex ：1

align - self：auto | flex - start | flex - end | center | baseline | stretch; 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align - items属性。默认值为auto


obj - fit: fill || cover || contain || none || scale - down

被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比 contain

被替换的内容在保持其宽高比的同时填充元素的整个内容框 cover

被替换的内容正好填充元素的内容框 fill

内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。 scale - down


正则
// 正则匹配
let Pattern = {
    isEmpty: /(^\s*)|(\s*$)/g, //
    isMobile: /^1[3|4|5|6|7|8][0-9]{9}$/, //
    isCnAndEn: /^[\u4E00-\u9FA5]+$/,
    isCnAndEnAndNum: /^[\u4e00-\u9fa5-a-zA-Z0-9]+$/,//
    isUserName: /^[(\u4e00-\u9fa5)a-zA-Z]+$/,
    isPassword: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
    isAuthCode: /^[0-9]{6}$/,
    isTelAndMobile: /^(1[3|4|5|7|8][\d]{9}|0[\d]{2,3}-[\d]{7,8}|400[-]?[\d]{3}[-]?[\d]{4})$/,
    isMail: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,  //邮箱
}
数字：^ [0 - 9] * $    0或正整数 /^ ([0] | [1 - 9]\d *) $ /
    零和非零开头的数字：^ (0 | [1 - 9][0 - 9] *)$
非零的正整数 ^\+? [1 - 9][0 - 9] * $
  汉字：/^[\u4e00-\u9fa5]+$/
只能输入汉字数字集合 /^ [0 - 9\u4e00 - \u9fa5] + $ /
    英文和数字：^ [A - Za - z0 - 9] + $ 或 /^ [0 - 9a - zA - Z] + $ /
        手机号码：^ (13[0 - 9] | 14[5 | 7] | 15[0 | 1 | 2 | 3 | 5 | 6 | 7 | 8 | 9] | 18[0 | 1 | 2 | 3 | 5 | 6 | 7 | 8 | 9]) \d{ 8 } $
密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线) ：^ [a - zA - Z]\w{ 5, 17 } $
大小写英文、中文、数字 /^ [0 - 9a - zA - Z\u4e00 - \u9fa5] + $ /
    身份证号 /^ [1 - 9]\d{ 7 } ((0\d)| (1[0 - 2])) (([0 | 1 | 2]\d)| 3[0 - 1]) \d{ 3 } $ |^ [1 - 9]\d{ 5 } [1 - 9]\d{ 3 } ((0\d)| (1[0 - 2])) (([0 | 1 | 2]\d)| 3[0 - 1]) \d{ 3 } ([0 - 9] | X)$ /
        数字且开始不能为0 /^ (? !0)[0 - 9] + $ /
        QQ号码 / [1 - 9][0 - 9]{ 4,} /
邮箱 /^ [a - z0 - 9] + ([._\\-] * [a - z0 - 9]) *@([a - z0 - 9] + [-a - z0 - 9] * [a - z0 - 9] +.) { 1, 63 } [a - z0 - 9] + $ /

