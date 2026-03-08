import mongoose from 'mongoose';

let isConnected = false;

export const connectDatabase = async () => {
  if (isConnected) {
    console.log('✅ Mongoose database already connected');
    return;
  }

  console.log('🔄 Attempting to connect to database...');
  console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);

  try {
    const options = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    isConnected = true;
    console.log('✅ Mongoose database connected');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};
