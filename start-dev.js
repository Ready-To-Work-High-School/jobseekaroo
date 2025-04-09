
const { spawn } = require('child_process');
const path = require('path');

// Start the backend server with the unified server.js
console.log('Starting backend server...');
const backend = spawn('node', ['server.js'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_ENV: 'development',
    PORT: process.env.PORT || 5000
  }
});

// Start the frontend development server
console.log('Starting frontend server...');
const frontend = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down all servers...');
  backend.kill('SIGINT');
  frontend.kill('SIGINT');
  process.exit();
});

console.log('Running frontend and backend concurrently...');
console.log('Frontend: http://localhost:8080');
console.log('Backend: http://localhost:5000');
console.log('Press Ctrl+C to stop both servers');
