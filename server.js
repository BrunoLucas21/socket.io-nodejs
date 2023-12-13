var express = require('express');
var http = require('http');
var socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket) {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

var PORT = process.env.PORT || 3001

server.listen(PORT, function() {
    console.log(`🚀 Servidor rodando em: ${PORT}`);
});