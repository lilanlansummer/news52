const showSignin = (req, res) => {
    // res.send('控制器中的c_user.js,实现函数');
    res.render('signin.html');
};

//表单提交
exports.handleSignin = (req, res) => {
    console.log('客户端发送表单成功');
}

//导出所有方法
exports.showSignin = showSignin;