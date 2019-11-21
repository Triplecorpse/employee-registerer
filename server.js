const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('public/index.html', {root: __dirname })
});

server.listen(3000, function () {
  console.log('listening on port 3000');
});
