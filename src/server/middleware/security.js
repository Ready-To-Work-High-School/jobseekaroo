
// Security middleware

const generateNonce = (req, res, next) => {
  // Generate a random nonce for CSP
  req.nonce = Math.random().toString(36).substring(2);
  next();
};

const setupSecurityHeaders = (req, res, next) => {
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // More headers would be configured here in production
  next();
};

const injectNonceIntoHtml = (req, res, next) => {
  // This would inject the nonce into HTML responses for CSP
  next();
};

const enforceJsonResponse = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
};

module.exports = {
  generateNonce,
  setupSecurityHeaders,
  injectNonceIntoHtml,
  enforceJsonResponse
};
