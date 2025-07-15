
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import bookmarkRoutes from './routes/bookmark.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

let dbConnected = false;

const handler = async (req, res) => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return res.status(500).json({ error: 'Database connection failed' });
    }
  }
  
  return app(req, res);
};

export default handler;