
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

class AuthError extends Error {
  constructor() {
    super('Not authorized');
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
      throw new AuthError();
    }
  }
  throw new AuthError();
};

module.exports = {
  AuthError,
  getUserId
};
