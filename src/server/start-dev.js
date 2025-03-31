
/**
 * Development server starter script
 * This script starts both the Express server and Vite development server
 */
const { spawn } = require('child_process');
const path = require('path');

// Start the Express backend server
console.log('Starting Express server...');
const backend = spawn('node', ['src/server/start-server.js'], {
  stdio: 'inherit',
  shell: true
});

// Start the Vite frontend development server
console.log('Starting Vite development server...');
const frontend = spawn('npx', ['vite'], {
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  backend.kill('SIGINT');
  frontend.kill('SIGINT');
  process.exit();
});

console.log('\n=== Dev servers started ===');
console.log('Frontend: http://localhost:8080');
console.log('Backend API: http://localhost:5000/api/status');
console.log('Press Ctrl+C to stop both servers\n');
