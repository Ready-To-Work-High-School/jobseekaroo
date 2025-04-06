
import * as crypto from "https://deno.land/std@0.170.0/crypto/mod.ts";
import { str2ab, ab2str, hexToUint8Array, uint8ArrayToHex } from "./utils.ts";

// Default configuration
const ALGORITHM = "AES-GCM";
const KEY_LENGTH = 256;
const IV_LENGTH = 12;
const TAG_LENGTH = 16;

// Retrieve the encryption key from environment variables
const getEncryptionKey = async (): Promise<CryptoKey> => {
  const keyHex = Deno.env.get("ENCRYPTION_KEY");
  if (!keyHex) {
    throw new Error("ENCRYPTION_KEY environment variable is not set");
  }
  return await importKey(keyHex);
};

// Generate a new encryption key
export async function generateKey(): Promise<CryptoKey> {
  return await crypto.subtle.generateKey(
    {
      name: ALGORITHM,
      length: KEY_LENGTH,
    },
    true,
    ["encrypt", "decrypt"]
  );
}

// Export key to hex string format
export async function exportKey(key: CryptoKey): Promise<string> {
  const rawKey = await crypto.subtle.exportKey("raw", key);
  return uint8ArrayToHex(new Uint8Array(rawKey));
}

// Import key from hex string format
export async function importKey(keyHex: string): Promise<CryptoKey> {
  const keyData = hexToUint8Array(keyHex);
  return await crypto.subtle.importKey(
    "raw",
    keyData,
    {
      name: ALGORITHM,
      length: KEY_LENGTH,
    },
    false,
    ["encrypt", "decrypt"]
  );
}

// Generate a random initialization vector
export function generateIV(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(IV_LENGTH));
}

// Encrypt data using the environment variable key
export async function encrypt(data: string): Promise<string> {
  const key = await getEncryptionKey();
  const iv = generateIV();
  const encodedData = str2ab(data);
  
  const encrypted = await crypto.subtle.encrypt(
    {
      name: ALGORITHM,
      iv,
      tagLength: TAG_LENGTH * 8,
    },
    key,
    encodedData
  );
  
  // Combine IV and encrypted data for storage
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);
  
  // Return as hex string
  return uint8ArrayToHex(combined);
}

// Decrypt data using the environment variable key
export async function decrypt(encryptedData: string): Promise<string> {
  const key = await getEncryptionKey();
  
  // Convert hex string back to binary
  const combined = hexToUint8Array(encryptedData);
  
  // Extract IV and encrypted data
  const iv = combined.slice(0, IV_LENGTH);
  const ciphertext = combined.slice(IV_LENGTH);
  
  const decrypted = await crypto.subtle.decrypt(
    {
      name: ALGORITHM,
      iv,
      tagLength: TAG_LENGTH * 8,
    },
    key,
    ciphertext
  );
  
  return ab2str(new Uint8Array(decrypted));
}

// Test the encryption service
export async function testEncryption(): Promise<{ success: boolean; message: string }> {
  try {
    // Check if encryption key is set
    const keyHex = Deno.env.get("ENCRYPTION_KEY");
    if (!keyHex) {
      return { success: false, message: "ENCRYPTION_KEY environment variable is not set" };
    }
    
    // Test data
    const testData = "This is a test message for encryption service.";
    
    // Encrypt and decrypt
    const encrypted = await encrypt(testData);
    const decrypted = await decrypt(encrypted);
    
    // Verify
    if (decrypted === testData) {
      return { 
        success: true, 
        message: "Encryption service is working properly" 
      };
    } else {
      return { 
        success: false, 
        message: "Encryption test failed: decrypted data does not match original" 
      };
    }
  } catch (error) {
    return { 
      success: false, 
      message: `Encryption service error: ${error.message}` 
    };
  }
}

// Create a signed URL for time-limited access
export async function generateSignedUrl(filePath: string, expiryMinutes = 15): Promise<string> {
  // Generate payload with file path and expiration time
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + expiryMinutes);
  
  const payload = {
    filePath,
    expiresAt: expiresAt.toISOString()
  };
  
  // Convert payload to string, encrypt it and return as token
  const payloadString = JSON.stringify(payload);
  const token = await encrypt(payloadString);
  
  return token;
}

// Validate a signed URL token
export async function validateSignedUrl(token: string): Promise<string | null> {
  try {
    // Decrypt the token to get the payload
    const payloadString = await decrypt(token);
    const payload = JSON.parse(payloadString);
    
    // Check if the URL has expired
    const expiresAt = new Date(payload.expiresAt);
    if (expiresAt < new Date()) {
      console.log("URL has expired:", expiresAt);
      return null;
    }
    
    // Return the file path if valid
    return payload.filePath;
  } catch (error) {
    console.error("Error validating signed URL:", error);
    return null;
  }
}

// Hashing function for verification
export async function hash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  return uint8ArrayToHex(new Uint8Array(hashBuffer));
}
