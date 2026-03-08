import dotenv from 'dotenv';
import { app } from './src/app.js';
import { connectDatabase } from './src/database/index.js';
import { APP_PORT } from './src/libs/secrets.js';

dotenv.config({ path: '.env' });

const startServer = () => {
  app.listen(APP_PORT, (error) => {
    if (error) {
      console.error(`🚫 Error starting application. PORT: ${APP_PORT}`, error);
      return;
    }
    console.log(`✅ App listening. PORT: ${APP_PORT}`);
  });
};

const initializeApplication = async () => {
  try {
    await connectDatabase();
    startServer();
  } catch (error) {
    console.error('🚫 Failed to start application because database connection failed.', error);
    process.exit(1);
  }
};

initializeApplication();
