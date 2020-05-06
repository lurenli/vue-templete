var rootConfig = {}
if (process.env.METHOD === 'production') {
  rootConfig = {
    baseUrl : 'http://192.168.8.8:9200/', // 正式路径
    webscoketUrl: 'ws://192.168.8.8:15674/ws',
  };
}else{
	rootConfig = {
    // webscoketUrl: 'ws://192.168.8.233:15674/ws',
    // baseUrl : 'http://192.168.8.145:9200/', // 王
    baseUrl : 'http://192.168.8.51:9200/', // 宋
    // baseUrl : 'http://192.168.8.186:9200/', // 测试路
	};
}


export default rootConfig
