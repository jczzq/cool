const path = require('path');
const express = require('express');
var app = express();

// 设置静态文件目录
app.use(express.static(path.resolve('./static')));
console.info('静态文件目录：', path.resolve('./static'));

// 首页
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.use('/user', (req, res, next) => {
    // return res.json({
    //     query: req.query,
    //     params: req.params,
    //     body: req.body
    // });
    return res.sendStatus(200);
});

app.listen(3000, '0.0.0.0', () => {
    console.log('启动服务器: http://localhost:3000');
});
