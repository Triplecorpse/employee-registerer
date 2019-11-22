import { socket } from './services/websocket';
import { Message } from '../models/Message';
import { IMessage } from '../interfaces/IMesage';
import { IPassid } from '../interfaces/IPassid';
import { IMessageResponse } from '../interfaces/IMessageResponse';

const formEl = document.getElementById('send-passid-form') as HTMLFormElement;
const inputEl = document.getElementById('passid') as HTMLInputElement;

formEl.addEventListener('submit', (event: Event) => {
  const message = new Message<IPassid>('hardware', { passid: inputEl.value });
  event.preventDefault();

  socket.emit(
    message.type,
    message,
    (response: IMessage<IMessageResponse>) => {
      if (response.payload.success) {
        inputEl.value = '';
      }
    },
  );
});
