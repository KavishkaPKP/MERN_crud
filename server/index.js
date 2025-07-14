import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db.js';

import userRoutes from './routes/user_routes.js';

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use("/", userRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    const now = new Date();
    const formattedTime = now.toLocaleString(); 
    console.log(`Server running on port ${PORT}`);
    console.log(`Last refreshed at: ${formattedTime}`);
});