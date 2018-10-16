const showSignin = (req, res) => {
    // res.send('控制器中的c_user.js,实现函数');
    res.render('signin.html');
};


//导出所有方法
exports.showSignin = showSignin;