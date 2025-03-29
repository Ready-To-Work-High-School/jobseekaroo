
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encrypt, decrypt, testEncryption } from "./crypto.ts";
import { corsHeaders } from "./cors.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    
    // Handle test endpoint
    if (url.pathname.endsWith('/test')) {
      const testResult = await testEncryption();
      return new Response(
        JSON.stringify(testResult),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: testResult.success ? 200 : 500,
        }
      );
    }
    
    // Handle main encryption/decryption endpoints
    const { action, data } = await req.json();

    if (!data) {
      return new Response(
        JSON.stringify({ error: "No data provided" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    if (action === "encrypt") {
      try {
        const encryptedData = await encrypt(data);
        return new Response(
          JSON.stringify({ encryptedData }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      } catch (error) {
        console.error("Encryption error:", error.message);
        return new Response(
          JSON.stringify({ error: `Encryption failed: ${error.message}` }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
          }
        );
      }
    } else if (action === "decrypt") {
      try {
        const decryptedData = await decrypt(data);
        return new Response(
          JSON.stringify({ decryptedData }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      } catch (error) {
        console.error("Decryption error:", error.message);
        return new Response(
          JSON.stringify({ error: `Decryption failed: ${error.message}` }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
          }
        );
      }
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid action. Use 'encrypt', 'decrypt', or access '/test' endpoint." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({ error: `Server error: ${error.message}` }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
