import express from 'express';
import path from 'path';

export const routes = express.Router();

routes.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

routes.get('/add', (req, res) => {
  res.sendFile('add.html', { root: path.join(__dirname, '../public') });
});

routes.get('/view', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

routes.get('/pi', (req, res) => {
  res.sendFile('PI.html', { root: path.join(__dirname, '../public') });
});
