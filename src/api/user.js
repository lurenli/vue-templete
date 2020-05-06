import request from '@/request'


// url编码后传递
const transformRequestData = [data => {
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
}

// formdata 方式传参 后台form Data方式处理才可接收到
//   params: { key1: val1},
//   paramsSerializer: function(params) {
//     // arrayFormat可以格式化你的数组参数
//     return qs.stringify(params, { arrayFormat: 'brackets' })
//   }
export function Login(data) {
    return request({
        url: '/api-auth/oauth/token',
        method: "post",
        data: data
    })
}
export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}


export function GetIndexList(params) {
    return request({
        url: '/api-user/staff/listStaff',
        method: "get",
        params: params
    })
}

//  更改项目是否动态漫画
export function setDynamic(data) {
    return request({
        url: '/api-project/project/setDynamicProject',
        method: 'put',
        transformRequest: transformRequestData,
        headers: headers,
        data
    })
}
// 新增漫画项目
export function projectAdd(data) {
    return request({
        url: '/api-project/project/insertProject',
        method: 'post',
        transformRequest: transformRequestData,//post put 的请求头类型 
        headers: headers,
        data
    })
}

// 导入漫画项目数据
export function ImportProjectExcel(data) {
    return request({
        url: '/api-project/project/importProjectExcel',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data' //导入file 的请求头类型
        },
        data
    })
} 