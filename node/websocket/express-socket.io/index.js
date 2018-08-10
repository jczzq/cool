const express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const path = require('path');

let WS;

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, './index.html'));
});

const store = {
	users: []
};

// 设置静态文件目录
app.use(express.static(path.join(__dirname, '../../../static')));

app.get('/express-eoxket.io/users', function (req, res) {
	res.send(store.users);
});

io.on('connection', function (socket) {
	WS = socket;
	// 进入聊天室
	socket.on('login', function (msg) {
		let { id, name } = msg;
		if (id && !store.users.map(x => x.id).includes(id)) {
			let user = { id, name };
			store.users.push(user);
			// console.log(msg.name + ' 进入聊天室');
		}
		socket.broadcast.emit('login', msg);
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
