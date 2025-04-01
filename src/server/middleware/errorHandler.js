
// Error handling middleware
const apiErrorHandler = (err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({
    error: true,
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
};

const api404Handler = (req, res) => {
  res.status(404).json({
    error: true,
    message: `API endpoint not found: ${req.originalUrl}`
  });
};

module.exports = {
  apiErrorHandler,
  api404Handler
};
