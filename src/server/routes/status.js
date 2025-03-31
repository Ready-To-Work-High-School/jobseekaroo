
const express = require('express');
const router = express.Router();

// Basic status route
router.get('/status', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    appName: req.app.locals.appName,
    time: new Date() 
  });
});

// Secure data endpoint for backward compatibility
router.get('/secure-data', (req, res) => {
  res.json({
    message: 'This is secure data',
    frameworks: [
      { name: 'Express.js', description: 'Fast, unopinionated, minimalist web framework for Node.js' },
      { name: 'Django', description: 'High-level Python web framework with security features' },
      { name: 'Spring', description: 'Java framework with extensive security modules' }
    ]
  });
});

module.exports = router;
