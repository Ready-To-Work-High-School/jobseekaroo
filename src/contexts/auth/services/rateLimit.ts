
// Rate limiting - track request counts per IP
const rateLimiter: Record<string, { count: number; resetTime: number }> = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const RATE_LIMIT_MAX = 20; // Max 20 requests per minute

/**
 * Apply rate limiting based on IP address
 * @param ipAddress User's IP address
 * @returns Boolean indicating if request should be allowed
 */
export const checkRateLimit = (ipAddress: string): boolean => {
  const now = Date.now();
  
  if (!rateLimiter[ipAddress]) {
    rateLimiter[ipAddress] = { count: 1, resetTime: now + RATE_LIMIT_WINDOW };
    return true;
  }
  
  if (now > rateLimiter[ipAddress].resetTime) {
    // Reset window
    rateLimiter[ipAddress] = { count: 1, resetTime: now + RATE_LIMIT_WINDOW };
    return true;
  }
  
  // Increment count
  rateLimiter[ipAddress].count += 1;
  
  // Check if over limit
  return rateLimiter[ipAddress].count <= RATE_LIMIT_MAX;
};
