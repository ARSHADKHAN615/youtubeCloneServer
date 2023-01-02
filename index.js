import express from 'express';
import dotenv from "dotenv";
import connectDB from './database.js';
import routes from './routes/index.js';
import AuthRoutes from './routes/auth.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

dotenv.config();

// Routes Middleware
app.use('/api/auth', AuthRoutes);
app.use('/api/', routes);


//Error Handling
app.use((err, req, res, next) => {
    const status = err.status ?? 500;
    const message = err.message ?? 'Something went wrong';
    return res.status(status).json({ success: false, status, message });
});

app.listen(3000, () => {
    connectDB();
    console.log('Server is running on port 3000');
});