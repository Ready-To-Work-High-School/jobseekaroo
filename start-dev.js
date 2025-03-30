
const { spawn } = require('child_process');
const path = require('path');

// Start the backend server
const backend = spawn('node', ['src/server/start-server.js'], {
  stdio: 'inherit',
  shell: true
});

// Start the frontend development server
const frontend = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  backend.kill('SIGINT');
  frontend.kill('SIGINT');
  process.exit();
});

console.log('Running frontend and backend concurrently...');
console.log('Frontend: http://localhost:8080');
console.log('Backend: http://localhost:5000');
console.log('Press Ctrl+C to stop both servers');
