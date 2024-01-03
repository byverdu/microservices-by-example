import { startUp } from './app.js';

const { PORT } = process.env;
const envVarsToValidate = ['RABBIT', 'DB_HOST', 'DB_NAME'];

for (const env of envVarsToValidate) {
  if (!process.env[env]) {
    throw new Error(`No ${env} env has being set, please provide one.`);
  }
}

startUp()
  .then((app) =>
    app.listen(PORT, () =>
      console.log(`video-history running on port ${PORT}.`)
    )
  )
  .catch((error) =>
    console.error(`video-history service failed with ${String(error)}`)
  );
