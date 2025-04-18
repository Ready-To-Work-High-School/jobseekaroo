
const cache = require('memory-cache');
const crypto = require('crypto');

/**
 * Generate secure cache key from request
 * @param {Request} req - Express request object
 * @returns {string} Secure cache key
 */
const generateCacheKey = (req) => {
  // Combine URL and relevant headers for cache key
  const data = `${req.originalUrl || req.url}|${req.get('accept')}|${req.get('accept-encoding')}`;
  return crypto
    .createHash('sha256')
    .update(data)
    .digest('hex');
};

/**
 * Express middleware to cache API responses with security measures
 * @param {number} duration - Cache duration in seconds
 */
const cacheMiddleware = (duration) => {
  if (!Number.isInteger(duration) || duration < 0) {
    throw new Error('Cache duration must be a positive integer');
  }

  return (req, res, next) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }
    
    // Skip caching in development if specified
    if (process.env.NODE_ENV !== 'production' && process.env.DISABLE_CACHE === 'true') {
      return next();
    }

    // Skip caching for authenticated requests
    if (req.headers.authorization) {
      return next();
    }

    const key = generateCacheKey(req);
    const cachedBody = cache.get(key);

    if (cachedBody) {
      // Add security headers
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Cache-Control', 'private, no-store');
      
      if (process.env.NODE_ENV !== 'production') {
        console.log(`Cache hit for ${key}`);
      }
      return res.send(cachedBody);
    }
    
    res.setHeader('X-Cache', 'MISS');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Override res.send to cache the response before sending
    const originalSend = res.send;
    res.send = function(body) {
      if (res.statusCode === 200) {
        // Only cache successful responses
        try {
          const cacheDuration = duration * 1000;
          cache.put(key, body, cacheDuration);
          
          // Add cache control headers
          res.setHeader('Cache-Control', `private, max-age=${duration}, no-store`);
          res.setHeader('Expires', new Date(Date.now() + duration * 1000).toUTCString());
          
          if (process.env.NODE_ENV !== 'production') {
            console.log(`Cache set for ${key} with duration ${duration}s`);
          }
        } catch (error) {
          console.error('Cache storage error:', error);
          // Continue without caching on error
        }
      }
      originalSend.call(this, body);
      return this;
    };
    
    next();
  };
};

// Clean up expired cache entries periodically
const cleanupInterval = 86400000; // 24 hours
setInterval(() => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Performing cache cleanup');
    }
    cache.clear();
  } catch (error) {
    console.error('Cache cleanup error:', error);
  }
}, cleanupInterval);

module.exports = { cacheMiddleware };
