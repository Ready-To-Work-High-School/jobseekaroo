
// Rate limiting middleware (simple implementation)
const rateLimit = {};

const rateLimiter = (req, res, next) => {
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
};

module.exports = {
  rateLimiter
};
