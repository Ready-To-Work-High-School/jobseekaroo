
// Authentication middleware and utilities
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Secret for JWT signing - in production, use environment variables
const JWT_SECRET = 'your-jwt-secret-key-should-be-env-var';

// Hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare password with hash
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  authenticate,
  JWT_SECRET
};
