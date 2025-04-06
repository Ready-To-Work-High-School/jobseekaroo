
// SQL injection protection middleware with enhanced detection
const sqlInjectionProtection = (req, res, next) => {
  // Check for common SQL injection patterns
  const checkSqlInjection = (obj) => {
    if (!obj) return false;
    
    const sqlPatterns = [
      /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
      /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
      /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
      /((\%27)|(\'))union/i,
      /exec(\s|\+)+(s|x)p\w+/i,
      /UNION\s+ALL\s+SELECT/i,
      /INSERT|UPDATE|DELETE|DROP|ALTER|EXEC|EXECUTE|TRUNCATE|DECLARE|INFORMATION_SCHEMA/i
    ];
    
    const checkValue = (val) => {
      if (typeof val === 'string') {
        return sqlPatterns.some(pattern => pattern.test(val));
      }
      if (val !== null && typeof val === 'object') {
        return Object.values(val).some(checkValue);
      }
      return false;
    };
    
    return checkValue(obj);
  };
  
  // Check both query string, parameters, and body
  if (checkSqlInjection(req.query) || checkSqlInjection(req.params) || checkSqlInjection(req.body)) {
    const logData = {
      ip: req.ip, 
      path: req.path,
      query: req.query,
      params: req.params,
      method: req.method,
      timestamp: new Date().toISOString()
    };
    
    // Log suspicious activity but don't log the full body to avoid sensitive data exposure
    console.warn('Potential SQL injection attempt:', JSON.stringify(logData));
    
    // Return a generic error without details
    return res.status(400).json({ error: 'Invalid input format' });
  }
  
  next();
};

module.exports = {
  sqlInjectionProtection
};
