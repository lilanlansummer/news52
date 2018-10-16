//程序入口文件
//1.导包
const express = require('express');
const router = require('./router');




//2.返回app对象
const app = express();


//3.配置包
app.engine('html', require('express-art-template'));

//统一处理静态资源
app.use('/public', express.static('./public')); //统一配置自己的静态资源

app.use('/node_modules', express.static('./node_modules')); //统一配置第三方静态资源

//使用router  注意代码位置:写在绑定端口前面
app.use(router);


//4.绑定端口
app.listen(12345, () => {
    console.log('run it');
})