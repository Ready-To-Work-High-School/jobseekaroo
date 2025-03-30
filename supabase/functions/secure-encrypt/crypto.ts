
import * as crypto from "https://deno.land/std@0.170.0/crypto/mod.ts";
import { str2ab, ab2str, hexToUint8Array, uint8ArrayToHex } from "./utils.ts";

// Get the encryption key from environment variables
const ENCRYPTION_KEY = Deno.env.get("ENCRYPTION_KEY");

/**
 * Validates the environment and encryption keys
 * @throws Error if encryption is not properly configured
 */
function validateEncryptionEnvironment() {
  if (!ENCRYPTION_KEY) {
    throw new Error("Encryption key is not set in environment variables");
  }
  
  if (ENCRYPTION_KEY.length < 32) {
    throw new Error("Encryption key must be at least 32 characters long");
  }
}

/**
 * Encrypts data using AES-256-GCM with authentication tag
 * @param plaintext The data to encrypt
 * @returns Promise resolving to encrypted data in hex format
 */
export async function encrypt(plaintext: string): Promise<string> {
  validateEncryptionEnvironment();

  // Input validation - ensure plaintext is defined
  if (plaintext === undefined || plaintext === null) {
    throw new Error("Plaintext must be provided for encryption");
  }

  try {
    // Generate a random IV (Initialization Vector)
    const iv = new Uint8Array(16);
    
    // Use Deno's secure random number generation
    crypto.getRandomValues(iv);
    
    // Derive a key from the encryption key using PBKDF2
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      str2ab(ENCRYPTION_KEY),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );
    
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"]
    );
    
    // Encrypt the data with AES-GCM (authenticated encryption)
    const encryptedData = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      str2ab(plaintext)
    );
    
    // Combine salt, IV and encrypted data, and convert to hex
    const resultArray = new Uint8Array(salt.length + iv.length + new Uint8Array(encryptedData).length);
    resultArray.set(salt, 0);
    resultArray.set(iv, salt.length);
    resultArray.set(new Uint8Array(encryptedData), salt.length + iv.length);
    
    return uint8ArrayToHex(resultArray);
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error(`Failed to encrypt data: ${error.message}`);
  }
}

/**
 * Decrypts data using AES-256-GCM with authentication
 * @param encryptedHex The encrypted data in hex format
 * @returns Promise resolving to decrypted data
 */
export async function decrypt(encryptedHex: string): Promise<string> {
  validateEncryptionEnvironment();
  
  // Input validation - ensure encryptedHex is valid
  if (!encryptedHex || typeof encryptedHex !== 'string' || encryptedHex.length < 64) {
    throw new Error("Invalid encrypted data format");
  }
  
  try {
    // Convert hex string to Uint8Array
    const encryptedArray = hexToUint8Array(encryptedHex);
    
    // Extract salt, IV and encrypted data
    const salt = encryptedArray.slice(0, 16);
    const iv = encryptedArray.slice(16, 32);
    const encryptedData = encryptedArray.slice(32);
    
    // Derive the same key using PBKDF2
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      str2ab(ENCRYPTION_KEY),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );
    
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
    
    // Decrypt the data
    const decryptedData = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      encryptedData
    );
    
    return ab2str(new Uint8Array(decryptedData));
  } catch (error) {
    console.error("Decryption error:", error);
    // Use a generic error message to prevent oracle attacks
    throw new Error(`Failed to decrypt data: Invalid data or encryption key`);
  }
}

/**
 * Test if encryption key is properly configured
 * @returns Promise resolving to test result with success status and message
 */
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
