
const express = require('express');
const path = require('path');
const app = require('./app');
const port = process.env.PORT || 5000;

// Serve static files from the React app build directory
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../../dist');
  app.use(express.static(distPath));
  
  // Handle client-side routing
  app.get('*', (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`${app.locals.appName} server running on port ${port}`);
  console.log(`API available at: http://localhost:${port}/api/status`);
  console.log(`Authentication endpoints at: http://localhost:${port}/api/users/login and /register`);
  console.log(`Posts API at: http://localhost:${port}/api/posts`);
});
