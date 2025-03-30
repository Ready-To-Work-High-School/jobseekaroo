
const express = require('express');
const path = require('path');

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

// Security middleware
app.use(express.json());
app.disable('x-powered-by'); // Remove Express fingerprinting
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

// Basic route
app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running', time: new Date() });
});

// Protected API routes
app.get('/api/secure-data', (req, res) => {
  // Example of protected data - in a real app you'd add authentication middleware
  res.json({
    message: 'This is secure data',
    frameworks: [
      { name: 'Express.js', description: 'Fast, unopinionated, minimalist web framework for Node.js' },
      { name: 'Django', description: 'High-level Python web framework with security features' },
      { name: 'Spring', description: 'Java framework with extensive security modules' }
    ]
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
  });
}

module.exports = app; // For testing
