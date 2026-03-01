import mongoose from 'mongoose';
import { MONGODB_URI } from '../libs';

export const connectDatabase = async () => {
    try {
        if (!MONGODB_URI) {
            throw new Error(`Mongodb connection url is invalid.`);
        }

        await mongoose.connect(MONGODB_URI)
            .then(() => {
                console.log(
                    `✅ Mongoose database connected successfully.`
                );
            })
            .catch(() => {
                console.log(`🚫 Error in connecting database.`);
            });
    } catch (error) {
        console.log(`🚫 Error in connecting database. Error: ${error}`);
    }
};
