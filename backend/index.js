import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors'

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// all routers
app.use('/api/v1/user', userRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at ${PORT}`);
});
