
const staticOptions = {
  maxAge: '31536000000', // 1 year in milliseconds
  etag: true,
  lastModified: true,
  immutable: true,
  cacheControl: true,
  setHeaders: (res, path) => {
    // Set far-future expires for static assets
    const farFutureDate = new Date(Date.now() + 31536000000).toUTCString();
    
    if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.webp') || path.endsWith('.avif')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('Expires', farFutureDate);
    } else if (path.includes('assets') && (path.endsWith('.js') || path.endsWith('.css'))) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('Expires', farFutureDate);
    } else {
      // For other static files, use a shorter cache duration (24 hours)
      const tomorrow = new Date(Date.now() + 86400000).toUTCString();
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('Expires', tomorrow);
    }
    
    // Add Vary header for proper caching with compression
    res.setHeader('Vary', 'Accept-Encoding');
  }
};

module.exports = staticOptions;
