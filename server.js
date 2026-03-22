const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 3000;

// Serve static files from "public"
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Store username and avatar
    socket.on('set username', (data) => {
        socket.username = data.username;
        socket.avatar = data.avatar;
        console.log(`${socket.username} joined the chat`);
    });

    // Broadcast chat messages
    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log(`${socket.username || 'A user'} disconnected`);
    });
});

http.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});