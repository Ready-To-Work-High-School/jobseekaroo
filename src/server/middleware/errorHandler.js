
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

module.exports = {
  apiErrorHandler,
  api404Handler
};
