
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('\n🎭 Starting test execution...');

// Create a reports directory if it doesn't exist
const reportDir = path.join(__dirname, 'playwright-report');
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

// Execute the test command
exec('npm test', (error, stdout, stderr) => {
  console.log('\n📊 Test Output:\n');
  
  // Always show the output regardless of whether there was an error
  if (stdout) {
    console.log(stdout);
  }
  
  if (stderr) {
    console.error('\n⚠️ Error Output:\n', stderr);
  }
  
  if (error) {
    console.error('\n❌ Tests failed with error code:', error.code);
    console.log('\n📋 Test Reports:');
    console.log('- Check the HTML report for details on failures');
    console.log('  To open the HTML report, run: npx playwright show-report playwright-report\n');
    process.exit(1);
  }
  
  // If we got here without error
  if (stdout.includes('FAIL') || stdout.includes('failed')) {
    console.error('\n⚠️ Some tests appear to have failed.');
  } else {
    console.log('\n✅ Tests completed successfully!');
  }
  
  // Always provide information about reports
  console.log('\n📋 Test Reports:');
  console.log(`- HTML Report: ${path.join(reportDir, 'index.html')}`);
  console.log('  To open the HTML report, run: npx playwright show-report playwright-report\n');
  
  // Optionally, we could automatically open the report
  console.log('Would you like to open the HTML report now? Run:');
  console.log('  npx playwright show-report playwright-report\n');
});
