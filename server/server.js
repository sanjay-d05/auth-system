import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';

import { connectDB } from "./config/db.js";
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT;
const CLIENT_URI = process.env.CLIENT_URI;

// List of allowed origins (one from env, others hardcoded)
const allowedOrigins = [
  CLIENT_URI,
  process.env.CLIENT_URI,
  "https://auth-system-client-749y.onrender.com"
];

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.get('/', async (req, res) => {
  return res.json('Server is running');
});

app.use('/api/auth', authRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Server not running', err);
  });
