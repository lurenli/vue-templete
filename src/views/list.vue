<template>
    <div class="list">
        <h2 @click="ToList()">去首页</h2>

        <div v-for="(item,index) in ContentList" :key="item.id">
            <h3 v-html="FilterName(item.name)"></h3>
        </div>
        <listIframe />
        {{a}} {{b}}
        {{a | capitalize}}
        <div class="sjx"></div>
        <div class="left"></div>
        <label for="fileExcel" class="upload_file">选取文件</label>
        <input id="fileExcel" ref="referenceUpload" accept=".xls,.xlsx" type="file" style="display:none" @change="(e) => ImportData(e)">

        <inpu v-IntNumber type="text"/>
    </div>
</template>
<script>

import mixins from '../utils/mixins'
// Object.freeze提升性能
// Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，
// 不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。
import listIframe from './list-iframe.vue'
export default {
    components: { listIframe },
    mixins: [mixins],
    data() {
        return {
            indexList: [],
            ContentList: [
                { name: '妈妈', id: 1 },
                { name: '妈妈爱我', id: 2 },
                { name: '不要打我,妈妈救我', id: 3 },
                { name: '求你救我妈妈,我妈妈...', id: 4 },
                { name: '来吧,妈妈,没事', id: 5 }
            ],
            keyWords: '妈妈',
            a: '爷爷'
        }
    },
    created() {
        //  Promise 方案的死穴—— 参数传递太麻烦了
        const result = this.testAsync(); // 返回一个Promise对象 
        // async 函数（包含函数语句、函数表达式、Lambda表达式）会返回一个 Promise 对象，
        // async 函数调用不会造成阻塞
        // 如果在函数中 return 一个直接量，async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象。
        console.log(result);
        result.then((res) => { //输入async 函数return 的值
            console.log(res)
        })
        // await 就是获取async 的返回内容
        // 所以 await 可以用于等待一个 async 函数的返回值——这也可以说是 await 在等 async 函数，
        // 但要清楚，它等的实际是一个返回值。注意到 await 不仅仅用于等 Promise 对象，它可以等任意表达式的结果，


        // mixins mixins时方法和参数是不共享的
        // mixins可写入组件export default 中的所有内容。data , methods , components , computed 和 钩子函数。这些内容会根据不同的规则融合到组件中。

        // router.beforeEach((to, from, next) => {})
        this.b = '江松'
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


        var oldArr2 = [1, 2, 3, 4, 5];
        var newArr2 = oldArr2.map(function (value, index, arr) {
            //map也可以修改oldArr的值
            //return arr[index]=value*10;
            //如果想保留oldArr，则应该声明一个newArr来获得map方法的返回值
            return value * 10

        })
        console.log(oldArr2); //原数组
        console.log(newArr2); //改变之后的数组

    },
    filters: {
        capitalize(value) {
        }
    },
    methods: {
        async ImportData(e) {
            // this.$refs.referenceUpload.value = null;
            this.ImportTemplateShow = false;
            this.FileName = '';
            let time, importData;
            this.formData = '';
            const self = this;
            const files = e.target.files[0];
            const type = files.name.slice('-3');
            const newtype = files.name.slice('-4');
            if (files.size > 20 * 1024 * 1024) {
                this.$message({
                    type: 'error',
                    message: '上传失败,请上传20M以下的文件!'
                });
                this.$nextTick(() => {
                    self.$refs.referenceUpload.value = null;
                });
                return;
            } else if (type === 'xls') {
                this.FileName = files.name;
                this.successShow = true;
                this.DefineShow = false;
                const formData = new FormData();
                formData.append('file', files);
                this.formData = formData;
            } else {
                this.$message({
                    type: 'error',
                    message: '上传失败，请上传表头正确的xls格式文件'
                });
                this.$nextTick(() => {
                    self.$refs.referenceUpload.value = null;
                });
            }
        },
        async testAsync() {
            return 'hello async'
        },
        ToList() {
            this.$router.push({ path: '/' })
        },
        //  字符串中替换指定关键词 可全局/可一个
        FilterName(value) {
            let strReg = new RegExp(this.keyWords, 'g')//全局
            return value.replace(strReg, `<span style="color:red;font-weight: bold">${this.keyWords}</span>`)
        }
    }
}
</script>
<style lang="scss" scoped>
.list {
    text-align: center;
}
h2 {
    cursor: pointer;
}
.red_tips {
    color: red;
    font-weight: bold;
}
.sjx {
    margin: 0 auto;
    // transparent透明的意思
    width: 0;
    height: 0;
    border-width: 100px;
    border-style: solid;
    // border-color:#FFCCCC #0099CC #996699 #339933;
    border-color: #ffcccc transparent transparent transparent;
    //  transform: rotate(90deg); /*顺时针旋转90°*/
}

.left {
    position: absolute;
    left: 40%;
}
.left:before,
.left:after {
    position: absolute;
    content: "";
    border-top: 10px transparent dashed;
    border-left: 10px transparent dashed;
    border-bottom: 10px transparent dashed;
    border-right: 10px #fff solid;
}
.left:before {
    border-right: 10px #0099cc solid;
}
.left:after {
    left: 1px; /*覆盖并错开1px*/
    border-right: 10px #fff solid;
}
</style>
