/**axios封装
 * 请求拦截、相应拦截、错误统一处理 YYL2019-3
 */
import axios from 'axios';
import Vue from 'vue'
import router from '../router'
import qs from 'qs';
// import configs from '../config/index' //环境
// import {key_32} from '../utils/util.js';
// const configs = require('../config/index')
axios.defaults.baseURL = configs.baseUrl;
configs.commonUrlImg = configs.baseImg;
console.log('baseURL', axios.defaults.baseURL)

// 请求超时时间
axios.defaults.timeout = 100000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//get
axios.defaults.headers.common['Access-Web'] = key_32();
// 'Access-Web':key_32(),

// 请求拦截器
axios.interceptors.request.use(
  config => {

    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = localStorage.Authorization;
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.error(error);
  })

// 响应拦截器
axios.interceptors.response.use(
  response => {

    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况    
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录                
        // 未登录则跳转登录页面，并携带当前页面的路径                
        // 在登录成功后返回当前页面，这一步需要在登录页操作。                
        case 401:

          break;
          // 403 token过期                
          // 登录过期对用户进行提示                
          // 清除本地token和清空vuex中token对象                
          // 跳转登录页面                
        case 403:

          break;
          // 404请求不存在
        case 404:
          Vue.$vux.toast.text('网络请求不存在', 'middle')
          router.replace({
            path: '/404',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        case 500:
          Vue.$vux.toast.text(error.response.data.message || '服务器错误', 'middle')
          break;
          // 其他错误，直接抛出错误提示 
        default:
          Vue.$vux.toast.text(error.response.data.message || '服务器错误', 'middle')
      }
      return Promise.reject(error.response);
    }
  }
);
/** 
 * 封装axios 
 * @param {String} method [请求方法] 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function apiAxios(method, url, params) {
  method = method.toUpperCase();
  let httpDefault = {
    method: method,
    url: url,
    // `params` 是即将与请求一起发送的 URL 参数
    // `data` 是作为请求主体被发送的数据
    params: method === 'GET' || method === 'DELETE' || method === 'PUT' ? params : null,
    data: method === 'POST' ? qs.stringify(params) : null,
  }

  // 注意**Promise**使用(Promise首字母大写)
  return new Promise((resolve, reject) => {
    axios(httpDefault)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
//上传图片的方法
export function $upload(url, data, handle) {
  let instance = axios.create({
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': localStorage.Authorization
    }
  });
  instance.post(url, data).then(res => {
    handle(res.data);
  }).catch(error => {
    console.log(error);
  })
};

export default axios;
