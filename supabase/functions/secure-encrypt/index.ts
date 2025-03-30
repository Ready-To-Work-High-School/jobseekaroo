
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encrypt, decrypt, testEncryption } from "./crypto.ts";
import { corsHeaders, handleCors, addCorsHeaders } from "../_shared/cors.ts";
import { secureApiRequest } from "../_shared/api-security.ts";

const FUNCTION_NAME = "secure-encrypt";

serve(async (req) => {
  // Handle CORS preflight requests
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  // Use the security middleware for all requests
  return secureApiRequest(req, FUNCTION_NAME, async (req, userId) => {
    try {
      const url = new URL(req.url);
      
      // Handle test endpoint
      if (url.pathname.endsWith('/test')) {
        console.log("Test endpoint called");
        const testResult = await testEncryption();
        
        return addCorsHeaders(new Response(
          JSON.stringify(testResult),
          {
            status: testResult.success ? 200 : 500,
            headers: { 'Content-Type': 'application/json' }
          }
        ), req.headers.get('origin'));
      }
      
      // Handle main encryption/decryption endpoints
      try {
        const { action, data } = await req.json();

        if (!data) {
          return addCorsHeaders(new Response(
            JSON.stringify({ error: "No data provided" }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          ), req.headers.get('origin'));
        }

        if (action === "encrypt") {
          try {
            const encryptedData = await encrypt(data);
            return addCorsHeaders(new Response(
              JSON.stringify({ encryptedData }),
              {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              }
            ), req.headers.get('origin'));
          } catch (error) {
            console.error("Encryption error:", error.message);
            return addCorsHeaders(new Response(
              JSON.stringify({ error: `Encryption failed: ${error.message}` }),
              {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
              }
            ), req.headers.get('origin'));
          }
        } else if (action === "decrypt") {
          try {
            const decryptedData = await decrypt(data);
            return addCorsHeaders(new Response(
              JSON.stringify({ decryptedData }),
              {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              }
            ), req.headers.get('origin'));
          } catch (error) {
            console.error("Decryption error:", error.message);
            return addCorsHeaders(new Response(
              JSON.stringify({ error: `Decryption failed: ${error.message}` }),
              {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
              }
            ), req.headers.get('origin'));
          }
        } else {
          return addCorsHeaders(new Response(
            JSON.stringify({ error: "Invalid action. Use 'encrypt', 'decrypt', or access '/test' endpoint." }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            }
          ), req.headers.get('origin'));
        }
      } catch (error) {
        // Handle JSON parsing errors or other request-related errors
        console.error("Request processing error:", error.message);
        return addCorsHeaders(new Response(
          JSON.stringify({ error: `Invalid request: ${error.message}` }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        ), req.headers.get('origin'));
      }
    } catch (error) {
      console.error("Error:", error.message);
      return addCorsHeaders(new Response(
        JSON.stringify({ error: `Server error: ${error.message}` }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      ), req.headers.get('origin'));
    }
  });
});
