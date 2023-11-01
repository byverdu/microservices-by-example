import { app } from './app.js';

const { PORT } = process.env;
const envVarsToValidate = [
  'PORT',
  'S3_BUCKET_REGION',
  'S3_BUCKET_NAME',
  'AWS_KEY_ID',
  'AWS_ACCESS_KEY',
];

for (const env of envVarsToValidate) {
  if (!process.env[env]) {
    throw new Error(`No ${env} env has being set, please provide one.`);
  }
}

app.listen(PORT, () => console.log(`video-storage running on port ${PORT}.`));
