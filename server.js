const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = 4000;

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('set username', data => { socket.username = data.username; });

  // Text messages
  socket.on('chat message', data => io.emit('chat message', data));

  // Voice messages (recorded)
  socket.on('voice message', data => io.emit('voice message', data));

  // Image messages
  socket.on('image message', data => io.emit('image message', data));

  // Video call signaling
  socket.on('video-offer', data => socket.broadcast.emit('video-offer', data));
  socket.on('video-answer', data => socket.broadcast.emit('video-answer', data));

  // Voice call signaling
  socket.on('voice-offer', data => socket.broadcast.emit('voice-offer', data));
  socket.on('voice-answer', data => socket.broadcast.emit('voice-answer', data));

  // ICE candidates
  socket.on('ice-candidate', data => socket.broadcast.emit('ice-candidate', data));

  socket.on('disconnect', () => console.log('User disconnected'));
});

http.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));