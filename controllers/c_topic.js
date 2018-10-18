//话题的控制器:所有话题相关的业务,写在这个控制器中

//1.导入话题模型m_topic
const m_topic = require('../models/m_topic');
const moment = require('moment');


//渲染话题列表页
exports.showTopic = (req, res) => {
    // res.send('我是话题列表页');
    //2.使用话题模型
    m_topic.findAllTopics(function(err, data) {
        //3.处理数据库操作返回的结果
        if (err) {
            return res.send({
                code: 500,
                message: '服务器错误'
            })
        }
        //在这个位置可以使用data数据了
        res.render('index.html', {
            topics: data,
            user: req.session.user
        });
        // console.log(req.session.user);

    });
}

//发布新话题,渲染页面
exports.createTopic = (req, res) => {
    res.render('topic/create.html');
}

//处理表单
exports.handleCreateTopic = (req, res) => {
    //1.获取表单数据
    const body = req.body;
    body.createdAt = moment().format();

    //为了区分当前的话题谁创建的,所有给body添加userId
    body.userId = req.session.user.id;
    //2.向数据库中添加新数据
    m_topic.addTopic(body, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                message: '服务器又错了'
            })
        }
        //添加成功
        res.send({
            code: 200,
            message: '新话题添加成功'
        })
    });
    //3.返回添加成功的响应
}

//渲染话题详情页
exports.showDetail = (req, res) => {
    //根据话题id找到当前点击的话题
    //获取topicID
    // req.params是一个对象,保存的是动态路由中的参数
    const topicID = req.params.topicID;
    // console.log(req.params);

    //让模型操作数据库,根据id值找到数据,返回结果
    m_topic.findTopicById(topicID, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                message: '服务器又错了'
            })
        }
        //查询成功
        // console.log(data)
        res.render('topic/show.html', {
            topic: data[0]
        });
    })




}