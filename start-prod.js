
const { spawn } = require('child_process');

// Ensure we're in production mode
process.env.NODE_ENV = 'production';

// Start the production server
const server = spawn('node', ['server.js'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: process.env.PORT || 443
  }
});

console.log('Running production server in secure mode...');
console.log(`Server available at: https://localhost:${process.env.PORT || 443}`);
console.log(`API available at: https://localhost:${process.env.PORT || 443}/api/status`);
console.log(`Health check at: https://localhost:${process.env.PORT || 443}/health`);

console.log('\nSECURITY NOTICE:');
console.log('- Development features are disabled');
console.log('- Only HTTPS traffic is allowed');
console.log('- Security headers are enforced');
console.log('- Rate limiting is active');

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.kill('SIGINT');
  process.exit();
});

// Gracefully handle other termination signals
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.kill('SIGTERM');
  process.exit();
});
