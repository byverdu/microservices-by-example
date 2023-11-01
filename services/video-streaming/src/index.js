import { startUp } from './app.js';

const { PORT } = process.env;
const envVarsToValidate = [
  'PORT',
  'VIDEO_STORAGE_HOST',
  'VIDEO_STORAGE_PORT',
  'DB_HOST',
  'DB_NAME',
];

for (const env of envVarsToValidate) {
  if (!process.env[env]) {
    throw new Error(`No ${env} env has being set, please provide one.`);
  }
}

startUp()
  .then((app) => {
    app.listen(PORT, () =>
      console.log(`video-streaming running on port ${PORT}.`)
    );
  })
  .catch((err) => {
    console.error('Microservice failed to start.');
    console.error((err && err.stack) || err);
  });
