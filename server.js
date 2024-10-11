const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Serve static files (like your frontend) from the 'public' folder
app.use(express.static('public'));

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('updatePoints', (data) => {
        // Broadcast the updated points to all connected clients
        io.emit('pointsUpdated', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
