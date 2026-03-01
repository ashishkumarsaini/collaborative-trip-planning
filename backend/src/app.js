import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors());

// routes
app.get('/health-check', (_req, res) => {
    res.status(200).json({
        message: "✅ API IS WORKING"
    });
});

export { app };
