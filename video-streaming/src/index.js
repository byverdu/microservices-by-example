import 'dotenv/config.js';

import { app } from './app.js';

if (!process.env.PORT) {
  throw new Error('No PORT env has being set, please provide one');
}

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Application running on port ${PORT}`));
