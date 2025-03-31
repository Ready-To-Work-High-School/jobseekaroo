
// Simple script to start the Express server
const app = require('./app');
const port = process.env.PORT || 5000;

// Set NODE_ENV to production if not set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

app.listen(port, '0.0.0.0', () => {
  console.log(`${app.locals.appName} server running on port ${port} in ${process.env.NODE_ENV} mode`);
  console.log(`API available at: http://localhost:${port}/api/status`);
  
  if (process.env.NODE_ENV === 'production') {
    console.log(`Serving frontend from static build files`);
  } else {
    console.log(`Authentication endpoints at: http://localhost:${port}/api/users/login and /register`);
    console.log(`Posts API at: http://localhost:${port}/api/posts`);
  }
});
