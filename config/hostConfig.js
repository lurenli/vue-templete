var rootConfig = {}

//利用环境变量来判断 对应的 接口地址
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') { 
  rootConfig = {
    baseUrl : 'http://192.168.8.8:9200/', // 正式路径
    webscoketUrl: 'ws://192.168.8.8:15674/ws',
  };
}else if(process.env.NODE_ENV === 'development'){
	rootConfig = {
    // webscoketUrl: 'ws://192.168.8.233:15674/ws',
    // baseUrl : 'http://192.168.8.145:9200/', // 王
    baseUrl : 'http://192.168.8.51:9200/', // 宋
    // baseUrl : 'http://192.168.8.186:9200/', // 测试路
	};
}else if(process.env.NODE_ENV === 'test'){
	rootConfig = {
    // webscoketUrl: 'ws://192.168.8.233:15674/ws',
    // baseUrl : 'http://192.168.8.145:9200/', // 王
    baseUrl : 'http://192.168.8.51:9200/', // 宋
    // baseUrl : 'http://192.168.8.186:9200/', // 测试路
	};
}


export default rootConfig
