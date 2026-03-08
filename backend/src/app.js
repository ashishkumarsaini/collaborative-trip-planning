const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

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
