
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Handler for school-branded subdomains
app.use((req, res, next) => {
  const host = req.hostname;
  
  // Check if the request is coming from a school subdomain
  // Format: school.jobseekaroo.com
  const schoolSubdomainMatch = host.match(/^([^.]+)\.jobseekaroo\.com$/);
  
  if (schoolSubdomainMatch) {
    // Extract school name from subdomain
    req.schoolName = schoolSubdomainMatch[1];
    // Continue to the school-specific route
    return next();
  }
  
  // Not a school subdomain, continue to regular routes
  next();
});

// School-branded landing page route
app.get('/', (req, res, next) => {
  if (req.schoolName) {
    // Serve the school-branded landing page
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    // Continue to standard routes
    next();
  }
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// For any request that doesn't match a static file, send the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
