
const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./db.js');
const userRoutes = require('./routes/users.js');
const postRoutes = require('./routes/posts.js');
const statusRoutes = require('./routes/status.js');
const { 
  generateNonce, 
  setupSecurityHeaders, 
  injectNonceIntoHtml, 
  enforceJsonResponse 
} = require('./middleware/security.js');
const { rateLimiter } = require('./middleware/rateLimit.js');
const { sqlInjectionProtection } = require('./middleware/sqlInjectionProtection.js');
const { apiErrorHandler, api404Handler } = require('./middleware/errorHandler.js');
const { cacheMiddleware } = require('./middleware/cacheMiddleware.js');
const path = require('path');

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

// Static file caching - 1 year for images and assets (far future expires)
const staticOptions = {
  maxAge: '31536000000', // 1 year in milliseconds
  etag: true,
  lastModified: true,
  immutable: true,
  cacheControl: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.webp') || path.endsWith('.avif')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (path.includes('assets') && (path.endsWith('.js') || path.endsWith('.css'))) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
};

// Serve static files with caching
if (process.env.NODE_ENV === 'production') {
  app.use('/lovable-uploads', express.static(path.join(__dirname, '../../public/lovable-uploads'), staticOptions));
  app.use('/assets', express.static(path.join(__dirname, '../../dist/assets'), staticOptions));
  app.use(express.static(path.join(__dirname, '../../dist'), {
    maxAge: '86400000' // 24 hours for other static files
  }));
}

// Apply API-specific middleware
app.use('/api', enforceJsonResponse);
app.use(rateLimiter);
app.use(sqlInjectionProtection);

// Add cache middleware for API routes with longer cache duration (30 minutes)
app.use('/api', cacheMiddleware(1800));

// API routes
app.use('/api', statusRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Catch-all for API 404 errors to return JSON instead of HTML
app.use('/api/*', api404Handler);

// Error handling middleware
app.use(apiErrorHandler);

module.exports = app; // For testing
