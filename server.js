var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
// var mysql = require('mysql');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// var db = mysql.createConnection({
//     host: 'db',
//     user: 'user',
//     password: 'adm_dev25*',
//     database: 'chatdb'
// });

// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed:', err.stack);
//         return;
//     }
//     console.log('Connected to database');
// });

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket) {
    console.log('Usuário conectado!');

    socket.on('disconnect', function() {
        console.log('Usuário desconectado!');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);

        // Salvando a menssagem no banco de dados
        // db.query('INSERT INTO messages (content) VALUES (?)')
    });
});

var PORT = process.env.PORT || 3001

server.listen(PORT, function() {
    console.log(`🚀 Servidor rodando em: ${PORT}`);
});