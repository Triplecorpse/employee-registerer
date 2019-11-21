import socketIo from 'socket.io';
import { server } from './server';

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log(`${socket} connected to server`);
  socket.emit('test', 'done');
});
