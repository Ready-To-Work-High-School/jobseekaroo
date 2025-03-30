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

// Security middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.disable('x-powered-by'); // Remove Express fingerprinting
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Relaxed CSP for development - tighten for production
  res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self' http://localhost:*;");
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
  res.json({ status: 'Server is running', time: new Date() });
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
  const { name, email, message } = req.body;
  console.log('Contact form submission:', { name, email, message });
  
  res.json({ 
    success: true, 
    message: 'Thank you for your message!'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`API available at: http://localhost:${port}/api/status`);
    console.log(`Authentication endpoints at: http://localhost:${port}/api/users/login and /register`);
    console.log(`Posts API at: http://localhost:${port}/api/posts`);
  });
}

module.exports = app; // For testing
