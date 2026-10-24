import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';
import categoryRoutes from './src/routes/categories.js';
import menuRoutes from './src/routes/menu.js';
import cakeRoutes from './src/routes/cakes.js';
import contactRoutes from './src/routes/contact.js';
import orderRoutes from './src/routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Middlewares
app.use(cors({
  origin: [CORS_ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Bake n More REST API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/cakes', cakeRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', orderRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    error: 'An internal server error occurred',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 Route Handler
app.use('*', (req, res) => {
  res.status(404).json({ error: `Route not found: ${req.originalUrl}` });
});

app.listen(PORT, () => {
  console.log(`🚀 Bake 'n' More backend server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
