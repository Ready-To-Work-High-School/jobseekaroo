
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Initialize Supabase client with service role key
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Enhanced rate limiting configuration with DDoS protection
const MAX_REQUESTS_PER_MINUTE = 60;
const MAX_REQUESTS_PER_HOUR = 1000;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_HOUR_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// In-memory rate limiting store (will reset on function cold start)
const rateLimitStore: Record<string, { 
  count: number, 
  resetAt: number,
  hourlyCount: number,
  hourlyResetAt: number,
  suspicious: boolean,
  consecutiveErrors: number
}> = {};

// Suspicious patterns detection
const SUSPICIOUS_PATTERNS = [
  /union\s+select/i,
  /exec\s+sp_/i,
  /INSERT\s+INTO/i,
  /UPDATE\s+.+\s+SET/i,
  /DELETE\s+FROM/i,
  /DROP\s+TABLE/i,
  /ALTER\s+TABLE/i,
  /<script>/i,
  /javascript:/i,
  /onload=/i,
  /onerror=/i
];

// Function to get client IP from request headers
export function getClientIP(req: Request): string {
  return req.headers.get('X-Forwarded-For') || 
         req.headers.get('CF-Connecting-IP') || 
         'unknown-ip';
}

// Enhanced rate limiting function with DDoS protection
export function isRateLimited(identifier: string, path: string): boolean {
  const now = Date.now();
  
  // Initialize or reset if window expired
  if (!rateLimitStore[identifier]) {
    rateLimitStore[identifier] = {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
      hourlyCount: 1,
      hourlyResetAt: now + RATE_LIMIT_HOUR_WINDOW_MS,
      suspicious: false,
      consecutiveErrors: 0
    };
    return false;
  }
  
  // Reset minute counter if window expired
  if (now > rateLimitStore[identifier].resetAt) {
    rateLimitStore[identifier].count = 1;
    rateLimitStore[identifier].resetAt = now + RATE_LIMIT_WINDOW_MS;
  } else {
    // Increment minute counter
    rateLimitStore[identifier].count++;
  }
  
  // Reset hourly counter if window expired
  if (now > rateLimitStore[identifier].hourlyResetAt) {
    rateLimitStore[identifier].hourlyCount = 1;
    rateLimitStore[identifier].hourlyResetAt = now + RATE_LIMIT_HOUR_WINDOW_MS;
    
    // Reset suspicious flag after an hour of good behavior
    if (rateLimitStore[identifier].consecutiveErrors === 0) {
      rateLimitStore[identifier].suspicious = false;
    }
  } else {
    // Increment hourly counter
    rateLimitStore[identifier].hourlyCount++;
  }
  
  // Check if rate limit exceeded
  const minuteLimitExceeded = rateLimitStore[identifier].count > MAX_REQUESTS_PER_MINUTE;
  const hourlyLimitExceeded = rateLimitStore[identifier].hourlyCount > MAX_REQUESTS_PER_HOUR;
  
  // If client is flagged as suspicious, apply stricter rate limiting
  if (rateLimitStore[identifier].suspicious) {
    return rateLimitStore[identifier].count > (MAX_REQUESTS_PER_MINUTE / 4);
  }
  
  return minuteLimitExceeded || hourlyLimitExceeded;
}

// Track consecutive errors to detect brute force attempts
export function trackConsecutiveErrors(identifier: string): void {
  if (!rateLimitStore[identifier]) {
    return;
  }
  
  rateLimitStore[identifier].consecutiveErrors++;
  
  // Flag as suspicious after several consecutive errors
  if (rateLimitStore[identifier].consecutiveErrors >= 5) {
    rateLimitStore[identifier].suspicious = true;
    console.warn(`Suspicious activity detected from ${identifier}`);
  }
}

// Reset consecutive errors counter on successful request
export function resetConsecutiveErrors(identifier: string): void {
  if (!rateLimitStore[identifier]) {
    return;
  }
  
  rateLimitStore[identifier].consecutiveErrors = 0;
}

// Check for suspicious patterns in request data
export function hasSuspiciousPatterns(data: any): boolean {
  const stringData = JSON.stringify(data).toLowerCase();
  
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(stringData)) {
      return true;
    }
  }
  
  return false;
}

