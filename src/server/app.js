
const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./db');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const crypto = require('crypto');

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

// Initialize database
initializeDatabase();

// App info
app.locals.appName = "Job Seekers 4 High School";

// Generate a fresh CSP nonce for each request
app.use((req, res, next) => {
  // Generate a cryptographically secure random nonce
  res.locals.cspNonce = crypto.randomBytes(16).toString('base64');
  next();
});

// Security middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.disable('x-powered-by'); // Remove Express fingerprinting
app.use((req, res, next) => {
  // Get the nonce from res.locals
  const nonce = res.locals.cspNonce;
  
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Enhanced CSP with nonce
  res.setHeader('Content-Security-Policy', 
    `default-src 'self'; ` +
    `connect-src 'self' http://localhost:*; ` + 
    `script-src 'self' 'nonce-${nonce}'; ` + 
    `style-src 'self' 'unsafe-inline'; ` + 
    `img-src 'self' data:; ` + 
    `object-src 'none'; ` + 
    `base-uri 'self'; ` + 
    `form-action 'self';`
  );
  next();
});

// Add nonce to every rendered page
app.use((req, res, next) => {
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
});

// Ensure all responses are JSON, not HTML, for API routes
app.use('/api', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Rate limiting middleware (simple implementation)
const rateLimit = {};
app.use((req, res, next) => {
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
});

// SQL injection protection middleware
app.use((req, res, next) => {
  // Check for common SQL injection patterns
  const checkSqlInjection = (obj) => {
    if (!obj) return false;
    
    const sqlPatterns = [
      /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
      /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
      /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
      /((\%27)|(\'))union/i,
      /exec(\s|\+)+(s|x)p\w+/i,
      /UNION\s+ALL\s+SELECT/i
    ];
    
    const checkValue = (val) => {
      if (typeof val === 'string') {
        return sqlPatterns.some(pattern => pattern.test(val));
      }
      if (val !== null && typeof val === 'object') {
        return Object.values(val).some(checkValue);
      }
      return false;
    };
    
    return checkValue(obj);
  };
  
  // Check both query string and body
  if (checkSqlInjection(req.query) || checkSqlInjection(req.body)) {
    console.warn('Potential SQL injection attempt:', { 
      ip: req.ip, 
      path: req.path,
      query: req.query,
      body: req.body
    });
    
    // Return a generic error without details
    return res.status(400).json({ error: 'Invalid input format' });
  }
  
  next();
});

// Basic route
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    appName: app.locals.appName,
    time: new Date() 
  });
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Keep the existing secure-data endpoint for backward compatibility
app.get('/api/secure-data', (req, res) => {
  res.json({
    message: 'This is secure data',
    frameworks: [
      { name: 'Express.js', description: 'Fast, unopinionated, minimalist web framework for Node.js' },
      { name: 'Django', description: 'High-level Python web framework with security features' },
      { name: 'Spring', description: 'Java framework with extensive security modules' }
    ]
  });
});

// Enhanced contact endpoint with more robust sanitization
app.post('/api/contact', (req, res) => {
  try {
    // More comprehensive sanitization function
    const sanitizeInput = (input) => {
      if (typeof input === 'string') {
        return input
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/\(/g, '&#40;')
          .replace(/\)/g, '&#41;')
          .replace(/=/g, '&#61;');
      } else if (Array.isArray(input)) {
        return input.map(item => sanitizeInput(item));
      } else if (input !== null && typeof input === 'object') {
        const sanitized = {};
        for (const key in input) {
          if (Object.prototype.hasOwnProperty.call(input, key)) {
            sanitized[key] = sanitizeInput(input[key]);
          }
        }
        return sanitized;
      }
      return input;
    };
    
    // Sanitize all inputs
    const sanitizedBody = sanitizeInput(req.body);
    const name = sanitizedBody.name || '';
    const email = sanitizedBody.email || '';
    const message = sanitizedBody.message || '';
    
    console.log('Contact form submission:', { name, email, message });
    
    res.json({ 
      success: true, 
      message: 'Thank you for your message!'
    });
  } catch (error) {
    // Generic error message - don't expose internals
    console.error('Contact form error:', error);
    res.status(400).json({
      success: false,
      message: 'Invalid request format'
    });
  }
});

// Catch-all for API 404 errors to return JSON instead of HTML
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Error handling - Make sure API errors return JSON, not HTML
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  
  // Don't expose error details to client
  if (req.path.startsWith('/api/')) {
    // For API routes, return JSON error with generic message
    res.status(500).json({ error: 'An internal error occurred' });
  } else {
    // For non-API routes, pass to next error handler
    next(err);
  }
});

// Start server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`${app.locals.appName} server running on port ${port}`);
    console.log(`API available at: http://localhost:${port}/api/status`);
    console.log(`Authentication endpoints at: http://localhost:${port}/api/users/login and /register`);
    console.log(`Posts API at: http://localhost:${port}/api/posts`);
  });
}

module.exports = app; // For testing
