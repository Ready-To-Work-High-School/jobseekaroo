
const express = require('express');
const path = require('path');
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
const PORT = process.env.PORT || 5000;

// Cache middleware
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    if (req.method !== 'GET') return next();
    
    const key = `__express__${req.originalUrl || req.url}`;
    const cachedBody = cache.get(key);
    
    if (cachedBody) {
      console.log(`Cache hit for ${key}`);
      return res.send(cachedBody);
    }
    
    const originalSend = res.send;
    res.send = function(body) {
      if (res.statusCode === 200) {
        cache.put(key, body, duration * 1000);
        console.log(`Cache set for ${key} with duration ${duration}s`);
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

// Apply cache middleware with 5-minute duration to API routes
app.use('/api', cacheMiddleware(300));

// API Routes
app.use('/api/status', statusRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  console.log('Serving static files from', path.join(__dirname, '../../dist'));
  app.use(express.static(path.join(__dirname, '../../dist')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/')) {
      res.sendFile(path.join(__dirname, '../../dist/index.html'));
    }
  });
}

// Error handling middleware
app.use(apiErrorHandler);
app.use('*', api404Handler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`API available at: http://localhost:${PORT}/api/status`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`Static files being served from: ${path.join(__dirname, '../../dist')}`);
  }
});

module.exports = app;
