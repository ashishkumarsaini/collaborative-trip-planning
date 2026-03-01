import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
// application
export const APP_PORT = process.env.APP_PORT || 8080;

// mongo
export const MONGODB_URI = process.env.MONGODB_URI || '';

// auth
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';
export const ACCESS_TOKEN_SECRET_EXPIRY = process.env.ACCESS_TOKEN_SECRET_EXPIRY || '';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';
export const REFRESH_TOKEN_SECRET_EXPIRY = process.env.REFRESH_TOKEN_SECRET_EXPIRY || '';
