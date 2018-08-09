const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const app = express();
const path = require('path');

let WS;
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/send/message', function(req, res) {
    console.log('请求', req.data);
    if (WS) WS.send(JSON.stringify(req.query));
    res.send(req.query || {});
});

const server = http.createServer(app);
const ws = new WebSocket.Server({ server });

ws.on('connection', function(ws, req) {
    WS = ws;
    WS.on('message', function(message) {
        console.log(message);
        WS.send(`接收消息成功：${message}`);
    });
});

server.listen(3000, function() {
    console.log('Listening on http://localhost:%d', server.address().port);
});