import express from 'express';
import morgan from 'morgan';
import { S3 } from '@aws-sdk/client-s3';

const app = express();
const { S3_BUCKET_NAME, AWS_KEY_ID, AWS_ACCESS_KEY, S3_BUCKET_REGION } =
  process.env;
const client = new S3({
  region: S3_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_KEY_ID,
    secretAccessKey: AWS_ACCESS_KEY,
  },
});

app.use(morgan('dev'));

app.get('/', async (_, res) => {
  res.send('hello world video-storage');
});

app.get('/video', async (req, res) => {
  const videoName = req.query.path;

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
