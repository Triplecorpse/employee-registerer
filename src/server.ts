import express, { Response, Request } from 'express';
import http from 'http';
import { routes } from './routes';

const app = express();
export const server = http.createServer(app);

app.use(express.static('./public'));
app.use('/', routes);

server.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
