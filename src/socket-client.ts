import { Manager, Socket } from 'socket.io-client';

let socket: Socket;

export const connectToServer = (userId: string) => {

    const manager = new Manager('http://localhost:8080', {
        query: {
            userId: userId
        }
    });
    socket?.removeAllListeners(); //Método para borrar los listernes y limpiar los sockets
    socket = manager.socket('/');
    addListeners();

}

const addListeners = () => {

    const btnChatConnect = document.querySelector<HTMLButtonElement>('#btn-chat-connect')!;
    const clielUl = document.querySelector('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')
    const chatConnectionStatus = document.querySelector('#chat-connection-status')!;
    const serverStatusLabel = document.querySelector('#server-status')!;

    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'Connected!';
    });

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'Disconnected!';
    });

    btnChatConnect.addEventListener('click', () => {
        socket.emit('chat-disconnection')
        const chatId = document.querySelector<HTMLInputElement>('#chat-id')!;
        if (chatId.value.trim().length <= 0) return alert('Enter a valid ChatId');
        socket.emit('chat-connection', {
            chatId: chatId.value.trim()
        });
        chatConnectionStatus.innerHTML = 'Conectado a Chat';
    });

    socket.on('chat-connection', (payload: any) => {
        console.log(payload)
    });


    socket.on('clients-update', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach(clientId => {
            clientsHtml += `
                <li>${clientId}</li>
            `
        })
        clielUl.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (messageInput.value.trim().length <= 0) return;
        socket.emit('chat-message', {
            message: messageInput.value
        })
        messageInput.value = '';
    })

    socket.on('chat-message', (payload: any) => {
        console.log(payload);
        const newMessage = `
        <li>
            <strong>${payload.data.userId}: </strong>
            <span>${payload.data.message}</span>
        </li>
        `
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl?.append(li);
    })

}