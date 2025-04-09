
const express = require('express');
const path = require('path');
const cors = require('cors');
const { 
  generateNonce, 
  setupSecurityHeaders 
} = require('./src/server/middleware/security');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(generateNonce);
app.use(setupSecurityHeaders);

// CORS Configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://jobseekaroo.com', 
        'https://jobseekers4hs.org', 
        'https://jobseeker4hs.org',
        /\.jobseekaroo\.com$/,
        /\.jobseekers4hs\.org$/,
        /\.jobseeker4hs\.org$/
      ]
    : ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:8080'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // 24 hours
};
app.use(cors(corsOptions));

// Parse JSON body
app.use(express.json());

// Enhanced handler for school-branded subdomains
app.use((req, res, next) => {
  const host = req.hostname;
  
  // Check if the request is coming from a school subdomain
  const schoolSubdomainRegex = /^([^.]+)\.(jobseekaroo\.com|jobseekers4hs\.org|jobseeker4hs\.org)$/;
  const schoolSubdomainMatch = host.match(schoolSubdomainRegex);
  
  if (schoolSubdomainMatch) {
    // Extract school name from subdomain
    req.schoolName = schoolSubdomainMatch[1];
    console.log(`School subdomain detected: ${req.schoolName}`);
    // Set a flag to indicate this is a school-branded request
    req.isSchoolBranded = true;
    // Continue to the school-specific route
    return next();
  }
  
  // Not a school subdomain, continue to regular routes
  req.isSchoolBranded = false;
  next();
});

// Static file caching - 1 year for images and JS/CSS assets
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

// Root-level health check endpoint for Render (accessible at /health)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// School-branded landing page route
app.get('/', (req, res, next) => {
  if (req.isSchoolBranded) {
    console.log(`Serving school-branded landing page for: ${req.schoolName}`);
    // Serve the school-branded landing page
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    // Continue to standard routes
    next();
  }
});

// Special handling for school-branded routes
app.get('/:path', (req, res, next) => {
  if (req.isSchoolBranded && !req.path.startsWith('/api/')) {
    // For any non-API route on a school subdomain, serve the main app
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    next();
  }
});

// API routes
const userRoutes = require('./src/server/routes/users');
const postRoutes = require('./src/server/routes/posts');
const statusRoutes = require('./src/server/routes/status');
const chatRoutes = require('./src/server/routes/chat');

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api', statusRoutes);
app.use('/api', chatRoutes);

// Serve static files from the dist directory with enhanced caching
app.use('/lovable-uploads', express.static(path.join(__dirname, 'public/lovable-uploads'), staticOptions));
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), staticOptions));
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '86400000' // 24 hours for other static files
}));

// For any request that doesn't match a static file, send the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`Visit a school-branded page at school.jobseekers4hs.org:${PORT} or school.jobseeker4hs.org:${PORT} (update /etc/hosts if testing locally)`);
    console.log(`Health check available at: http://localhost:${PORT}/health`);
  });
}

// Export the app for testing purposes
module.exports = app;
