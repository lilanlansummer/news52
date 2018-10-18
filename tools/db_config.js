//配置mysql
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'msg52',
});

//导出模块
module.exports = db;