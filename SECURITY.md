
# Security Policy

## Supported Versions

Currently supported versions of our application:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Security Tools and Setup

### Running Security Checks

We use various tools to ensure the security of our application:

```bash
# Run the comprehensive security check script
node security-check.js
```

### Setting Up Snyk Without Sudo

For better dependency vulnerability scanning, install Snyk:

1. Use the provided setup script:
   ```bash
   chmod +x setup-snyk.sh
   ./setup-snyk.sh
   ```

2. Or manually:
   ```bash
   # Configure npm to use a local directory instead of global
   npm config set prefix ~/.npm-global

   # Add to PATH
   export PATH=~/.npm-global/bin:$PATH
   
   # Add to shell config for persistence
   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc  # or ~/.bashrc
   
   # Install Snyk
   npm install -g snyk
   ```

3. Authenticate with Snyk:
   ```bash
   snyk auth
   ```

## Reporting a Vulnerability

To report a security vulnerability:

1. **For critical issues:** Please email security@jobseekaroo.com with details.
2. **For non-critical issues:** Open an issue on our GitHub repository with the "security" label.

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggestions for remediation (if any)

## Security Best Practices

1. Keep dependencies updated regularly
2. Run security checks before deployments
3. Never commit secrets or API keys to the repository
4. Use environment variables for sensitive information
5. Apply the principle of least privilege for access controls

## Deployment Security

Our application uses several security measures:

1. Cloudflare WAF for request filtering
2. HTTPS-only access (Port 443)
3. Security headers for browser protection
4. Rate limiting on API endpoints
5. Content Security Policy implementation

For more information on our deployment security settings, refer to:
- `render.yaml` for deployment configurations
- `.cloudflare/waf-config.json` for WAF settings
- `deploy-secure.js` for deployment security scripts
