// IRIS X Studio - Backend API Server
// Lead Backend Engineer: Mohammad Irfan (API Layer)
// Architecture: Express.js (Crash-Resilient Enterprise Architecture)

const express = require('express');
const cors = require('cors');
const promptRoutes = require('./routes/promptRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// =========================================================================
// CRASH-PROOF ARCHITECTURE GUARDS
// Prevents node server from crashing on unhandled async or sync errors
// =========================================================================
process.on('uncaughtException', (err) => {
  console.error('[CRASH-GUARD] Uncaught Exception caught (Server Kept Alive):', err.message || err);
});

process.on('unhandledRejection', (reason) => {
  console.error('[CRASH-GUARD] Unhandled Promise Rejection (Server Kept Alive):', reason?.message || reason);
});

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log('[API]', new Date().toLocaleTimeString(), '-', req.method, req.originalUrl);
  next();
});

// Health Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'IRIS X Studio API is running smoothly',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    team: {
      role: 'Backend - API Layer',
      owner: 'Mohammad Irfan',
      project: 'IRIS X Studio',
      eta: '12 October 2026'
    }
  });
});

// Mount Feature Routes
app.use('/api/prompts', promptRoutes);
app.use('/api/admin/prompts', adminRoutes);

// 404 and Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log('====================================================');
    console.log('IRIS X Studio API running on http://localhost:' + PORT);
    console.log('Public Prompts API: http://localhost:' + PORT + '/api/prompts');
    console.log('Admin Prompts API:  http://localhost:' + PORT + '/api/admin/prompts');
    console.log('Health Status:      http://localhost:' + PORT + '/api/health');
    console.log('====================================================');
  });
}

module.exports = app;
