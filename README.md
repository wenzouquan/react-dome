# 使用前说明
目前的配置一个模块会打包成一个js , 这种方法比较合适模块比较多的情况，这样完成按需加载

如果模块比较少，可以选择其它的手脚架来进行开发 。

比如说做一小项目一共加起来20多个模块的，可以选择轻量变的如：vue.js ，产品所有模块里的js,html,css , 还有一些小图标，打包在一起不到100K ，再加上类库也不到500k的文件 ，然后服务器按50%左右压缩比 ，一般浏览器并发上限都可以一次性加载完所有资源，从而提高访问流畅性。

所以我们根据自己的产品来选择合适的开发工具才是最重要的

以下我要介绍的是使用react来开发自己的产品 ， 我觉得还是很合适多人团队开发，按模块分工合作，组件式开发。



# 特性
1、 react 

2、redux  （5.0.5）

3、react-router-dom  （版本4.1.1） 

4、webpack 2.6.1（模块化开发）

5、gulp CLI version 1.3.0 , Local version 4.0.0-alpha.2（工作流，比如文件改变，自动载入组件）

6、eslint （js 检查）

7、ejs  （这里主要用于node服务端 模板解析）

8、zepto （工具方法）


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


# 添加新模块



1、那么可以在根目录（react-dome）下执行 npm run mod index/index , 这样就会在 src/modules目录，生成对应的模块

2、在浏览器访问地址：http://localhost:3001/#/index/index 就可以访问到刚才生成的模块了



# 模块目录

<img src="https://static.oschina.net/uploads/space/2017/0628/222955_oHIk_1160364.png" >
```


这样我们团队成员，只需在自己的模块下就可以完成所有的工作 比如 css 修改 ， html , 数据与服务器对接 。 各自完成自己的模块开发，就算某个模块出错也不影响其它模块正常运行。


# 路由 

如： http://localhost:3001/#/user/index/id/12/name/wen190  访问的目录 ./src/user/index ,url的参数为：{id:12,name:'wen190'} 



# redux对象store

1、获取模块的store

reactApp.getStore("user/index") ; //返回的是 user/index/index.store.js 的redux对象

2、监听store里的state对象发生变化

var unwatch = reactApp.getStore("user/index").watch("userInfo",function(newVal,oldVal){

	console.log(newVal);
	
}) 

3、在外部直接修改state
reactApp.getStore("user/index").setState({key:vaule}) ;

4、在外部调用store里方法

reactApp.getStore("user/index").call(type, params); //可以在外部直接调用方法 



就是那么简单，clone 下来改吧改吧， 。。。 时间有限，还有很多需要改进的 ，欢迎给我建议或意见，谢谢大家




# 下一步优化计划：

1、多页面切换时，页面浏览位置不能变

2、浏览内存回收

3、打包发布

4、有选择地把模块资源合并
......












