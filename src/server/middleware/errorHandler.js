
// Error handling middleware
const apiErrorHandler = (err, req, res, next) => {
  console.error('Server error:', err.stack);
  
  // Don't expose error details to client
  if (req.path.startsWith('/api/')) {
    // For API routes, return JSON error with generic message
    res.status(500).json({ 
      error: process.env.NODE_ENV === 'production' 
        ? 'An internal error occurred' 
        : err.message
    });
  } else {
    // For non-API routes, pass to next error handler
    next(err);
  }
};

const api404Handler = (req, res) => {
  res.status(404).json({ 
    error: 'API endpoint not found',
    path: req.originalUrl
  });
};

// Handler for SPA routing - return index.html for non-API routes
const spaHandler = (req, res, next) => {
  if (!req.path.startsWith('/api/') && !req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    // Send the index.html for any non-API, non-asset request
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  } else {
    next();
  }
};

module.exports = {
  apiErrorHandler,
  api404Handler,
  spaHandler
};
