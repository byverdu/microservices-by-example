import { app } from './app.js';

const { PORT, VIDEO_STORAGE_HOST, VIDEO_STORAGE_PORT } = process.env;

for (const env of Object.keys({ PORT, S3_BUCKET_REGION, S3_BUCKET_NAME })) {
  if (!process.env[env]) {
    throw new Error(`No ${env} env has being set, please provide one.`);
  }
}

app.listen(PORT, () => console.log(`Application running on port ${PORT}.`));
