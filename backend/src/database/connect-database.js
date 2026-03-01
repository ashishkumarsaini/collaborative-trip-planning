import mongoose from 'mongoose';
import { tryCatchWrapper } from '../utils/index.js';

export const connectDatabase = async () => {
    tryCatchWrapper("connectDatabase", async () => {
        const mongooseURL = process.env.MONGODB_URI || '';

        if (!mongooseURL) {
            throw new Error(`🚫 mongodb connection url is invalid. MONGODB_URI:${mongooseURL}`);
        }

        await mongoose.connect(mongooseURL)
            .then(() => {
                console.log(`✅ Mongoose database connected successfully. MONGODB_URI:${mongooseURL}`);
            })
            .catch(() => {
                console.log(`🚫 Error in connecting database. MONGODB_URI:${mongooseURL}`);
            });
    });
};
