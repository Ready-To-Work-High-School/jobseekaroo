
#!/bin/bash

# Script to set up Snyk CLI without requiring sudo permissions

# Colors for better visual feedback
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}Setting up Snyk CLI without sudo access${NC}"
echo -e "${BLUE}=========================================${NC}"

# Create npm global directory if it doesn't exist
echo -e "\n${YELLOW}Creating npm global directory if needed...${NC}"
mkdir -p ~/.npm-global

# Configure npm to use the new directory path
echo -e "\n${YELLOW}Configuring npm to use local directory...${NC}"
npm config set prefix ~/.npm-global

# Add the new path to PATH environment variable
echo -e "\n${YELLOW}Updating PATH environment variable...${NC}"
export PATH=~/.npm-global/bin:$PATH

# Add to shell configuration files for persistence
SHELL_CONFIG=""

if [ -f ~/.zshrc ]; then
  SHELL_CONFIG="~/.zshrc"
  grep -qxF 'export PATH=~/.npm-global/bin:$PATH' ~/.zshrc || echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
elif [ -f ~/.bashrc ]; then
  SHELL_CONFIG="~/.bashrc"
  grep -qxF 'export PATH=~/.npm-global/bin:$PATH' ~/.bashrc || echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
elif [ -f ~/.bash_profile ]; then
  SHELL_CONFIG="~/.bash_profile"
  grep -qxF 'export PATH=~/.npm-global/bin:$PATH' ~/.bash_profile || echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bash_profile
fi

echo -e "${GREEN}✓ Updated $SHELL_CONFIG with the new PATH${NC}"

# Install Snyk globally
echo -e "\n${YELLOW}Installing Snyk CLI...${NC}"
npm install -g snyk

# Check if installation was successful
if command -v snyk &> /dev/null; then
  echo -e "\n${GREEN}✓ Snyk CLI installed successfully!${NC}"
  echo -e "\n${BLUE}Next steps:${NC}"
  echo -e "1. Restart your terminal or run: ${YELLOW}source $SHELL_CONFIG${NC}"
  echo -e "2. Authenticate with Snyk: ${YELLOW}snyk auth${NC}"
  echo -e "3. Run a test: ${YELLOW}snyk test${NC}"
else
  echo -e "\n${RED}× Failed to install Snyk CLI.${NC}"
  echo -e "Please try running the installation manually:"
  echo -e "${YELLOW}npm install -g snyk${NC}"
fi

echo -e "\n${BLUE}=========================================${NC}"
