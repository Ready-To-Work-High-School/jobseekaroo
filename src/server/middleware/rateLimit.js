
// In-memory rate limiting store (would use Redis in a distributed environment)
const rateLimit = {};

// Rate limiting middleware with production configurations
const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  
  // Skip rate limiting in development if specified
  if (process.env.NODE_ENV !== 'production' && process.env.SKIP_RATE_LIMIT === 'true') {
    return next();
  }
  
  if (!rateLimit[ip]) {
    rateLimit[ip] = { count: 1, firstRequest: now };
  } else if (now - rateLimit[ip].firstRequest > 60000) {
    // Reset after 1 minute
    rateLimit[ip] = { count: 1, firstRequest: now };
  } else if (rateLimit[ip].count > 100) {
    // Limit to 100 requests per minute
    console.warn(`Rate limit exceeded for IP: ${ip}`);
    return res.status(429).json({ 
      error: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((rateLimit[ip].firstRequest + 60000 - now) / 1000)
    });
  } else {
    rateLimit[ip].count++;
  }
  
  // Add rate limit headers
  res.setHeader('X-RateLimit-Limit', '100');
  res.setHeader('X-RateLimit-Remaining', 100 - (rateLimit[ip]?.count || 0));
  res.setHeader('X-RateLimit-Reset', Math.ceil((rateLimit[ip]?.firstRequest + 60000) / 1000));
  
  next();
};

// Clean up old rate limit entries every hour
setInterval(() => {
  const now = Date.now();
  Object.keys(rateLimit).forEach(ip => {
    if (now - rateLimit[ip].firstRequest > 3600000) { // 1 hour
      delete rateLimit[ip];
    }
  });
}, 3600000); // Run every hour

module.exports = {
  rateLimiter
};
