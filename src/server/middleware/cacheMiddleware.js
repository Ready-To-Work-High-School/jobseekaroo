
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

    const key = `__express__${req.originalUrl || req.url}`;
    const cachedBody = cache.get(key);

    if (cachedBody) {
      // Return cached response
      console.log(`Cache hit for ${key}`);
      return res.send(cachedBody);
    }

    // Override res.send to cache the response before sending
    const originalSend = res.send;
    res.send = function(body) {
      if (res.statusCode === 200) {
        cache.put(key, body, duration * 1000);
        console.log(`Cache set for ${key} with duration ${duration}s`);
      }
      originalSend.call(this, body);
      return this;
    };
    
    next();
  };
};

module.exports = { cacheMiddleware };
