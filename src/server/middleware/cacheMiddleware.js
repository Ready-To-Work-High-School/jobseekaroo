
const cache = require('memory-cache');

/**
 * Express middleware to cache API responses
 * @param {number} duration - Cache duration in seconds
 */
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }
    
    // Skip caching in development if specified
    if (process.env.NODE_ENV !== 'production' && process.env.DISABLE_CACHE === 'true') {
      return next();
    }

    const key = `__express__${req.originalUrl || req.url}`;
    const cachedBody = cache.get(key);

    if (cachedBody) {
      // Add cache header
      res.setHeader('X-Cache', 'HIT');
      
      // Return cached response
      if (process.env.NODE_ENV !== 'production') {
        console.log(`Cache hit for ${key}`);
      }
      return res.send(cachedBody);
    }
    
    // Add cache header
    res.setHeader('X-Cache', 'MISS');

    // Override res.send to cache the response before sending
    const originalSend = res.send;
    res.send = function(body) {
      if (res.statusCode === 200) {
        // Only cache successful responses
        const cacheDuration = duration * 1000;
        cache.put(key, body, cacheDuration);
        
        // Add cache control headers with a long max-age
        res.setHeader('Cache-Control', `public, max-age=${duration}, stale-while-revalidate=86400`);
        res.setHeader('Expires', new Date(Date.now() + duration * 1000).toUTCString());
        
        if (process.env.NODE_ENV !== 'production') {
          console.log(`Cache set for ${key} with duration ${duration}s`);
        }
      }
      originalSend.call(this, body);
      return this;
    };
    
    next();
  };
};

// Clean up expired cache entries periodically (but less frequently)
const cleanupInterval = 86400000; // 24 hours
setInterval(() => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Performing cache cleanup');
  }
  cache.clear();
}, cleanupInterval);

module.exports = { cacheMiddleware };
