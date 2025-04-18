
const express = require('express');
const path = require('path');
const cors = require('cors');
const { generateNonce, setupSecurityHeaders } = require('./src/server/middleware/security');
const corsOptions = require('./src/server/config/cors');
const staticOptions = require('./src/server/config/static');
const schoolSubdomainMiddleware = require('./src/server/middleware/schoolSubdomain');

// Create Express app
const app = express();
const PORT = process.env.NODE_ENV === 'production' ? 443 : (process.env.PORT || 3000);

// Security middleware
app.use(generateNonce);
app.use(setupSecurityHeaders);
app.use(cors(corsOptions));
app.use(express.json());

// School subdomain handling
app.use(schoolSubdomainMiddleware);

// Root-level health check endpoint
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
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    next();
  }
});

// Special handling for school-branded routes
app.get('/:path', (req, res, next) => {
  if (req.isSchoolBranded && !req.path.startsWith('/api/')) {
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

// Static file serving
app.use('/lovable-uploads', express.static(path.join(__dirname, 'public/lovable-uploads'), staticOptions));
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), staticOptions));
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '86400000' // 24 hours for other static files
}));

// Fallback route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Production settings
if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode - development features disabled');
  app.set('json spaces', 0);
  app.set('env', 'production');
  app.disable('x-powered-by');
} else {
  console.log('Running in development mode');
  app.set('json spaces', 2);
}

// Start server if this file is run directly
if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`Visit a school-branded page at school.jobseekers4hs.org:${PORT} or school.jobseeker4hs.org:${PORT} (update /etc/hosts if testing locally)`);
    console.log(`Health check available at: http://localhost:${PORT}/health`);
  });
  
  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
}

module.exports = app;
