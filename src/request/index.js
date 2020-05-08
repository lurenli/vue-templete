/* 1.引入文件 */
import { Message, Loading } from 'element-ui';
import axios from 'axios'        //引入 axios库
import qs from 'qs'              //引入 node中自带的qs模块（数据格式转换）
/* 2.全局默认配置 */
import rootConfig from '../../config/hostConfig'
import Cookies from 'js-cookie'
let loading
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

let baseURL = rootConfig.baseUrl
// // 判断开发环境（一般用于本地代理）
// if (process.env.NODE_ENV === 'development') { // 开发环境
//   // baseURL = rootConfig.baseUrl
//   baseURL = ''    // 设置的本地代理请求（跨域代理）
//   // 具体请查看config/index 下的 proxyTable属性
// } else {                                      // 编译环境
//   if (process.env.type === 'test') {        // 测试环境
//     // baseURL = 'http://sw.apitest.com'
//   } else {                                  // 正式环境
//     // baseURL = 'http://sw.api.com'
//   }
// }

/*创建一个实例，然后在实例中配置相关属性*/
const request = axios.create({
  baseURL: baseURL, 		      // 后台服务地址
  timeout: 60000, 		      // 请求超时时间1分钟
  responseType: "json",
  withCredentials: false    // 是否允许带cookie这些
});

/* 3.设置拦截器 */
request.interceptors.request.use((config) => {
  console.log(config)
  showFullScreenLoading();
  endLoading()
  // 发送请求前进行拦截
  //  可在此处配置请求头信息
  config.headers["Authorization"] = Cookies.get('access-token');
  if (config.method == "post") {
    /*数据转换: axios post方式默认是json格式提交数据，如果使用application/x-www-form-urlencoded数据格式提交，要用qs.stringify()进行转换,个人建议不在拦截器中全局配置，因为不够灵活，还有一点是，如果
  设置了重新请求的配置，那么重新请求时，请求体中的config里面的传参就会被再次进行qs.stringify()转
  换，会使得参数丢失，造成请求失败。*/
    config.data = qs.stringify(config.data)
  }
  return config;
}, (error) => {
  //console.log("错误的传参", 'fail');
  return Promise.reject(error)
})
request.interceptors.response.use((res) => {
  if (res.status !== 200 && res.status !== 101) {
    Message({
      message: res.msg || res.resp_msg || res.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(res.msg || 'Error'))
  } else {
    tryHideFullScreenLoading()
    return res.data
  }
}, (error) => {
  return Promise.reject(error)
})

// 带有上传进度条的方法
export function UploadFile(data, url, callback1, callback2, callbackError) {
  axios({
    url: CONFIG.baseUrl + url,
    // url: CONFIG.baseUrl + '/upload/uploadSingle',
    method: 'post',
    onUploadProgress: function (progressEvent) { // 原生获取上传进度的事件
      if (progressEvent.lengthComputable) {
        // 属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
        // 如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
        callback1(progressEvent)
      }
    },
    async: false,
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': Cookies.get('access-token')
    },
    data: data,
    timeout: 1000 * 60 * 15
  }).then(res => {
    callback2(res)
  }).catch(error => {
    callbackError(error)
  })
}
export default request