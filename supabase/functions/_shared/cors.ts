
// CORS headers to allow cross-origin requests
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

// Handle CORS preflight requests
export function handleCors(req: Request): Response | null {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }
  return null;
}

// Add CORS headers to a response
export function addCorsHeaders(res: Response, origin?: string | null): Response {
  const headers = new Headers(res.headers);
  
  Object.entries(corsHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });
  
  if (origin) {
    headers.set("Access-Control-Allow-Origin", origin);
  }
  
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers
  });
}