// Validate JWT token from Authorization header
export async function validateToken(req: Request): Promise<{ 
  isValid: boolean; 
  userId?: string; 
  error?: string;
}> {
  try {
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { 
        isValid: false, 
        error: 'Missing or invalid authorization header' 
      };
    }
    
    const token = authHeader.split(' ')[1];
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error || !data.user) {
      return { 
        isValid: false, 
        error: error?.message || 'Invalid token' 
      };
    }
    
    return {
      isValid: true,
      userId: data.user.id
    };
  } catch (error) {
    console.error('Token validation error:', error);
    return {
      isValid: false,
      error: 'Token validation failed'
    };
  }
}

// Enhanced log API request for audit purposes with more details
export async function logApiRequest(
  functionName: string,
  userId: string | undefined,
  path: string,
  method: string,
  ip: string,
  userAgent: string | null,
  statusCode: number,
  requestData?: any,
  responseData?: any
): Promise<void> {
  try {
    const metadata: Record<string, any> = {
      path,
      method,
      status_code: statusCode,
      timestamp: new Date().toISOString()
    };
    
    // Include sanitized request and response data for security auditing
    if (requestData) {
      // Sanitize sensitive data before logging
      const sanitizedRequest = sanitizeSensitiveData(requestData);
      metadata.request_data = sanitizedRequest;
    }
    
    if (responseData && statusCode >= 400) {
      // Only log response data for errors
      metadata.response_data = responseData;
    }
    
    await supabase.from('security_audit_logs').insert({
      action: `api_${functionName}_${method.toLowerCase()}`,
      user_id: userId,
      metadata,
      ip_address: ip,
      user_agent: userAgent || 'unknown'
    });
  } catch (error) {
    // Log but don't fail the request
    console.error('Error logging API request:', error);
  }
}

// Sanitize sensitive data before logging
function sanitizeSensitiveData(data: any): any {
  if (!data) return data;
  
  try {
    const dataCopy = JSON.parse(JSON.stringify(data));
    
    // List of field names that might contain sensitive data
    const sensitiveFields = [
      'password', 'token', 'secret', 'auth', 'key', 'credential', 'credit_card',
      'card_number', 'cvv', 'ssn', 'social_security', 'api_key', 'private_key'
    ];
    
    // Recursive function to sanitize objects
    function sanitizeObject(obj: Record<string, any>): Record<string, any> {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          sanitizeObject(obj[key]);
        } else if (typeof obj[key] === 'string') {
          // Check if this key contains any sensitive information
          if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
            obj[key] = '[REDACTED]';
          }
        }
      }
      return obj;
    }
    
    return sanitizeObject(dataCopy);
  } catch (e) {
    console.error('Error sanitizing sensitive data:', e);
    return { sanitized: 'Error processing data' };
  }
}

// Check if request requires authentication
export function requiresAuth(path: string, method: string): boolean {
  // Public endpoints that don't require authentication
  const publicEndpoints = [
    { path: '/test', methods: ['GET'] },
    { path: '/health', methods: ['GET'] },
    { path: '/public-jobs', methods: ['GET'] } // Allow public access to job listings
    // Add other public endpoints here
  ];
  
  return !publicEndpoints.some(endpoint => 
    path.startsWith(endpoint.path) && endpoint.methods.includes(method)
  );
}

