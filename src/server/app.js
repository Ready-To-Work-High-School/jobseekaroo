
const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./db');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

// Initialize database
initializeDatabase();

// App info
app.locals.appName = "Job Seekers 4 High School";

// Security middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.disable('x-powered-by'); // Remove Express fingerprinting
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Add Content Security Policy to prevent XSS attacks
  res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self' http://localhost:*; script-src 'self'; style-src 'self' 'unsafe-inline';");
  next();
});

// Ensure all responses are JSON, not HTML, for API routes
app.use('/api', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Rate limiting middleware (simple implementation)
const rateLimit = {};
app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  
  if (!rateLimit[ip]) {
    rateLimit[ip] = { count: 1, firstRequest: now };
  } else if (now - rateLimit[ip].firstRequest > 60000) {
    // Reset after 1 minute
    rateLimit[ip] = { count: 1, firstRequest: now };
  } else if (rateLimit[ip].count > 100) {
    // Limit to 100 requests per minute
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  } else {
    rateLimit[ip].count++;
  }
  
  next();
});

// Basic route
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    appName: app.locals.appName,
    time: new Date() 
  });
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Keep the existing secure-data endpoint for backward compatibility
app.get('/api/secure-data', (req, res) => {
  res.json({
    message: 'This is secure data',
    frameworks: [
      { name: 'Express.js', description: 'Fast, unopinionated, minimalist web framework for Node.js' },
      { name: 'Django', description: 'High-level Python web framework with security features' },
      { name: 'Spring', description: 'Java framework with extensive security modules' }
    ]
  });
});

// Keep the existing contact endpoint
app.post('/api/contact', (req, res) => {
  // Sanitize inputs to prevent XSS
  const sanitizeInput = (input) => {
    if (typeof input === 'string') {
      return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    return input;
  };
  
  const name = sanitizeInput(req.body.name || '');
  const email = sanitizeInput(req.body.email || '');
  const message = sanitizeInput(req.body.message || '');
  
  console.log('Contact form submission:', { name, email, message });
  
  res.json({ 
    success: true, 
    message: 'Thank you for your message!'
  });
});

// Catch-all for API 404 errors to return JSON instead of HTML
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Error handling - Make sure API errors return JSON, not HTML
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (req.path.startsWith('/api/')) {
    // For API routes, return JSON error
    res.status(500).json({ error: 'Something went wrong!' });
  } else {
    // For non-API routes, pass to next error handler
    next(err);
  }
});

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
