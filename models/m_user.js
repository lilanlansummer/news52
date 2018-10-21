//模型:操作数据库并且返回数据库操作的结果
//导入模块
const db = require('../tools/db_config');

//验证邮箱
const checkEmail = function(email, callback) {
        const sqlstr = 'SELECT * FROM `users` WHERE email=?';
        db.query(sqlstr, email, (err, data) => {
            //通过回调函数传出去
            if (err) {
                return callback(err, null);
            }
            callback(null, data)

        });
    }
    //验证昵称
exports.checkNickname = (nickname, callback) => {
        const sqlstr = 'SELECT * FROM `users` WHERE nickname=?';
        db.query(sqlstr, nickname, (err, data) => {
            if (err) {
                return callback(err);
            }
            callback(null, data);
        })
    }
    //添加新用户
exports.addUser = (body, callback) => {
    const sqlstr = 'INSERT INTO `users` SET ?';
    db.query(sqlstr, body, (err, data) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, data);
    });
}

//导出方法
exports.checkEmail = checkEmail;