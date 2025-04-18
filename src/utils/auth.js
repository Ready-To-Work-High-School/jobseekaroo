
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Use environment variable for JWT secret, or generate a secure random one if not provided
// IMPORTANT: In production, ALWAYS set JWT_SECRET as an environment variable
// The generated secret is only meant as a fallback for development
const JWT_SECRET = process.env.JWT_SECRET || (() => {
  console.warn('⚠️  WARNING: JWT_SECRET not set in environment variables. Using generated secret. This is insecure for production.');
  return crypto.randomBytes(32).toString('hex');
})();

class AuthError extends Error {
  constructor(message = 'Not authorized') {
    super(message);
    this.name = 'AuthError';
  }
}

const getUserId = (context) => {
  const authHeader = context.request?.get('Authorization');
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    try {
      const { userId } = jwt.verify(token, JWT_SECRET);
      return userId;
    } catch (error) {
      throw new AuthError(`Invalid or expired token: ${error.message}`);
    }
  }
  throw new AuthError('No authentication token provided');
};

module.exports = {
  AuthError,
  getUserId
};
