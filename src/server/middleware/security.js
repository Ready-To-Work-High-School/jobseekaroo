
const crypto = require('crypto');

// Generate a fresh CSP nonce for each request
const generateNonce = (req, res, next) => {
  // Generate a cryptographically secure random nonce
  res.locals.cspNonce = crypto.randomBytes(16).toString('base64');
  next();
};

// Security middleware setup with production-ready configurations
const setupSecurityHeaders = (req, res, next) => {
  // Get the nonce from res.locals
  const nonce = res.locals.cspNonce;
  
  // Base security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Environment-specific CSP settings
  const isProd = process.env.NODE_ENV === 'production';
  
  // Enhanced CSP with nonce
  res.setHeader('Content-Security-Policy', 
    `default-src 'self'; ` +
    `connect-src 'self' ${isProd ? '' : 'http://localhost:* '}https://*.supabase.co https://jobseekaroo.onrender.com; ` + 
    `script-src 'self' 'nonce-${nonce}' ${isProd ? '' : "'unsafe-eval'"}; ` + 
    `style-src 'self' 'unsafe-inline'; ` + 
    `img-src 'self' data:; ` + 
    `object-src 'none'; ` + 
    `base-uri 'self'; ` + 
    `form-action 'self';`
  );
  
  // Production-only headers
  if (isProd) {
    // Enforce HTTPS in production
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    
    // Prevent MIME type sniffing
    res.setHeader('X-Download-Options', 'noopen');
    
    // Prevent being framed by other sites (legacy browsers)
    res.setHeader('X-Frame-Options', 'DENY');
  }
  
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
