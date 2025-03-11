import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import pollRoutes from './routes/poll.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/polls', pollRoutes);

// Error handling
app.use(errorHandler);

// Database connection
connectDB();

export default app;