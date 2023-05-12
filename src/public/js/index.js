const socket = io();
socket.emit('message', 'Hello World!');
socket.on('event', (data) => {
    console.log(data);
});