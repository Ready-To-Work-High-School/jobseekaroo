
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('\n🎭 Running Playwright tests...');

try {
  // Create a reports directory if it doesn't exist
  const reportDir = path.join(__dirname, 'playwright-report');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  console.log('📊 Running tests with detailed console output...');
  
  // Run Playwright tests with detailed output
  execSync('npx playwright test --reporter=line', { stdio: 'inherit' });
  
  console.log('\n✅ Tests completed successfully!');
  console.log('\n📋 Test Reports:');
  console.log(`- HTML Report: ${path.join(reportDir, 'index.html')}`);
  console.log('  To open the HTML report, run: npx playwright show-report playwright-report\n');
  
} catch (error) {
  console.error('\n❌ Tests failed:', error.message);
  console.log('\n📋 Test Reports:');
  console.log('- Check the HTML report for details on failures');
  console.log('  To open the HTML report, run: npx playwright show-report playwright-report\n');
  process.exit(1);
}
