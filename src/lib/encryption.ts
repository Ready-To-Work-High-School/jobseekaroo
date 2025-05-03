
/**
 * Utility functions for encrypting and decrypting sensitive data
 * This implements client-side encryption for data that needs protection
 * before sending to the server or storing in local storage
 */

// Use Web Crypto API for encryption (supported in modern browsers)
const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Generate a cryptographic key from a password
 */
export async function generateKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt sensitive data
 * @param data Data to encrypt
 * @param password Password to use for encryption
 * @returns Encrypted data as a base64 string with salt and IV
 */
export async function encryptData(data: string, password: string): Promise<string> {
  try {
    // Generate salt and IV
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    
    // Generate encryption key
    const key = await generateKey(password, salt);
    
    // Encrypt data
    const encrypted = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv
      },
      key,
      encoder.encode(data)
    );
    
    // Combine salt + iv + encrypted data
    const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
    result.set(salt, 0);
    result.set(iv, salt.length);
    result.set(new Uint8Array(encrypted), salt.length + iv.length);
    
    // Return as base64 string
    return btoa(String.fromCharCode(...result));
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypt sensitive data
 * @param encryptedData Encrypted data as a base64 string
 * @param password Password used for encryption
 * @returns Decrypted data string
 */
export async function decryptData(encryptedData: string, password: string): Promise<string> {
  try {
    // Convert base64 to array buffer
    const encryptedBytes = new Uint8Array(
      atob(encryptedData)
        .split('')
        .map(char => char.charCodeAt(0))
    );
    
    // Extract salt, iv and data
    const salt = encryptedBytes.slice(0, 16);
    const iv = encryptedBytes.slice(16, 28);
    const data = encryptedBytes.slice(28);
    
    // Generate decryption key
    const key = await generateKey(password, salt);
    
    // Decrypt data
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv
      },
      key,
      data
    );
    
    return decoder.decode(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data - incorrect password or corrupted data');
  }
}

/**
 * Securely store encrypted data in local storage
 */
export function secureStore(key: string, data: string, password: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const encrypted = await encryptData(data, password);
      localStorage.setItem(key, encrypted);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Retrieve and decrypt data from local storage
 */
export function secureRetrieve(key: string, password: string): Promise<string | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) {
        resolve(null);
        return;
      }
      
      const decrypted = await decryptData(encrypted, password);
      resolve(decrypted);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Check if the browser supports the required encryption APIs
 */
export function isEncryptionSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.crypto &&
    window.crypto.subtle &&
    typeof window.TextEncoder !== 'undefined' &&
    typeof window.TextDecoder !== 'undefined'
  );
}
