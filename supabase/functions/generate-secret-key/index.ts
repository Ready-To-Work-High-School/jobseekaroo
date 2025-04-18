
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Generate a cryptographically secure random key (32 bytes)
    const keyBuffer = new Uint8Array(32);
    crypto.getRandomValues(keyBuffer);
    
    // Convert to hexadecimal string
    const encryptionKey = Array.from(keyBuffer)
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
    
    // Generate a JWT secret as well
    const jwtKeyBuffer = new Uint8Array(32);
    crypto.getRandomValues(jwtKeyBuffer);
    const jwtSecret = Array.from(jwtKeyBuffer)
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
    
    console.log("Successfully generated new encryption keys");
    
    return new Response(
      JSON.stringify({ 
        encryptionKey,
        jwtSecret,
        message: "Copy these keys and store them securely as environment variables named ENCRYPTION_KEY and JWT_SECRET" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error generating encryption key:", error.message);
    
    return new Response(
      JSON.stringify({ error: `Failed to generate keys: ${error.message}` }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
