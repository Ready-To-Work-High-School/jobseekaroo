
const { execSync } = require('child_process');

console.log('Running Playwright tests...');
try {
  // Run Playwright tests with detailed output
  execSync('npx playwright test --reporter=line', { stdio: 'inherit' });
  console.log('Tests completed successfully!');
} catch (error) {
  console.error('Tests failed:', error.message);
  process.exit(1);
}
