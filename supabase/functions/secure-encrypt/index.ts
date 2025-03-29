
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import * as crypto from "https://deno.land/std@0.170.0/crypto/mod.ts";

// Set up CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

// Get the encryption key from environment variables
const ENCRYPTION_KEY = Deno.env.get("ENCRYPTION_KEY");
if (!ENCRYPTION_KEY) {
  console.error("ENCRYPTION_KEY environment variable is not set");
}

// Helper function to convert string to Uint8Array
function str2ab(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

// Helper function to convert Uint8Array to string
function ab2str(buf: Uint8Array): string {
  return new TextDecoder().decode(buf);
}

// Helper function to convert hex string to Uint8Array
function hexToUint8Array(hexString: string): Uint8Array {
  const matches = hexString.match(/.{1,2}/g);
  if (!matches) return new Uint8Array(0);
  return new Uint8Array(matches.map(byte => parseInt(byte, 16)));
}

// Helper function to convert Uint8Array to hex string
function uint8ArrayToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Encrypt data
async function encrypt(plaintext: string): Promise<string> {
  if (!ENCRYPTION_KEY) {
    throw new Error("Encryption key is not set");
  }

  // Generate a random IV (Initialization Vector)
  const iv = crypto.getRandomValues(new Uint8Array(16));
  
  // Derive a key from the encryption key
  const keyData = await crypto.subtle.digest(
    "SHA-256",
    str2ab(ENCRYPTION_KEY)
  );
  
  // Import the key
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );
  
  // Encrypt the data
  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    str2ab(plaintext)
  );
  
  // Combine IV and encrypted data, and convert to hex
  const encryptedArray = new Uint8Array(iv.length + new Uint8Array(encryptedData).length);
  encryptedArray.set(iv);
  encryptedArray.set(new Uint8Array(encryptedData), iv.length);
  
  return uint8ArrayToHex(encryptedArray);
}

// Decrypt data
async function decrypt(encryptedHex: string): Promise<string> {
  if (!ENCRYPTION_KEY) {
    throw new Error("Encryption key is not set");
  }
  
  // Convert hex string to Uint8Array
  const encryptedArray = hexToUint8Array(encryptedHex);
  
  // Extract IV and encrypted data
  const iv = encryptedArray.slice(0, 16);
  const encryptedData = encryptedArray.slice(16);
  
  // Derive a key from the encryption key
  const keyData = await crypto.subtle.digest(
    "SHA-256",
    str2ab(ENCRYPTION_KEY)
  );
  
  // Import the key
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );
  
  // Decrypt the data
  const decryptedData = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv },
    key,
    encryptedData
  );
  
  return ab2str(new Uint8Array(decryptedData));
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json();

    if (action === "encrypt") {
      const encryptedData = await encrypt(data);
      return new Response(
        JSON.stringify({ encryptedData }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else if (action === "decrypt") {
      const decryptedData = await decrypt(data);
      return new Response(
        JSON.stringify({ decryptedData }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid action. Use 'encrypt' or 'decrypt'." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
