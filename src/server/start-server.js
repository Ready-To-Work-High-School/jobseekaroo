
// This file is used to start the server in production
const app = require('./app.js');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'production'} mode`);
  console.log(`API available at: http://localhost:${PORT}/api/status`);
});
