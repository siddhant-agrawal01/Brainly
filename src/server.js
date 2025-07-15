// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { connectDB } from './config/db.js';
// import authRoutes from './routes/auth.js';
// import bookmarkRoutes from './routes/bookmark.js';

// dotenv.config();
// await connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/bookmarks', bookmarkRoutes);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
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

// Add a root route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Connect to database only when needed
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

// Export for Vercel
export default handler;