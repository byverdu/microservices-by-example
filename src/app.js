import express from 'express';
import fs, { promises } from 'fs';
import path from 'path';

const { stat } = promises;

const app = express();

app.get('/', async (_, res) => {
  res.send('hello world');
});

app.get('/video', async (_, res) => {
  const videoPath = path.resolve('.', 'src/videos/sample.mp4');

  try {
    const fileSize = await stat(videoPath);

    res.writeHead(200, {
      'Content-Length': fileSize.size,
      'Content-Type': 'video/mp4',
    });

    fs.createReadStream(videoPath).pipe(res);
  } catch (e) {
    res.send(String(e));
  }
});

export { app };
