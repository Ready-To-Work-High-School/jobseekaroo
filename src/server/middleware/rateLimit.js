
// Simple rate limiter middleware
const rateLimiter = (req, res, next) => {
  // Would implement actual rate limiting in production
  next();
};

module.exports = {
  rateLimiter
};
