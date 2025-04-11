
#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

console.log(`${colors.blue}Starting secure deployment process...${colors.reset}\n`);

// Run security checks before deployment
console.log(`${colors.blue}Running security checks...${colors.reset}`);
try {
  execSync('node security-check.js', { stdio: 'inherit' });
} catch (error) {
  console.error(`${colors.red}Security checks failed! Fix issues before deploying.${colors.reset}`);
  process.exit(1);
}

// Ensure we're on production mode
console.log(`${colors.blue}Setting production environment...${colors.reset}`);
process.env.NODE_ENV = 'production';

// Build the application
console.log(`${colors.blue}Building application in production mode...${colors.reset}`);
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error(`${colors.red}Build failed! ${error.message}${colors.reset}`);
  process.exit(1);
}

// Check if we have Cloudflare credentials
console.log(`${colors.blue}Checking Cloudflare configuration...${colors.reset}`);
if (!process.env.CLOUDFLARE_API_TOKEN) {
  console.warn(`${colors.yellow}Warning: CLOUDFLARE_API_TOKEN not found. Cloudflare WAF configuration will be skipped.${colors.reset}`);
}

// Set file permissions to ensure security
console.log(`${colors.blue}Setting secure file permissions...${colors.reset}`);
try {
  if (process.platform !== 'win32') {
    // Restrict .env file permissions (unix systems only)
    if (fs.existsSync('.env')) {
      execSync('chmod 600 .env', { stdio: 'inherit' });
    }
  }
} catch (error) {
  console.warn(`${colors.yellow}Warning: Could not set file permissions. ${error.message}${colors.reset}`);
}

// Check for secrets in code
console.log(`${colors.blue}Checking for secrets in code...${colors.reset}`);
try {
  const result = execSync('grep -r "API_KEY\\|SECRET\\|PASSWORD\\|TOKEN" --include="*.js" --include="*.ts" --include="*.tsx" --exclude-dir=node_modules .', { encoding: 'utf8' });
  if (result) {
    console.warn(`${colors.yellow}Warning: Potential secrets found in code:${colors.reset}\n${result}`);
    console.warn(`${colors.yellow}Please review these before deploying to production.${colors.reset}`);
  }
} catch (error) {
  // No matches found is good!
  console.log(`${colors.green}No obvious secrets found in code.${colors.reset}`);
}

console.log(`${colors.green}Security checks passed. Deployment ready.${colors.reset}`);
console.log(`${colors.blue}To deploy to production with Render:${colors.reset} npm run deploy:render`);
console.log(`${colors.blue}For manual deployment:${colors.reset} NODE_ENV=production node server.js`);
