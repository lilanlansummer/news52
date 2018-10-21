//程序入口文件
//1.导包
const fs = require('fs')
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
//请求日志-第三方中间件
var morgan = require('morgan');
var serveIndex = require('serve-index');





const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'msg52'
}

const sessionStore = new MySQLStore(options);



//2.返回app对象
const app = express();

var accessLogStream = fs.createWriteStream('./log.txt', { flags: 'a' });
app.use('/views', serveIndex('./views'));

//使用第三方中间件
app.use(morgan('tiny', { stream: accessLogStream }));

//3.配置包
app.engine('html', require('express-art-template'));
app.use(bodyParser.urlencoded({ extended: false }));
//配置express-mysql-session
app.use(session({
    key: 'session_cookie_name',
    secret: 'keyboard cat',
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}));
//统一处理静态资源
app.use('/public', express.static('./public')); //统一配置自己的静态资源
app.use('/node_modules', express.static('./node_modules')); //统一配置第三方静态资源


//app.locals公共成员
//作用: app.locals增加的属性可以在html中通过模板引擎的语法去使用
app.use((req, res, next) => {
    app.locals.sessionUser = req.session.user;
    next();
})





//使用router  注意代码位置:写在绑定端口前面
app.use(router);
// router.js --->控制器 if(err){next(err)}--->err--->next(err)



//统一处理错误的中间件
//1. 4个参数的顺序     2.挂在路由之后
app.use((req, res, next) => {
    res.render('404.html');
    next();
})




//统一处理错误的中间件
app.use((err, req, res, next) => {
    res.send({
        code: 500,
        message: err.message
    })
});




//4.绑定端口
app.listen(12345, () => {
    console.log('run it');
})