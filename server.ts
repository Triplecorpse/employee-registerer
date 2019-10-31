import express, { Response, Request } from 'express';
import http from 'http';

const app =  express();
const server = http.createServer(app);

app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
  res.sendFile('public/index.html', { root: __dirname });
});

server.listen(3000, () => {
  console.log('listening on port 3000');
});
