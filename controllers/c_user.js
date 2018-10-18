var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'msg52',
});



const m_user = require('../models/m_user');



//渲染登录页
const showSignin = (req, res) => {
    // res.send('控制器中的c_user.js,实现函数');
    res.render('signin.html');
};



//表单提交
exports.handleSignin = (req, res) => {
    //获取去表单数据
    const body = req.body;

    m_user.checkEmail(body.email, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                message: '服务器错误'
            })
        }

        //如果邮箱不存在
        if (!data[0]) {
            return res.send({
                code: 1,
                message: '邮箱不存在'
            });
        }
        //在验证密码
        if (data[0].password != body.password) {
            return res.send({
                code: 2,
                message: '密码错误,再想想!'
            });
        }

        //在这个位置可以获取到正确的用户信息
        //保存了当前的用户信息在session中
        //req.session  express-sission(下载)
        req.session.user = data[0]; //data里面保存了用户信息







        // 邮箱和密码都正确,验证通过
        res.send({
            code: 200,
            message: '验证通过'
        });

    });





    //数据库操作
    // connection.query(sqlstr, body.email, (err, data) => {
    //     if (err) {
    //         return res.send({
    //             code: 500,
    //             message: '服务器错误'
    //         })
    //     }
    //     //如果邮箱不存在
    //     if (!data[0]) {
    //         return res.send({
    //             code: 1,
    //             message: '邮箱不存在'
    //         });
    //     }
    //     // console.log('邮箱存在');
    //     if (data[0].password != body.password) {
    //         return res.send({
    //             code: 2,
    //             message: '密码错误,再想想!'
    //         });
    //     }
    //     res.send({
    //         code: 200,
    //         message: '验证通过'
    //     });
    // })
}

exports.handleSignout = (req, res) => {
    //1.清除session保存的y用户信息
    delete req.session.user;
    //2.跳转到登录页
    res.redirect('/signin');
}

//导出所有方法
exports.showSignin = showSignin;