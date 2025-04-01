
const express = require('express');
const path = require('path');
const cors = require('cors');
const { initializeDatabase } = require('./db');
const statusRoutes = require('./routes/status');
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const { rateLimiter } = require('./middleware/rateLimit');
const { sqlInjectionProtection } = require('./middleware/sqlInjectionProtection');
const { apiErrorHandler, api404Handler } = require('./middleware/errorHandler');

// Initialize the database
initializeDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use(sqlInjectionProtection);

// API Routes
app.use('/api/status', statusRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/')) {
      res.sendFile(path.join(__dirname, '../../dist/index.html'));
    }
  });
}

// Error handling middleware
app.use(apiErrorHandler);
app.use('*', api404Handler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at: http://localhost:${PORT}/api/status`);
});

module.exports = app;
