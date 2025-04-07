
const { spawn } = require('child_process');

// Start the production server
const server = spawn('node', ['server.js'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: process.env.PORT || 5000
  }
});

console.log('Running production server...');
console.log(`Server available at: http://localhost:${process.env.PORT || 5000}`);
console.log(`API available at: http://localhost:${process.env.PORT || 5000}/api/status`);
