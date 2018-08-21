const path = require('path');
const express = require('express');
const app = express();
const multer = require('multer'); 

// 设置静态文件目录
app.use(express.static(path.resolve('./static')));
console.info('静态文件目录：', path.resolve('./static'));

// 首页
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const upload = multer({ dest: './uploads/' }); // for parsing multipart/form-data

app.use('/user/:id', upload.single('avatar'), (req, res, next) => {
    return res.json({
        query: req.query,
        params: req.params,
        file: req.file,
        body: req.body
    });
});

app.listen(3000, '0.0.0.0', () => {
    console.log('启动服务器: http://localhost:3000');
});
