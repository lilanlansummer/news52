//路由模块
//作用:处理分发,找到这个请求对应的处理函数


//1.导包express
const express = require('express');
const c_user = require('./controllers/c_user');
const c_topic = require('./controllers/c_topic');



//2.获取路由对象express.Router()
const router = express.Router();


//3.router.get()  使用路由对象,监听端口,实现函数
router.get('/signin', c_user.showSignin)
    .post('/signin', c_user.handleSignin)
    .get('/', c_topic.showTopic)
    .get('/topic/create', c_topic.createTopic)
    .post('/createTopic', c_topic.handleCreateTopic)
    //动态路由:固定的
    .get('/topic/:topicID', c_topic.showDetail)
    .get('/signout', c_user.handleSignout)
    .get('/topic/:topicID/edit', c_topic.showEdit)
    .post('/topic/:topicID/edit', c_topic.handleEditTopic)
    .post('/topic/:topicID/delete', c_topic.handleDeleTopic)
    .get('/signup', c_user.showSignup)
    .post('/signup', c_user.handleSignup);

//4.导出router
module.exports = router;