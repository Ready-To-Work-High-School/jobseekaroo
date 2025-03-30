
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Initialize Supabase client with service role key
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Rate limiting configuration
const MAX_REQUESTS_PER_MINUTE = 60;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

// In-memory rate limiting store (will reset on function cold start)
const rateLimitStore: Record<string, { count: number, resetAt: number }> = {};

// Function to get client IP from request headers
export function getClientIP(req: Request): string {
  return req.headers.get('X-Forwarded-For') || 
         req.headers.get('CF-Connecting-IP') || 
         'unknown-ip';
}

// Rate limiting function
export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  
  // Initialize or reset if window expired
  if (!rateLimitStore[identifier] || now > rateLimitStore[identifier].resetAt) {
    rateLimitStore[identifier] = {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS
    };
    return false;
  }
  
  // Increment counter
  rateLimitStore[identifier].count++;
  
  // Check if rate limit exceeded
  return rateLimitStore[identifier].count > MAX_REQUESTS_PER_MINUTE;
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

// Log API request for audit purposes
export async function logApiRequest(
  functionName: string,
  userId: string | undefined,
  path: string,
  method: string,
  ip: string,
  userAgent: string | null,
  statusCode: number
): Promise<void> {
  try {
    await supabase.from('security_audit_logs').insert({
      action: `api_${functionName}_${method.toLowerCase()}`,
      user_id: userId,
      metadata: {
        path,
        method,
        status_code: statusCode,
        timestamp: new Date().toISOString()
      },
      ip_address: ip,
      user_agent: userAgent || 'unknown'
    });
  } catch (error) {
    // Log but don't fail the request
    console.error('Error logging API request:', error);
  }
}

// Check if request requires authentication
export function requiresAuth(path: string, method: string): boolean {
  // Public endpoints that don't require authentication
  const publicEndpoints = [
    { path: '/test', methods: ['GET'] },
    { path: '/health', methods: ['GET'] },
    // Add other public endpoints here
  ];
  
  return !publicEndpoints.some(endpoint => 
    endpoint.path === path && endpoint.methods.includes(method)
  );
}

// Main middleware for handling API security
export async function secureApiRequest(
  req: Request, 
  functionName: string,
  handler: (req: Request, userId?: string) => Promise<Response>
): Promise<Response> {
  const url = new URL(req.url);
  const method = req.method;
  const ip = getClientIP(req);
  const userAgent = req.headers.get('User-Agent');
  
  // Apply rate limiting based on IP
  if (isRateLimited(ip)) {
    const response = new Response(
      JSON.stringify({ 
        error: 'Too many requests', 
        message: 'Rate limit exceeded. Please try again later.' 
      }),
      { 
        status: 429, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
    
    // Log rate limited request
    await logApiRequest(
      functionName,
      undefined,
      url.pathname,
      method,
      ip,
      userAgent,
      429
    );
    
    return response;
  }
  
  // Check if authentication is required
  if (requiresAuth(url.pathname, method)) {
    // Validate token
    const { isValid, userId, error } = await validateToken(req);
    
    if (!isValid) {
      const response = new Response(
        JSON.stringify({ error: 'Unauthorized', message: error }),
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
      
      // Log unauthorized request
      await logApiRequest(
        functionName,
        undefined,
        url.pathname,
        method,
        ip,
        userAgent,
        401
      );
      
      return response;
    }
    
    // Process request with authenticated user
    try {
      const response = await handler(req, userId);
      
      // Log successful request
      await logApiRequest(
        functionName,
        userId,
        url.pathname,
        method,
        ip,
        userAgent,
        response.status
      );
      
      return response;
    } catch (error) {
      console.error(`Error in ${functionName}:`, error);
      
      const response = new Response(
        JSON.stringify({ 
          error: 'Internal server error', 
          message: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred' 
        }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
      
      // Log error
      await logApiRequest(
        functionName,
        userId,
        url.pathname,
        method,
        ip,
        userAgent,
        500
      );
      
      return response;
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
        response.status
      );
      
      return response;
    } catch (error) {
      console.error(`Error in ${functionName} (public endpoint):`, error);
      
      const response = new Response(
        JSON.stringify({ 
          error: 'Internal server error', 
          message: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred' 
        }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
      
      // Log error
      await logApiRequest(
        functionName,
        undefined,
        url.pathname,
        method,
        ip,
        userAgent,
        500
      );
      
      return response;
    }
  }
}
