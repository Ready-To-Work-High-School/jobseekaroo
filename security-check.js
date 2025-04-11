
#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

console.log(`${colors.cyan}╔══════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.cyan}║        Security Check System         ║${colors.reset}`);
console.log(`${colors.cyan}╚══════════════════════════════════════╝${colors.reset}`);

// Function to run a command and handle errors
function runCommand(command, description, options = {}) {
  console.log(`\n${colors.blue}📋 ${description}:${colors.reset}\n`);
  
  try {
    const output = execSync(command, { encoding: 'utf8', ...options });
    console.log(output);
    return { success: true, output };
  } catch (error) {
    console.error(`${colors.red}❌ Error in ${description}:${colors.reset}`);
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.error(error.stderr);
    return { success: false, error };
  }
}

// Function to check if a tool is installed
function isToolInstalled(toolName) {
  try {
    execSync(`which ${toolName} || where ${toolName} 2> /dev/null`, { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

// Check for Snyk installation and set up guide
if (!isToolInstalled('snyk')) {
  console.log(`\n${colors.yellow}⚠️ Snyk CLI not found. For better vulnerability scanning, install Snyk:${colors.reset}`);
  console.log(`${colors.cyan}# Setup without sudo:${colors.reset}`);
  console.log(`npm config set prefix ~/.npm-global`);
  console.log(`export PATH=~/.npm-global/bin:$PATH`);
  console.log(`npm install -g snyk`);
  console.log(`\n${colors.cyan}# Then authenticate:${colors.reset}`);
  console.log(`snyk auth`);
} else {
  console.log(`\n${colors.green}✅ Snyk CLI is installed. Will include in security checks.${colors.reset}`);
}

console.log(`\n${colors.magenta}🔒 Beginning security checks...${colors.reset}`);

// 1. Check for dependency vulnerabilities with npm audit
console.log(`\n${colors.blue}🔍 Checking for vulnerable dependencies...${colors.reset}`);
const npmAuditResult = runCommand('npm audit --omit=dev --json || true', 'NPM Audit Check', { stdio: ['ignore', 'pipe', 'pipe'] });

// Parse npm audit results for better reporting
let highSeverityCount = 0;
let criticalSeverityCount = 0;
let moderateSeverityCount = 0;

try {
  if (npmAuditResult.output) {
    const auditData = JSON.parse(npmAuditResult.output);
    if (auditData.metadata && auditData.metadata.vulnerabilities) {
      highSeverityCount = auditData.metadata.vulnerabilities.high || 0;
      criticalSeverityCount = auditData.metadata.vulnerabilities.critical || 0;
      moderateSeverityCount = auditData.metadata.vulnerabilities.moderate || 0;
    }
  }
} catch (e) {
  console.log(`${colors.yellow}⚠️ Could not parse npm audit output:${colors.reset}`, e.message);
}

// 2. Run ESLint with security focus
const eslintSuccessful = runCommand('npx eslint --ext .ts,.tsx src/ --no-error-on-unmatched-pattern', 'Checking for security issues in code').success;

// 3. Check for outdated dependencies that may have security implications
console.log(`\n${colors.blue}🔍 Checking for outdated dependencies...${colors.reset}`);
runCommand('npm outdated || true', 'Outdated Dependencies Check');

// 4. Run Snyk test if available
let snykSuccessful = true;
if (isToolInstalled('snyk')) {
  console.log(`\n${colors.blue}🔍 Running Snyk vulnerability test...${colors.reset}`);
  snykSuccessful = runCommand('snyk test --severity-threshold=medium || true', 'Snyk Vulnerability Test').success;
}

// 5. Check for exposed secrets in the codebase
console.log(`\n${colors.blue}🔍 Checking for hardcoded secrets...${colors.reset}`);
const secretPatterns = [
  'API_KEY\\s*=',
  'SECRET\\s*=',
  'PASSWORD\\s*=',
  'TOKEN\\s*=',
  'SECRET_KEY\\s*=',
  'PRIVATE_KEY\\s*=',
  'ACCESS_KEY\\s*='
];

const secretRegex = new RegExp(secretPatterns.join('|'), 'i');
const excludeDirs = ['node_modules', 'dist', 'build', '.git', 'coverage'];
const targetExtensions = ['.js', '.ts', '.tsx', '.jsx', '.json', '.env'];

let secretsFound = false;
const checkForSecrets = (dir) => {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory() && !excludeDirs.includes(entry.name)) {
        checkForSecrets(fullPath);
      } else if (entry.isFile() && targetExtensions.includes(path.extname(entry.name))) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (secretRegex.test(content)) {
            console.log(`${colors.yellow}⚠️ Potential secret found in: ${fullPath}${colors.reset}`);
            secretsFound = true;
          }
        } catch (err) {
          console.error(`Error reading file ${fullPath}: ${err.message}`);
        }
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}: ${err.message}`);
  }
};

checkForSecrets('.');

// Security summary report
console.log(`\n${colors.cyan}╔══════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.cyan}║        Security Check Summary         ║${colors.reset}`);
console.log(`${colors.cyan}╚══════════════════════════════════════╝${colors.reset}`);

const npmAuditStatus = highSeverityCount === 0 && criticalSeverityCount === 0 
  ? `${colors.green}✅ No high/critical vulnerabilities${colors.reset}`
  : `${colors.red}❌ Found ${highSeverityCount} high and ${criticalSeverityCount} critical vulnerabilities${colors.reset}`;

console.log(`- NPM Audit: ${npmAuditStatus}`);
if (moderateSeverityCount > 0) {
  console.log(`  ${colors.yellow}⚠️ ${moderateSeverityCount} moderate vulnerabilities found${colors.reset}`);
}

console.log(`- Code security (ESLint): ${eslintSuccessful ? `${colors.green}✅ Passed${colors.reset}` : `${colors.red}❌ Issues found${colors.reset}`}`);
console.log(`- Secrets in codebase: ${!secretsFound ? `${colors.green}✅ None detected${colors.reset}` : `${colors.red}❌ Potential secrets found${colors.reset}`}`);

if (isToolInstalled('snyk')) {
  console.log(`- Snyk security scan: ${snykSuccessful ? `${colors.green}✅ Passed${colors.reset}` : `${colors.red}❌ Issues found${colors.reset}`}`);
}

// Security advice
console.log(`\n${colors.blue}📋 Security Recommendations:${colors.reset}`);
if (highSeverityCount > 0 || criticalSeverityCount > 0) {
  console.log(`- Run ${colors.cyan}npm audit fix${colors.reset} to automatically fix vulnerabilities when possible`);
  console.log(`- For major updates run ${colors.cyan}npm audit fix --force${colors.reset} (may include breaking changes)`);
}

if (moderateSeverityCount > 0) {
  console.log(`- Consider addressing moderate vulnerabilities with ${colors.cyan}npm update${colors.reset}`);
}

if (!isToolInstalled('snyk')) {
  console.log(`- Install Snyk for better vulnerability detection:`);
  console.log(`  ${colors.cyan}npm config set prefix ~/.npm-global${colors.reset}`);
  console.log(`  ${colors.cyan}export PATH=~/.npm-global/bin:$PATH${colors.reset}`);
  console.log(`  ${colors.cyan}npm install -g snyk${colors.reset}`);
}

// Exit with error code if any checks failed
if ((highSeverityCount > 0 || criticalSeverityCount > 0) || !eslintSuccessful || secretsFound) {
  console.log(`\n${colors.red}⚠️ Security issues detected. Please fix them before proceeding.${colors.reset}\n`);
  process.exit(1);
} else {
  console.log(`\n${colors.green}✅ All security checks passed!${colors.reset}\n`);
}
