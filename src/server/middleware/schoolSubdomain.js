
const schoolSubdomainMiddleware = (req, res, next) => {
  const host = req.hostname;
  
  const schoolSubdomainRegex = /^([^.]+)\.(jobseekaroo\.com|jobseekers4hs\.org|jobseeker4hs\.org)$/;
  const schoolSubdomainMatch = host.match(schoolSubdomainRegex);
  
  if (schoolSubdomainMatch) {
    req.schoolName = schoolSubdomainMatch[1];
    console.log(`School subdomain detected: ${req.schoolName}`);
    req.isSchoolBranded = true;
    return next();
  }
  
  req.isSchoolBranded = false;
  next();
};

module.exports = schoolSubdomainMiddleware;
