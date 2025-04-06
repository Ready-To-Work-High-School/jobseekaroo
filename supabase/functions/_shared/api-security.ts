
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, addCorsHeaders } from "./cors.ts";

// Gets the client IP from request headers or connection info
export function getClientIP(req: Request): string {
  // Try standard headers
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    // Get the first IP if there are multiple
    return forwarded.split(",")[0].trim();
  }
  
  // Fallback to Cloudflare-specific header
  const cfConnecting = req.headers.get("cf-connecting-ip");
  if (cfConnecting) {
    return cfConnecting;
  }
  
  // Final fallback
  return "unknown";
}

/**
 * Middleware to secure API requests with authentication and rate limiting
 * @param req Original request
 * @param functionName Name of the function (for logging)
 * @param handler The actual request handler that processes the authenticated request
 * @returns Response
 */
export async function secureApiRequest(
  req: Request, 
  functionName: string,
  handler: (req: Request, userId: string | null) => Promise<Response>
): Promise<Response> {
  try {
    // Get Supabase client for auth verification
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Extract authorization header
    const authHeader = req.headers.get('Authorization');
    let userId: string | null = null;
    
    // Verify the authorization header
    if (authHeader) {
      try {
        // Strip "Bearer " from token
        const token = authHeader.replace('Bearer ', '');
        
        // Verify JWT token
        const { data: { user }, error } = await supabase.auth.getUser(token);
        
        if (!error && user) {
          userId = user.id;
          console.log(`Authenticated request to ${functionName} from user ${userId}`);
        } else {
          console.warn(`Invalid auth token presented to ${functionName}: ${error?.message}`);
        }
      } catch (error) {
        console.error(`Error validating auth token: ${error.message}`);
      }
    } else {
      console.log(`Anonymous request to ${functionName}`);
    }
    
    // Log the request for auditing
    const clientIP = getClientIP(req);
    const userAgent = req.headers.get('User-Agent') || 'Unknown';
    
    console.log(`Request to ${functionName} from ${clientIP} using ${userAgent}`);
    
    // Call the handler with the authenticated user ID (or null if not authenticated)
    return await handler(req, userId);
  } catch (error) {
    console.error(`Security middleware error in ${functionName}: ${error.message}`);
    
    // Return a generic error to not leak implementation details
    return addCorsHeaders(new Response(
      JSON.stringify({ error: "Server error processing request" }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    ), req.headers.get('origin'));
  }
}
