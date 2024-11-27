import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { rateLimit } from 'express-rate-limit';

const RedisStore = connectRedis(session);
const redis = new Redis(process.env.REDIS_URL);
const prisma = new PrismaClient();

const app = express();

// Rate limiting - 100 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
});

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourapp.com'] 
    : 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(limiter);

// Session configuration
app.use(session({
  store: new RedisStore({ client: redis }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  },
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});