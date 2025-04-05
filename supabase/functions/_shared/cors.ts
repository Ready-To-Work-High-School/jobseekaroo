
// CORS headers to allow cross-origin requests
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

// Handle CORS preflight requests
export function handleCors(req: Request): Response | null {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }
  return null;
}

// Add CORS headers to a response
export function addCorsHeaders(response: Response, origin?: string | null): Response {
  const headers = new Headers(response.headers);
  
  // Add all CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });
  
  // If a specific origin was provided, use it instead of wildcard
  if (origin) {
    headers.set("Access-Control-Allow-Origin", origin);
  }
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
