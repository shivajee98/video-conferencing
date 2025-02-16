// 📌 Import Modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middleware/error.middleware.js';
import authRoutes from './routes/auth.router.js';

// 📌 Load Environment Variables
dotenv.config();

// 📌 Initialize Express App
const app = express();

// 📌 Middleware
app.use(cors());
app.use(express.json());

// 📌 Connect to MongoDB
connectDB();

// 📌 Routes
app.use('/api/auth', authRoutes);

// 📌 Error Handling Middleware
app.use(errorHandler);

// 📌 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