// Main middleware for handling API security with enhanced DDoS protection
export async function secureApiRequest(
  req: Request, 
  functionName: string,
  handler: (req: Request, userId?: string) => Promise<Response>
): Promise<Response> {
  const url = new URL(req.url);
  const method = req.method;
  const ip = getClientIP(req);
  const userAgent = req.headers.get('User-Agent');
  let requestData;
  let responseData;
  
  try {
    // Clone the request to read the body for inspection
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const requestClone = req.clone();
      try {
        requestData = await requestClone.json();
        
        // Check for suspicious patterns in the request data
        if (hasSuspiciousPatterns(requestData)) {
          console.warn(`Suspicious pattern detected from ${ip} on ${url.pathname}`);
          
          // Track for rate limiting
          trackConsecutiveErrors(ip);
          
          // Log the suspicious request
          await logApiRequest(
            functionName,
            undefined,
            url.pathname,
            method,
            ip,
            userAgent,
            403,
            requestData,
            { error: 'Suspicious request pattern detected' }
          );
          
          return new Response(
            JSON.stringify({ 
              error: 'Forbidden', 
              message: 'Request contains potentially harmful patterns' 
            }),
            { 
              status: 403, 
              headers: { 'Content-Type': 'application/json' } 
            }
          );
        }
      } catch (e) {
        // Non-JSON body or other error reading the request
        console.log('Non-JSON body or error parsing request');
      }
    }
    
    // Apply rate limiting based on IP
    if (isRateLimited(ip, url.pathname)) {
      responseData = { 
        error: 'Too many requests', 
        message: 'Rate limit exceeded. Please try again later.' 
      };
      
      // Log rate limited request
      await logApiRequest(
        functionName,
        undefined,
        url.pathname,
        method,
        ip,
        userAgent,
        429,
        requestData,
        responseData
      );
      
      return new Response(
        JSON.stringify(responseData),
        { 
          status: 429, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Check if authentication is required
    if (requiresAuth(url.pathname, method)) {
      // Validate token
      const { isValid, userId, error } = await validateToken(req);
      
      if (!isValid) {
        responseData = { error: 'Unauthorized', message: error };
        
        // Track consecutive errors for potential brute force attempts
        trackConsecutiveErrors(ip);
        
        // Log unauthorized request
        await logApiRequest(
          functionName,
          undefined,
          url.pathname,
          method,
          ip,
          userAgent,
          401,
          requestData,
          responseData
        );
        
        return new Response(
          JSON.stringify(responseData),
          { 
            status: 401, 
            headers: { 'Content-Type': 'application/json' } 
          }
        );
      }
      
      // Reset consecutive errors on successful auth
      resetConsecutiveErrors(ip);
      
      // Process request with authenticated user
      try {
        const response = await handler(req, userId);
        
        try {
          // Try to parse response data for logging if it's JSON
          const responseClone = response.clone();
          const responseText = await responseClone.text();
          if (responseText && responseText.trim().startsWith('{')) {
            responseData = JSON.parse(responseText);
          }
        } catch (e) {
          // Non-JSON response or error parsing
        }
        
        // Log successful request
        await logApiRequest(
          functionName,
          userId,
          url.pathname,
          method,
          ip,
          userAgent,
          response.status,
          requestData,
          response.status >= 400 ? responseData : undefined
        );
        
        return response;
      } catch (error) {
        console.error(`Error in ${functionName}:`, error);
        
        responseData = { 
          error: 'Internal server error', 
          message: Deno.env.get('ENVIRONMENT') === 'development' ? error.message : 'An unexpected error occurred' 
        };
        
        // Log error
        await logApiRequest(
          functionName,
          userId,
          url.pathname,
          method,
          ip,
          userAgent,
          500,
          requestData,
          responseData
        );
        
        return new Response(
          JSON.stringify(responseData),
          { 
            status: 500, 
            headers: { 'Content-Type': 'application/json' } 
          }
        );
      }
    } else {
      // Handle public endpoint
      try {
        const response = await handler(req);
        
        // Log public request
        await logApiRequest(
          functionName,
          undefined,
          url.pathname,
          method,
          ip,
          userAgent,
          response.status,
          requestData
        );
        
        return response;
      } catch (error) {
        console.error(`Error in ${functionName} (public endpoint):`, error);
        
        responseData = { 
          error: 'Internal server error', 
          message: Deno.env.get('ENVIRONMENT') === 'development' ? error.message : 'An unexpected error occurred' 
        };
        
        // Log error
        await logApiRequest(
          functionName,
          undefined,
          url.pathname,
          method,
          ip,
          userAgent,
          500,
          requestData,
          responseData
        );
        
        return new Response(
          JSON.stringify(responseData),
          { 
            status: 500, 
            headers: { 'Content-Type': 'application/json' } 
          }
        );
      }
    }
  } catch (error) {
    console.error(`Unhandled error in API security middleware:`, error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: 'An unexpected error occurred in the security middleware' 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}
