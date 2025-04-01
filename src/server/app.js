
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

// Catch-all for API 404 errors to return JSON instead of HTML
app.use('/api/*', api404Handler);

// Error handling middleware
app.use(apiErrorHandler);

module.exports = app; // For testing
