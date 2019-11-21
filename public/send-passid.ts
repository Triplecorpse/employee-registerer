import { socket } from './services/websocket';

const inputEl: HTMLInputElement = document.getElementById('passid') as HTMLInputElement;

function sendPassid(event: Event) {
  event.preventDefault();

  socket.emit('hardware', inputEl.value);
}
