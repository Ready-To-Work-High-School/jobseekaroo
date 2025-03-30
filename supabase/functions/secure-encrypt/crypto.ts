
import * as crypto from "https://deno.land/std@0.170.0/crypto/mod.ts";
import { str2ab, ab2str, hexToUint8Array, uint8ArrayToHex } from "./utils.ts";

// Get the encryption key from environment variables
const ENCRYPTION_KEY = Deno.env.get("ENCRYPTION_KEY");

// Encrypt data
export async function encrypt(plaintext: string): Promise<string> {
  if (!ENCRYPTION_KEY) {
    throw new Error("Encryption key is not set in environment variables");
  }

  // Input validation - ensure plaintext is defined
  if (plaintext === undefined || plaintext === null) {
    throw new Error("Plaintext must be provided for encryption");
  }

  try {
    // Generate a random IV (Initialization Vector)
    const iv = new Uint8Array(16);
    
    // Use Deno's secure random number generation
    const randomBytes = new Uint8Array(16);
    crypto.getRandomValues(randomBytes);
    iv.set(randomBytes);
    
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
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error(`Failed to encrypt data: ${error.message}`);
  }
}

// Decrypt data
export async function decrypt(encryptedHex: string): Promise<string> {
  if (!ENCRYPTION_KEY) {
    throw new Error("Encryption key is not set in environment variables");
  }
  
  // Input validation - ensure encryptedHex is valid
  if (!encryptedHex || typeof encryptedHex !== 'string' || encryptedHex.length < 32) {
    throw new Error("Invalid encrypted data format");
  }
  
  try {
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
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error(`Failed to decrypt data: ${error.message}`);
  }
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
    
    // Validate key length - should be a proper length for security
    if (ENCRYPTION_KEY.length < 32) {
      console.error("ENCRYPTION_KEY is too short (should be at least 32 characters)");
      return {
        success: false,
        message: "ENCRYPTION_KEY is too short (should be at least 32 characters)"
      };
    }
    
    console.log("ENCRYPTION_KEY is set, testing encryption functionality");
    
    try {
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
      console.error("Encryption operation failed with error:", error.message);
      return { 
        success: false, 
        message: `Encryption operation failed with error: ${error.message}` 
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
