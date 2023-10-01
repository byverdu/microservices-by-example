import express from 'express';
import { S3 } from '@aws-sdk/client-s3';

const app = express();
const { S3_BUCKET_NAME, AWS_KEY_ID, AWS_ACCESS_KEY } = process.env;
const client = new S3({
  region: 'eu-west-2',
  credentials: {
    accessKeyId: AWS_KEY_ID,
    secretAccessKey: AWS_ACCESS_KEY,
  },
});

app.get('/', async (_, res) => {
  res.send('hello world video-storage');
});

app.get('/video', async (req, res) => {
  const videoName = req.query.id;

  if (!videoName) {
    res.send('No video name provided');

    return;
  }

  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: videoName,
  };

  try {
    const rawData = await client.getObject(params);
    const videoContent = await rawData.Body;

    res.writeHead(200, {
      'Content-Length': rawData.ContentLength,
      'Content-Type': rawData.ContentType,
    });

    videoContent.pipe(res);
  } catch (e) {
    res.send(e);
  }
});

export { app };
