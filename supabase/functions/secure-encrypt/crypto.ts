
import * as crypto from "https://deno.land/std@0.170.0/crypto/mod.ts";
import { str2ab, ab2str, hexToUint8Array, uint8ArrayToHex } from "./utils.ts";

// Default configuration
const ALGORITHM = "AES-GCM";
const KEY_LENGTH = 256;
const IV_LENGTH = 12;
const TAG_LENGTH = 16;

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

// Encrypt data
export async function encrypt(
  data: string,
  key: CryptoKey,
  iv: Uint8Array = generateIV()
): Promise<{ ciphertext: string; iv: string }> {
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
  
  // Convert binary data to hex strings for storage
  return {
    ciphertext: uint8ArrayToHex(new Uint8Array(encrypted)),
    iv: uint8ArrayToHex(iv),
  };
}

// Decrypt data
export async function decrypt(
  ciphertext: string,
  iv: string,
  key: CryptoKey
): Promise<string> {
  // Convert hex strings back to binary
  const encryptedData = hexToUint8Array(ciphertext);
  const ivData = hexToUint8Array(iv);
  
  const decrypted = await crypto.subtle.decrypt(
    {
      name: ALGORITHM,
      iv: ivData,
      tagLength: TAG_LENGTH * 8,
    },
    key,
    encryptedData
  );
  
  return ab2str(new Uint8Array(decrypted));
}

// Full encryption cycle with key generation
export async function encryptWithNewKey(data: string): Promise<{
  encryptedData: string;
  iv: string;
  key: string;
}> {
  const key = await generateKey();
  const iv = generateIV();
  const { ciphertext } = await encrypt(data, key, iv);
  
  return {
    encryptedData: ciphertext,
    iv: uint8ArrayToHex(iv),
    key: await exportKey(key),
  };
}

// Hashing function for verification
export async function hash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  return uint8ArrayToHex(new Uint8Array(hashBuffer));
}
