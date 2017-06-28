# 特性
1、 react 

2、redux 

3、react-router-dom  

4、webpack （专注于模块化打包）

5、gulp （专注于工作流）

6、eslint

7、ejs

8、zepto


# 作者开发环境
npm 5.0.3

node v4.6.0

webpack 2.6.1


# 开始
git clone https://github.com/wenzouquan/react-dome.git
cd react-dome
npn install
gulp

如果一切顺利： http://localhost:3001 就可以访问首页了


# 用起来真的很简单
首先在根目录（react-dome）下执行 npm run mod index/index , 这样就会在 src/modules目录，生成对应该的模块

然后不需要配置，在浏览器访问地址：http://localhost:3001/#/index/index 就可以访问到刚才生成的模块了。


# 模块目录

<img src="https://static.oschina.net/uploads/space/2017/0628/222955_oHIk_1160364.png" >
```

# 常用方法

一、 路由 

如： http://localhost:3001/#/user/index/id/12/name/wen190  访问的目录 ./src/user/index ,参数可以对应的store获取 {id:12,name:'wen190'} 

访问此路由，第一次会自动调用init方法，请查看index.store.js。

二、app.js 内置方法

1、store方法

reactApp.getStore("user/index") ; //返回的是 user/index/index.store.js 的redux对象

var unwatch = reactApp.getStore("user/index").watch("userInfo",function(newVal,oldVal){
	console.log(newVal);
}) //监听 user/index 模块的state.userInfo值的变化  ， 一般使用场景 ，异步处理时，数据会来得晚一些



就是那么简单，clone 下来改吧改吧 。。。 时间有限，期待作者更新

下一步优化计划：

1、多页面切换时，页面浏览位置不能变

2、浏览内存回收

3、打包发布

4、有选择地把模块资源合并
......












