const express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const path = require('path');

let WS;

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, './index.html'));
});

// 设置静态文件目录
app.use(express.static(path.join(__dirname, '../../static')));

app.get('/login', function (req, res) {
	var username = req.query.username;
	if (WS) WS.send(JSON.stringify(username));
	WS.broadcast.emit('loginIn', username);
	res.send(req.query || {});
});

let store = {
	users: []
};

io.on('connection', function (socket) {
	WS = socket;
	// 进入聊天室
	socket.on('login', function (msg) {
		let userId = msg.id;
		if (userId && !store.users.map(x => x.id).includes(userId)) {
			socket.broadcast.emit('login', msg);
			store.users.push(msg);
			// console.log(msg.name + ' 进入聊天室');
		}
	});
	// 离开聊天室
	socket.on('logout', function (msg) {
		let userId = msg.id;
		if (userId) {
			store.users = store.users.filter(x => x.id !== userId);
			socket.broadcast.emit('logout', msg);
			// console.log(msg.name + ' 离开聊天室');
		}
	});
	// 获取消息
	socket.on('message', function (msg) {
		// console.log(msg);
		socket.broadcast.send(msg);
	});
});

server.listen(3000, function () {
	console.log('Listening on http://localhost:%d', server.address().port);
});
