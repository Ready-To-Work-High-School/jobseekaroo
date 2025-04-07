
const express = require('express');
const path = require('path');
const cors = require('cors');
const { initializeDatabase } = require('./db');
const statusRoutes = require('./routes/status');
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const chatRoutes = require('./routes/chat');
const { rateLimiter } = require('./middleware/rateLimit');
const { sqlInjectionProtection } = require('./middleware/sqlInjectionProtection');
const { apiErrorHandler, api404Handler } = require('./middleware/errorHandler');
const { generateNonce, setupSecurityHeaders, injectNonceIntoHtml } = require('./middleware/security');
const { cacheMiddleware } = require('./middleware/cacheMiddleware');

// Initialize the database
initializeDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced handler for school-branded subdomains
app.use((req, res, next) => {
  const host = req.hostname;
  
  // Check if the request is coming from a school subdomain
  // Format: school.jobseekaroo.com, school.jobseekers4hs.org, or school.jobseeker4hs.org (without 's')
  const schoolSubdomainRegex = /^([^.]+)\.(jobseekaroo\.com|jobseekers4hs\.org|jobseeker4hs\.org)$/;
  const schoolSubdomainMatch = host.match(schoolSubdomainRegex);
  
  if (schoolSubdomainMatch) {
    // Extract school name from subdomain
    req.schoolName = schoolSubdomainMatch[1];
    console.log(`School subdomain detected: ${req.schoolName}`);
    // Set a flag to indicate this is a school-branded request
    req.isSchoolBranded = true;
  } else {
    req.isSchoolBranded = false;
  }
  next();
});

// Security middleware
app.use(generateNonce);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(setupSecurityHeaders);
app.use(injectNonceIntoHtml);
app.disable('x-powered-by'); // Remove Express fingerprinting

// API-specific middleware
app.use('/api', rateLimiter);
app.use('/api', sqlInjectionProtection);

// Apply cache middleware with 30-minute duration to API routes (increased from 5 min)
app.use('/api', cacheMiddleware(1800));

// API Routes
app.use('/api/status', statusRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api', chatRoutes); // Add the chat routes

// School-branded landing page route
app.get('/', (req, res, next) => {
  if (req.isSchoolBranded) {
    console.log(`Serving school-branded landing page for: ${req.schoolName}`);
    // Continue to serve the React app
    next();
  } else {
    next();
  }
});

// Static file caching - 1 year for images and assets
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

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  console.log('Serving static files from', path.join(__dirname, '../../dist'));
  app.use('/lovable-uploads', express.static(path.join(__dirname, '../../public/lovable-uploads'), staticOptions));
  app.use('/assets', express.static(path.join(__dirname, '../../dist/assets'), staticOptions));
  app.use(express.static(path.join(__dirname, '../../dist'), {
    maxAge: '86400000' // 24 hours for other static files
  }));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    // Previously we were only forwarding non-API routes
    // Now we handle both normal and school-branded routes
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
}

// Error handling middleware
app.use(apiErrorHandler);
app.use('*', api404Handler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`API available at: http://localhost:${PORT}/api/status`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`Static files being served from: ${path.join(__dirname, '../../dist')}`);
  }
  console.log(`School-branded pages available at school.jobseekers4hs.org:${PORT} (requires proper DNS or hosts file setup)`);
});

module.exports = app;
