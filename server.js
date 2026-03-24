const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 4000;

// Serve static files from public folder
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('set username', (data) => {
        socket.username = data.username;
    });

    // Text message
    socket.on('chat message', (data) => io.emit('chat message', data));

    // Voice message
    socket.on('voice message', (data) => io.emit('voice message', data));

    // Image message
    socket.on('image message', (data) => io.emit('image message', data));

    // Video call signaling
    socket.on('video-offer', data => socket.broadcast.emit('video-offer', data));
    socket.on('video-answer', data => socket.broadcast.emit('video-answer', data));
    socket.on('ice-candidate', data => socket.broadcast.emit('ice-candidate', data));

    socket.on('disconnect', () => console.log('User disconnected'));
});

http.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));