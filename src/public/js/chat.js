const socket = io();

//GET MESSAGES FROM BACKEND
socket.on('getMessages', (posts) => {
    const messagesList = document.querySelector('#messagesList');
    messagesList.innerHTML = '';
    for(const post of posts){
        const { username, message } = post;
        const messageItem = document.createElement('li');
        messageItem.textContent = `${username}: ${message}`;
        messagesList.appendChild(messageItem);
    }
});

const form = document.querySelector('#sendChatForm');
form.onsubmit = (e) => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const message = document.querySelector('#message').value;
    const post = {
        username,
        message,
    }
    socket.emit('addMessage', post);
    form.reset();
}