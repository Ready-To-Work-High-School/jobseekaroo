
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeDatabase } = require('./db');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const statusRoutes = require('./routes/status');
const { 
  generateNonce, 
  setupSecurityHeaders, 
  injectNonceIntoHtml, 
  enforceJsonResponse 
} = require('./middleware/security');
const { rateLimiter } = require('./middleware/rateLimit');
const { sqlInjectionProtection } = require('./middleware/sqlInjectionProtection');
const { apiErrorHandler, api404Handler } = require('./middleware/errorHandler');

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

// Initialize database
initializeDatabase();

// App info
app.locals.appName = "Job Seekers 4 High School";

// Security middleware chain
app.use(generateNonce);
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(setupSecurityHeaders);
app.use(injectNonceIntoHtml);
app.disable('x-powered-by'); // Remove Express fingerprinting

// Apply API-specific middleware
app.use('/api', enforceJsonResponse);
app.use(rateLimiter);
app.use(sqlInjectionProtection);

// API routes
app.use('/api', statusRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Serve static files from Vite build in production mode
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the Vite build output (dist folder)
  app.use(express.static(path.join(__dirname, '../../dist')));
  
  // Handle client-side routing - return index.html for all non-API routes
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
}

// Catch-all for API 404 errors to return JSON instead of HTML
app.use('/api/*', api404Handler);

// Error handling middleware
app.use(apiErrorHandler);

// Export app for use in start-server.js
module.exports = app;
