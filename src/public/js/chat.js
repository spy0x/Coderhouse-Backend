const socket = io();

//GET MESSAGES FROM BACKEND
socket.on('getMessages', (posts) => {
    const messagesList = document.querySelector('#messagesList');
    messagesList.innerHTML = '';
    for(const post of posts){
        const { username, message } = post;
        const messageItem = document.createElement('li');
        const usernameSpan = document.createElement('span');
        const messageSpan = document.createElement('span');
        usernameSpan.textContent = `${username}: `;
        messageSpan.textContent = message;
        usernameSpan.classList.add('text-gray-700', 'text-xl', 'font-bold');
        messageSpan.classList.add('text-gray-700', 'text-xl');
        messageItem.appendChild(usernameSpan);
        messageItem.appendChild(messageSpan);
        messagesList.appendChild(messageItem);
    }
});

const form = document.querySelector('#sendChatForm');
form.onsubmit = (e) => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const message = document.querySelector('#message');
    const post = {
        username,
        message: message.value,
    }
    socket.emit('addMessage', post);
    message.value = '';
}