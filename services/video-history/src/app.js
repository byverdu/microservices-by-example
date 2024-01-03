import express from 'express';
import morgan from 'morgan';
import amqp from 'amqplib';

async function startUp() {
  const app = express();
  const { RABBIT } = process.env;
  const messagingConnection = await amqp.connect(RABBIT);
  const messageChannel = await messagingConnection.createChannel();

  app.use(morgan('dev'));

  app.get('/', async (_, res) => {
    res.send('hello world video-history');
  });

  // express get endpoint for /video-history path

  app.get('/video-history', (req, res) => {
    const id = req.params.id;
  });

  return app;
}

export { startUp };
