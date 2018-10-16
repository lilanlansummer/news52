//路由模块
//作用:处理分发,找到这个请求对应的处理函数
//1.导包express
const express = require('express');
const c_user = require('./controllers/c_user')
    //2.获取路由对象express.Router()
const router = express.Router();
//3.router.get()  使用路由对象,监听端口,实现函数
router.get('/signin', c_user.showSignin);
router.post('/signin', c_user.handleSignin);

//4.导出router
module.exports = router;