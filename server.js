const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Receive username from client
    socket.on('set username', (username) => {
        socket.username = username; // store username for this socket
        console.log(`${username} joined the chat`);
    });

    // Receive chat message from client
    socket.on('chat message', (msg) => {
        // Include username with message
        io.emit('chat message', { user: socket.username, message: msg });
    });

    socket.on('disconnect', () => {
        console.log(`${socket.username || 'A user'} disconnected`);
    });
});

http.listen(3000, () => console.log('Server running on http://localhost:3000'));