//话题模型:专门处理话题表的数据库操作
//1.导入数据库配置文件'
const db = require('../tools/db_config');
//查询topics表中的所有数据
exports.findAllTopics = (callback) => {
    //2使用数据库链接对象
    //倒叙排列,最新添加的数据会在顶部显示
    const sqlstr = 'SELECT * FROM `topics` ORDER BY `createdAt` DESC';
    db.query(sqlstr, (err, data) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, data);
    });
};

//添加新话题
exports.addTopic = (body, callback) => {
    const sqlstr = 'INSERT INTO `topics` SET ?';
    db.query(sqlstr, body, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);


    });
}

//根据id值找到话题
exports.findTopicById = (topicID, callback) => {
    const sqlstr = "SELECT * FROM `topics` where id = ?";
    db.query(sqlstr, topicID, (err, data) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, data);
        // console.log(data);

    });
}