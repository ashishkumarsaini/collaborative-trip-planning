import mongoose from 'mongoose';

let isConnected = false;

export const connectDatabase = async () => {
  if (isConnected) {
    console.log('✅ Mongoose database already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
    isConnected = true;
    console.log('✅ Mongoose database connected');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};
