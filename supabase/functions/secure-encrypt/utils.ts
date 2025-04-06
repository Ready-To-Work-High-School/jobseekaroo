
// Helper function to convert string to Uint8Array
export function str2ab(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

// Helper function to convert Uint8Array to string
export function ab2str(buf: Uint8Array): string {
  return new TextDecoder().decode(buf);
}

// Helper function to convert hex string to Uint8Array
export function hexToUint8Array(hexString: string): Uint8Array {
  const matches = hexString.match(/.{1,2}/g);
  if (!matches) return new Uint8Array(0);
  return new Uint8Array(matches.map(byte => parseInt(byte, 16)));
}

// Helper function to convert Uint8Array to hex string
export function uint8ArrayToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
