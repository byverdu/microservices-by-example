import express from 'express';

const app = express();

app.get('/', async (_, res) => {
  res.send('hello world');
});

export { app };
