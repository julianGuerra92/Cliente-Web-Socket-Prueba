import './style.css'
import { connectToServer } from './socket-client';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>

    <h1>Websocket -Client</h1>

    <input id="user-id" placeholder="User ID">
    <button id="btn-connect">Connect</button>
    <br>
    <span id="server-status">offline</span>

    <br>
    <br>

    <input id="chat-id" placeholder="Chat ID">
    <button id="btn-chat-connect">Connect</button>
    <br>
    <span id="chat-connection-status">Sin conexión a Chat</span>

    <br>
    <br>

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input"/>
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>

  </div>
`

const userId = document.querySelector<HTMLInputElement>('#user-id')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
  if (userId.value.trim().length <= 0) return alert('Enter a valid UserId');
  connectToServer(userId.value.trim());
})


