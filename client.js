const socket = io('http://localhost:7000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messagecontainer = document.querySelector(".container")

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.nodeValue;
    append('You: ${message}','right');
    socket.emit('send',message);
    messageInput.value= ''  // after sending message blank space
})

const name = prompt("PLEASE ENTER NAME TO JOIN CONVERSATION:");
socket.emit('NEW-USER-JOINED', name);

socket.on('user-joined', name =>{
    append('${name} has joined the conversation', 'right')
})

socket.on('receive',data=>{
    append('${data.name}: ${data.message}','left');
})

socket.on('left',name=>{
    append('${name} has left the chat', 'left')
})