
const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./db.cjs');
const userRoutes = require('./routes/users.cjs');
const postRoutes = require('./routes/posts.cjs');
const statusRoutes = require('./routes/status.cjs');
const { 
  generateNonce, 
  setupSecurityHeaders, 
  injectNonceIntoHtml, 
  enforceJsonResponse 
} = require('./middleware/security.cjs');
const { rateLimiter } = require('./middleware/rateLimit.cjs');
const { sqlInjectionProtection } = require('./middleware/sqlInjectionProtection.cjs');
const { apiErrorHandler, api404Handler } = require('./middleware/errorHandler.cjs');

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

// Start server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`${app.locals.appName} server running on port ${port}`);
    console.log(`API available at: http://localhost:${port}/api/status`);
    console.log(`Authentication endpoints at: http://localhost:${port}/api/users/login and /register`);
    console.log(`Posts API at: http://localhost:${port}/api/posts`);
  });
}

module.exports = app; // For testing
