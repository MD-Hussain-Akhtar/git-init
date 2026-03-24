const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('set username', (data) => {
        socket.username = data.username;
    });

    // Text message
    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });

    // Voice message
    socket.on('voice message', (data) => {
        io.emit('voice message', data);
    });

    // Image message
    socket.on('image message', (data) => {
        io.emit('image message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});