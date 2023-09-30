import express from 'express';
import http from 'http';

const app = express();

app.get('/', async (_, res) => {
  res.send('hello world video-streaming dss');
});

app.get('/video', async (req, res) => {
  const forwardRequest = http.request(
    {
      host: VIDEO_STORAGE_HOST,
      port: VIDEO_STORAGE_PORT,
      path: '/video?id=sample.mp4',
      method: 'GET',
      headers: req.headers,
    },
    (forwardResponse) => {
      res.writeHeader(forwardResponse.statusCode, forwardResponse.headers);
      forwardResponse.pipe(res);
    }
  );

  req.pipe(forwardRequest);
});

export { app };
