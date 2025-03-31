
// Simple script to start the Express server
const express = require('express');
const path = require('path');
const app = require('./app');
const port = process.env.PORT || 8080;

// Set NODE_ENV to production if not set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

// Serve static files from the Vite build output (dist folder) if in production mode
if (process.env.NODE_ENV === 'production') {
  // The path needs to be relative to where this file is located
  const distPath = path.join(__dirname, '../../dist');
  console.log('Serving static files from:', distPath);
  app.use(express.static(distPath));
  
  // Handle client-side routing - return index.html for all non-API routes
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`${app.locals.appName} server running on port ${port} in ${process.env.NODE_ENV} mode`);
  console.log(`API available at: http://localhost:${port}/api/status`);
  
  if (process.env.NODE_ENV === 'production') {
    console.log(`Serving frontend from static build files`);
  } else {
    console.log(`Authentication endpoints at: http://localhost:${port}/api/users/login and /register`);
    console.log(`Posts API at: http://localhost:${port}/api/posts`);
  }
});
