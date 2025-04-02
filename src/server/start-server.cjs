
const express = require('express');
const path = require('path');
const app = require('./app.cjs'); // Update the import to use .cjs extension

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../../dist')));

// For any other request, send the index.html file
app.get('*', (req, res, next) => {
  // Skip for API routes which are already handled by the app
  if (req.path.startsWith('/api/')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`API available at: http://localhost:${PORT}/api/status`);
  console.log(`Static files being served from: ${path.join(__dirname, '../../dist')}`);
});
