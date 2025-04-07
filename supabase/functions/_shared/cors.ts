
// Define allowed origins
const allowedOrigins = [
  'https://jobseekaroo.com', 
  'https://jobseekers4hs.org', 
  'https://jobseeker4hs.org',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:5173'
];

// Function to check if origin is allowed
const isOriginAllowed = (origin: string | null) => {
  if (!origin) return false;
  
  // Check exact matches
  if (allowedOrigins.includes(origin)) return true;
  
  // Check subdomain patterns
  const subdomainPatterns = [
    /^https:\/\/[^.]+\.jobseekaroo\.com$/,
    /^https:\/\/[^.]+\.jobseekers4hs\.org$/,
    /^https:\/\/[^.]+\.jobseeker4hs\.org$/
  ];
  
  return subdomainPatterns.some(pattern => pattern.test(origin));
};

// Helper to add CORS headers based on origin
export const addCorsHeaders = (response: Response, origin: string | null) => {
  const headers = new Headers(response.headers);
  
  // Set origin if it's allowed, otherwise default to the first allowed origin
  if (origin && isOriginAllowed(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
  } else {
    headers.set('Access-Control-Allow-Origin', allowedOrigins[0]);
  }
  
  headers.set('Access-Control-Allow-Headers', 'authorization, x-client-info, apikey, content-type');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  headers.set('Access-Control-Max-Age', '86400');
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};

// Handle CORS preflight requests
export const handleCors = (req: Request) => {
  const origin = req.headers.get('Origin');

  if (req.method === 'OPTIONS') {
    // Return a response for OPTIONS preflight request
    const headers = new Headers({
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      'Access-Control-Max-Age': '86400'
    });
    
    // Set origin if it's allowed
    if (origin && isOriginAllowed(origin)) {
      headers.set('Access-Control-Allow-Origin', origin);
    } else {
      headers.set('Access-Control-Allow-Origin', allowedOrigins[0]);
    }
    
    return new Response(null, { status: 204, headers });
  }
  
  return null;
};

// For backwards compatibility
export const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigins[0],
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Max-Age': '86400'
};
