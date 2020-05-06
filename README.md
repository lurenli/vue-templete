# firstvue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


CommonJS规范 //同步

module.exports属性表示当前模块对外输出的接口

node为每一个模块提供了一个exports变量(可以说是一个对象)，指向 module.exports


<!-- 这相当于每个模块中都有一句这样的命令 var exports = module.exports; -->