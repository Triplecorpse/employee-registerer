import { socket } from './services/websocket';

const formEl = document.getElementById('send-passid-form') as HTMLFormElement;
const inputEl = document.getElementById('passid') as HTMLInputElement;

formEl.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  socket.emit('hardware', {inputEl.value});
});
