import mongoose from 'mongoose';

export const connectDatabase = async () => {
  const connectDatabase = async () => {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log('✅ Mongoose database connected');
      })
      .catch((error) => {
        throw new Error('❌ Database connection failed', error);
      });
  };

  module.exports = { connectDatabase };
};

