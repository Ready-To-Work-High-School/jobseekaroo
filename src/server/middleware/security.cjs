
const crypto = require('crypto');

// Generate a fresh CSP nonce for each request
const generateNonce = (req, res, next) => {
  // Generate a cryptographically secure random nonce
  res.locals.cspNonce = crypto.randomBytes(16).toString('base64');
  next();
};

// Security middleware setup 
const setupSecurityHeaders = (req, res, next) => {
  // Get the nonce from res.locals
  const nonce = res.locals.cspNonce;
  
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Enhanced CSP with nonce
  res.setHeader('Content-Security-Policy', 
    `default-src 'self'; ` +
    `connect-src 'self' http://localhost:* https://*.supabase.co; ` + 
    `script-src 'self' 'nonce-${nonce}'; ` + 
    `style-src 'self' 'unsafe-inline'; ` + 
    `img-src 'self' data:; ` + 
    `object-src 'none'; ` + 
    `base-uri 'self'; ` + 
    `form-action 'self';`
  );
  next();
};

// Process HTML responses to insert CSP nonce
const injectNonceIntoHtml = (req, res, next) => {
  const oldSend = res.send;
  res.send = function(html) {
    // Only process HTML responses
    if (typeof html === 'string' && html.includes('<html')) {
      // Replace CSP nonce placeholder with actual nonce
      html = html.replace(/__CSP_NONCE__/g, res.locals.cspNonce);
    }
    oldSend.apply(res, arguments);
  };
  next();
};

// Ensure all responses are JSON, not HTML, for API routes
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
