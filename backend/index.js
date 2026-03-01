import dotenv from 'dotenv';
import { app } from './src/app.js';
import { connectDatabase } from './src/database/index.js';

dotenv.config({ path: '.env' });

const port = process.env.APP_PORT || 8080;

const intializeApplication = () => {
  connectDatabase().then(() => {
    app.listen(port, (error) => {
      if (error) {
        console.log(`🚫 Error in connecting application. PORT:${port} `);
      }
      console.log(`✅ App listning. PORT:${port}`);
    });
  }).catch(console.error);
};

intializeApplication();
