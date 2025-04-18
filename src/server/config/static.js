
const staticOptions = {
  maxAge: '31536000000', // 1 year in milliseconds
  etag: true,
  lastModified: true,
  immutable: true,
  cacheControl: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.webp') || path.endsWith('.avif')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (path.includes('assets') && (path.endsWith('.js') || path.endsWith('.css'))) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
};

module.exports = staticOptions;
