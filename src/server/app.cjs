
const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./db');
const statusRoutes = require('./routes/status');
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const { rateLimiter } = require('./middleware/rateLimit');
const { sqlInjectionProtection } = require('./middleware/sqlInjectionProtection');
const { apiErrorHandler, api404Handler } = require('./middleware/errorHandler');
const cache = require('memory-cache');

// Initialize the database
initializeDatabase();

const app = express();

// Cache middleware
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    if (req.method !== 'GET') return next();
    
    const key = `__express__${req.originalUrl || req.url}`;
    const cachedBody = cache.get(key);
    
    if (cachedBody) {
      return res.send(cachedBody);
    }
    
    const originalSend = res.send;
    res.send = function(body) {
      if (res.statusCode === 200) {
        cache.put(key, body, duration * 1000);
      }
      originalSend.call(this, body);
      return this;
    };
    
    next();
  };
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use(sqlInjectionProtection);

// Add cache middleware for API routes with 5 minute cache duration
app.use('/api', cacheMiddleware(300));

// API Routes
app.use('/api/status', statusRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

// Error handling middleware
app.use(apiErrorHandler);
app.use('*', api404Handler);

module.exports = app;
