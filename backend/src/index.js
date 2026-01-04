import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';
import { startBirthdayJob } from './services/birthdayJob.js';

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: process.env.FRONTEND_URL || true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static assets
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/flyers', express.static(path.join(__dirname, '..', 'flyers')));

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  startBirthdayJob();
});
