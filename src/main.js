// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// import '@/styles/index.scss' // global css
import './styles/reset.scss'
import store from './store/index'
import Cookies from 'js-cookie'
import API from '@/api';
import App from './App'
import router from './router'
import axios from 'axios'
import moment from 'moment'//导入文件 

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { IntNumber } from './utils/publicMed'

// import './assets/js/px2rem.js' 移动端

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.Cookies = Cookies
Vue.prototype.API = API
Vue.prototype.$moment = moment;//赋值使用
Vue.use(IntNumber)
Vue.use(ElementUI)

Date.prototype.Format = function (fmt) { // author: meizz
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}
// 页面直接使用 item.updateTime = item.updateTime ? new Date(item.updateTime).Format("yyyy-MM-dd hh:mm") : "";
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
