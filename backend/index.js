import dotenv from 'dotenv';
import { app } from './src/app.js';
import { connectDatabase } from './src/database/index.js';
import { APP_PORT } from './src/libs/secrets.js';

dotenv.config({ path: '.env' });

const intializeApplication = () => {
  connectDatabase().then(() => {
    app.listen(APP_PORT, (error) => {
      if (error) {
        console.log(`🚫 Error in connecting application. PORT:${APP_PORT} `);
      }
      console.log(`✅ App listning. PORT:${APP_PORT}`);
    });
  }).catch(console.error);
};

intializeApplication();
