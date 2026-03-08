import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDatabase } from './database/index.js';
import {
    authRouter,
    locationRouter,
    activityRouter,
    tripRouter
} from './routes/index.js';

const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(
    cors({
        origin: 'https://www.wanderscape.in', // your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    })
);
app.options('*', cors());

// Ensure database connection
app.use(async (req, res, next) => {
    try {
        await connectDatabase();
        next();
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ message: 'Database connection failed' });
    }
});

// routes
app.use('/api/auth', authRouter);
app.use('/api/location', locationRouter);
app.use('/api/activity', activityRouter);
app.use('/api/trip', tripRouter);
app.get('/api/health-check', (_req, res) => {
    res.status(200).json({
        message: '✅ API IS WORKING'
    });
});

export default app;
