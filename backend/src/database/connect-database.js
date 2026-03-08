import mongoose from 'mongoose';
import { MONGODB_URI } from '../libs/index.js';

export const connectDatabase = async () => {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined or invalid.');
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Mongoose database connected successfully.');
  } catch (error) {
    console.error('🚫 Error connecting to MongoDB:', error);
    throw error;
  }
};

