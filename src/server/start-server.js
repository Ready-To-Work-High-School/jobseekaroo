
// Simple script to start the Express server
const app = require('./app');
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`API available at: http://localhost:${port}/api/status`);
  console.log(`Secure data at: http://localhost:${port}/api/secure-data`);
});
