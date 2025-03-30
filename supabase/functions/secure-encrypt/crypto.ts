
import * as crypto from "https://deno.land/std@0.170.0/crypto/mod.ts";
import { str2ab, ab2str, hexToUint8Array, uint8ArrayToHex } from "./utils.ts";

// Get the encryption key from environment variables
const ENCRYPTION_KEY = Deno.env.get("ENCRYPTION_KEY");

// Encrypt data
export async function encrypt(plaintext: string): Promise<string> {
  if (!ENCRYPTION_KEY) {
    throw new Error("Encryption key is not set in environment variables");
  }

  // Generate a random IV (Initialization Vector)
  const iv = new Uint8Array(16);
  crypto.getRandomValues(iv);
  
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
export async function decrypt(encryptedHex: string): Promise<string> {
  if (!ENCRYPTION_KEY) {
    throw new Error("Encryption key is not set in environment variables");
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

// Test if encryption key is properly configured
export async function testEncryption(): Promise<{ success: boolean, message: string }> {
  try {
    // Check if encryption key is set
    if (!ENCRYPTION_KEY) {
      console.error("ENCRYPTION_KEY environment variable is not set");
      return { 
        success: false, 
        message: "ENCRYPTION_KEY environment variable is not set" 
      };
    }
    
    console.log("ENCRYPTION_KEY is set, testing encryption functionality");
    
    // Try to encrypt and decrypt a test value
    const testValue = "Test encryption functionality";
    const encrypted = await encrypt(testValue);
    const decrypted = await decrypt(encrypted);
    
    if (decrypted === testValue) {
      console.log("Encryption test passed successfully");
      return { 
        success: true, 
        message: "Encryption key is properly configured and working correctly" 
      };
    } else {
      console.error("Encryption/decryption test failed - decrypted value doesn't match original");
      return { 
        success: false, 
        message: "Encryption/decryption test failed - decrypted value doesn't match original" 
      };
    }
  } catch (error) {
    console.error("Encryption test failed with error:", error.message);
    return { 
      success: false, 
      message: `Encryption test failed with error: ${error.message}` 
    };
  }
}
