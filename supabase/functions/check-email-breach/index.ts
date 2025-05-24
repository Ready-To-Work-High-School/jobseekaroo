import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CheckEmailRequest {
  email: string;
}

interface BreachResponse {
  isBreached: boolean;
  breachCount: number;
  breaches?: string[];
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }

  try {
    const { email }: CheckEmailRequest = await req.json();

    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ 
          error: 'Valid email address is required' 
        }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    console.log(`Checking email breach status for: ${email}`);

    // Check HaveIBeenPwned API
    const hibpResponse = await fetch(
      `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`,
      {
        headers: {
          'User-Agent': 'JobSeekers4HS-SecurityCheck',
          'hibp-api-key': Deno.env.get('HIBP_API_KEY') || '', // Optional API key for higher rate limits
        },
      }
    );

    let breachResponse: BreachResponse;

    if (hibpResponse.status === 404) {
      // No breaches found
      breachResponse = {
        isBreached: false,
        breachCount: 0,
        message: 'Email address not found in any known data breaches'
      };
    } else if (hibpResponse.status === 200) {
      // Breaches found
      const breaches = await hibpResponse.json();
      const breachNames = breaches.map((breach: any) => breach.Name);
      
      breachResponse = {
        isBreached: true,
        breachCount: breaches.length,
        breaches: breachNames,
        message: `Email found in ${breaches.length} data breach(es): ${breachNames.slice(0, 3).join(', ')}${breaches.length > 3 ? '...' : ''}`
      };
    } else if (hibpResponse.status === 429) {
      // Rate limited
      console.warn('HaveIBeenPwned API rate limit exceeded');
      breachResponse = {
        isBreached: false,
        breachCount: 0,
        message: 'Security check temporarily unavailable. Please try again later.'
      };
    } else {
      // Other error
      console.error(`HaveIBeenPwned API error: ${hibpResponse.status}`);
      breachResponse = {
        isBreached: false,
        breachCount: 0,
        message: 'Security check temporarily unavailable'
      };
    }

    console.log(`Breach check result for ${email}:`, breachResponse);

    return new Response(
      JSON.stringify(breachResponse),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in check-email-breach function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        isBreached: false,
        breachCount: 0,
        message: 'Security check failed' 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
