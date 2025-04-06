
const { execSync } = require('child_process');

console.log('Running Playwright tests...');
try {
  // Run Playwright tests
  execSync('npx playwright test', { stdio: 'inherit' });
} catch (error) {
  console.error('Tests failed:', error);
  process.exit(1);
}
