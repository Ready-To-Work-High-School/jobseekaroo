
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Enhanced handler for school-branded subdomains
app.use((req, res, next) => {
  const host = req.hostname;
  
  // Check if the request is coming from a school subdomain
  // Format: school.jobseekaroo.com or school.jobseekers4hs.org
  const schoolSubdomainRegex = /^([^.]+)\.(jobseekaroo\.com|jobseekers4hs\.org)$/;
  const schoolSubdomainMatch = host.match(schoolSubdomainRegex);
  
  if (schoolSubdomainMatch) {
    // Extract school name from subdomain
    req.schoolName = schoolSubdomainMatch[1];
    console.log(`School subdomain detected: ${req.schoolName}`);
    // Set a flag to indicate this is a school-branded request
    req.isSchoolBranded = true;
    // Continue to the school-specific route
    return next();
  }
  
  // Not a school subdomain, continue to regular routes
  req.isSchoolBranded = false;
  next();
});

// School-branded landing page route
app.get('/', (req, res, next) => {
  if (req.isSchoolBranded) {
    console.log(`Serving school-branded landing page for: ${req.schoolName}`);
    // Serve the school-branded landing page
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    // Continue to standard routes
    next();
  }
});

// Special handling for school-branded routes
app.get('/:path', (req, res, next) => {
  if (req.isSchoolBranded && !req.path.startsWith('/api/')) {
    // For any non-API route on a school subdomain, serve the main app
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
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
  console.log(`Visit a school-branded page at school.jobseekers4hs.org:${PORT} (update /etc/hosts if testing locally)`);
});
