import express from 'express';
import http from 'http';
import mongodb from 'mongodb';
import morgan from 'morgan';

const startUp = async () => {
  const { VIDEO_STORAGE_HOST, VIDEO_STORAGE_PORT, DB_NAME, DB_HOST } =
    process.env;
  const client = await mongodb.MongoClient.connect(DB_HOST);
  const db = client.db(DB_NAME);
  const videosCollection = db.collection('videos');
  const app = express();

  app.use(morgan('dev'));

  app.get('/', async (_, res) => {
    res.send('hello world video-streaming ;s');
  });

  app.get('/video', async (req, res) => {
    const videoId = new mongodb.ObjectId(req.query.id);
    const videoRecord = await videosCollection.findOne({ _id: videoId });

    if (!videoRecord) {
      res.sendStatus(404);
      return;
    }

    console.log(`Translated id ${videoId} to path ${videoRecord.videoPath}.`);

    const forwardRequest = http.request(
      {
        host: VIDEO_STORAGE_HOST,
        port: VIDEO_STORAGE_PORT,
        path: `/video?path=${videoRecord.videoPath}`,
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

  return app;
};

export { startUp };
