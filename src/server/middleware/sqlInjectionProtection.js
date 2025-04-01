
// SQL injection protection middleware
const sqlInjectionProtection = (req, res, next) => {
  // Would implement SQL injection protection in production
  next();
};

module.exports = {
  sqlInjectionProtection
};
