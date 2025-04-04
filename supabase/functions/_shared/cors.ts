
// Tightly configured CORS headers for production use
export const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.NODE_ENV === 'development' 
    ? "*" 
    : "https://juzawihlfesurtewxgdy.supabase.co",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Max-Age": "86400", // 24 hours cache for preflight requests
};

// Helper function to check if a request is from an allowed origin
export function isAllowedOrigin(origin: string): boolean {
  if (process.env.NODE_ENV === 'development') {
    return true; // Allow all origins in development
  }
  
  // List of allowed origins in production
  const allowedOrigins = [
    'https://juzawihlfesurtewxgdy.supabase.co',
    'https://lovableproject.com',
    'https://*.lovableproject.com'
  ];
  
  return allowedOrigins.some(allowed => {
    if (allowed.includes('*')) {
      const pattern = allowed.replace('*', '.*');
      return new RegExp(pattern).test(origin);
    }
    return allowed === origin;
  });
}

// Helper to add CORS headers to a response
export function addCorsHeaders(response: Response, origin?: string): Response {
  const headers = new Headers(response.headers);
  
  // Set the allowed origin based on the request origin
  if (origin && isAllowedOrigin(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
  } else {
    headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
  }
  
  // Add other CORS headers
  headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
  headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
  headers.set('Access-Control-Max-Age', corsHeaders['Access-Control-Max-Age']);
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

// Function to handle CORS preflight requests
export function handleCors(req: Request): Response | null {
  // Handle CORS preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    const origin = req.headers.get('origin');
    return new Response(null, { 
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin && isAllowedOrigin(origin) 
          ? origin 
          : corsHeaders['Access-Control-Allow-Origin'],
        'Access-Control-Allow-Headers': corsHeaders['Access-Control-Allow-Headers'],
        'Access-Control-Allow-Methods': corsHeaders['Access-Control-Allow-Methods'],
        'Access-Control-Max-Age': corsHeaders['Access-Control-Max-Age']
      }
    });
  }
  
  return null;
}
