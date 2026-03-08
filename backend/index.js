import dotenv from 'dotenv';
import app from './src/app.js';
import { connectDatabase } from './src/database/index.js';
import { APP_PORT } from './src/libs/secrets.js';

dotenv.config({ path: '.env' });

const initializeApplication = () => {
  connectDatabase()
    .then(() => {
      app.listen(APP_PORT, (error) => {
        if (error) {
          console.error('❌ Failed to start application. Error: ', error);
        }

        console.log(
          `✅ Express app listening at http://localhost:${APP_PORT} `
        );
      });
    })
    .catch((error) => {
      console.error('❌ Failed to start application. Error: ', error);
      process.exit(1);
    });
};

initializeApplication();
