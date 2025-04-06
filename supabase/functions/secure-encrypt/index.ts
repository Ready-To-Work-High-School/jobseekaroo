
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encrypt, decrypt, testEncryption, generateSignedUrl, validateSignedUrl } from "../_shared/crypto.ts";
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
        const { action, data, filePath, expiryMinutes } = await req.json();

        if (action === "encrypt") {
          if (!data) {
            return addCorsHeaders(new Response(
              JSON.stringify({ error: "No data provided" }),
              {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
              }
            ), req.headers.get('origin'));
          }

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
          if (!data) {
            return addCorsHeaders(new Response(
              JSON.stringify({ error: "No data provided" }),
              {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
              }
            ), req.headers.get('origin'));
          }

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
        } else if (action === "signUrl") {
          // Generate a signed URL for secure file access
          if (!filePath) {
            return addCorsHeaders(new Response(
              JSON.stringify({ error: "No file path provided" }),
              {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
              }
            ), req.headers.get('origin'));
          }
          
          try {
            const expiry = expiryMinutes || 15; // Default to 15 minutes
            const signedUrl = await generateSignedUrl(filePath, expiry);
            
            return addCorsHeaders(new Response(
              JSON.stringify({ signedUrl }),
              {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              }
            ), req.headers.get('origin'));
          } catch (error) {
            console.error("Signed URL generation error:", error.message);
            return addCorsHeaders(new Response(
              JSON.stringify({ error: `Failed to generate signed URL: ${error.message}` }),
              {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
              }
            ), req.headers.get('origin'));
          }
        } else if (action === "validateUrl") {
          // Validate a signed URL token
          if (!data) {
            return addCorsHeaders(new Response(
              JSON.stringify({ error: "No token provided" }),
              {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
              }
            ), req.headers.get('origin'));
          }
          
          try {
            const filePath = await validateSignedUrl(data);
            
            return addCorsHeaders(new Response(
              JSON.stringify({ 
                isValid: !!filePath,
                filePath 
              }),
              {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
              }
            ), req.headers.get('origin'));
          } catch (error) {
            console.error("URL validation error:", error.message);
            return addCorsHeaders(new Response(
              JSON.stringify({ error: `Failed to validate URL: ${error.message}` }),
              {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
              }
            ), req.headers.get('origin'));
          }
        } else {
          return addCorsHeaders(new Response(
            JSON.stringify({ error: "Invalid action. Use 'encrypt', 'decrypt', 'signUrl', 'validateUrl', or access '/test' endpoint." }),
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
