
const { execSync } = require('child_process');
const fs = require('fs');

console.log('\n🔒 Running security checks...\n');

// Function to run a command and handle errors
function runCommand(command, description) {
  console.log(`\n📋 ${description}:\n`);
  
  try {
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return true;
  } catch (error) {
    console.error(`❌ Error in ${description}:`);
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.error(error.stderr);
    return false;
  }
}

// Check for dependency vulnerabilities
const npmAuditSuccessful = runCommand('npm audit --omit=dev', 'Checking for vulnerable dependencies');

// Run ESLint with security focus
const eslintSuccessful = runCommand('npx eslint --ext .ts,.tsx src/ --no-error-on-unmatched-pattern', 'Checking for security issues in code');

console.log('\n📊 Security Check Summary:');
console.log(`- Dependency check: ${npmAuditSuccessful ? '✅ Passed' : '❌ Issues found'}`);
console.log(`- Code security check: ${eslintSuccessful ? '✅ Passed' : '❌ Issues found'}`);

// Exit with error code if any checks failed
if (!npmAuditSuccessful || !eslintSuccessful) {
  console.log('\n⚠️ Security issues detected. Please fix them before proceeding.\n');
  process.exit(1);
} else {
  console.log('\n✅ All security checks passed!\n');
}
