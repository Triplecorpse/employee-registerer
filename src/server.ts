import express, { Response, Request } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import socketIo from 'socket.io';
import { routes } from './routes';
import { passIdController } from './pass-id-controller';
import {IMessage} from './imessage';

const app = express();
export const server = http.createServer(app);
export const io = socketIo(server);

io.on('connection', (socket) => {
  socket.emit('connection', 'SOCKETS WORK NOW!');
  socket.on('hardware', ({ payload }: IMessage<string>) => {
    passIdController(Buffer.from(payload));
  });
});

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static('./public'));

app.use('/', routes);

server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
  passIdController(Buffer.from('023423423436'));
});
