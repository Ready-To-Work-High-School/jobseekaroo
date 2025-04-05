
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Get the Supabase URL and service key from environment variables
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

// Create a Supabase client for the function
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Extracts the client IP address from the request
 * @param req The request object
 * @returns The client IP address or 'unknown' if not found
 */
export function getClientIP(req: Request): string {
  const headers = req.headers;
  // Try various headers that might contain the client IP
  const ip = 
    headers.get('cf-connecting-ip') || 
    headers.get('x-real-ip') || 
    headers.get('x-forwarded-for')?.split(',')[0] || 
    'unknown';
  
  return ip;
}

/**
 * Middleware for securing API requests
 * @param req The request object
 * @param functionName The name of the function for logging purposes
 * @param handler The handler function to execute if authentication passes
 * @returns Response from the handler or an error response
 */
export async function secureApiRequest(
  req: Request,
  functionName: string,
  handler: (req: Request, userId: string | null) => Promise<Response>
): Promise<Response> {
  try {
    // Log basic request info
    console.log(`Request to ${functionName}: ${req.method} ${new URL(req.url).pathname}`);
    
    // Verify JWT token if required by config
    const authHeader = req.headers.get('Authorization');
    let userId: string | null = null;
    
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (error) {
        console.error(`Auth error in ${functionName}:`, error.message);
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      if (user) {
        userId = user.id;
        console.log(`Authenticated user: ${userId}`);
      }
    }
    
    // Log rate limit info if available
    const clientIP = getClientIP(req);
    console.log(`Client IP: ${clientIP}`);
    
    // Execute the handler with the authenticated user ID
    return await handler(req, userId);
  } catch (error) {
    console.error(`Error in ${functionName}:`, error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
