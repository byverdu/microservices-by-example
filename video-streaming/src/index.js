import { app } from './app.js';

const { PORT } = process.env;
const envVarsToValidate = ['PORT', 'VIDEO_STORAGE_HOST', 'VIDEO_STORAGE_PORT'];

for (const env of envVarsToValidate) {
  if (!process.env[env]) {
    throw new Error(`No ${env} env has being set, please provide one.`);
  }
}

app.listen(PORT, () => console.log(`Application running on port ${PORT}.`));
