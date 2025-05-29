
/**
 * QR Code validation utilities for timestamp-based security
 */

interface QRValidationResult {
  isValid: boolean;
  reason?: string;
  timeRemaining?: number;
}

/**
 * Validates if a QR code timestamp is within the acceptable time window
 * @param timestamp - The timestamp from the QR code URL
 * @param maxAgeSeconds - Maximum age in seconds (default: 60 seconds)
 * @returns Validation result with details
 */
export const validateQRTimestamp = (timestamp: string | number, maxAgeSeconds: number = 60): QRValidationResult => {
  try {
    const qrTimestamp = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;
    
    if (isNaN(qrTimestamp)) {
      return {
        isValid: false,
        reason: 'Invalid timestamp format'
      };
    }
    
    const currentTime = Date.now();
    const timeDiff = currentTime - qrTimestamp;
    const ageInSeconds = Math.floor(timeDiff / 1000);
    
    if (ageInSeconds > maxAgeSeconds) {
      return {
        isValid: false,
        reason: `QR code expired (${ageInSeconds}s old, max ${maxAgeSeconds}s)`
      };
    }
    
    if (ageInSeconds < 0) {
      return {
        isValid: false,
        reason: 'QR code timestamp is in the future'
      };
    }
    
    return {
      isValid: true,
      timeRemaining: maxAgeSeconds - ageInSeconds
    };
  } catch (error) {
    return {
      isValid: false,
      reason: 'Error validating timestamp'
    };
  }
};

/**
 * Extracts timestamp from QR code URL
 * @param url - The QR code URL
 * @returns Timestamp string or null
 */
export const extractTimestampFromUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('t');
  } catch {
    return null;
  }
};

/**
 * Validates a complete QR code URL
 * @param url - The QR code URL to validate
 * @param maxAgeSeconds - Maximum age in seconds
 * @returns Validation result
 */
export const validateQRCodeUrl = (url: string, maxAgeSeconds: number = 60): QRValidationResult => {
  const timestamp = extractTimestampFromUrl(url);
  
  if (!timestamp) {
    return {
      isValid: false,
      reason: 'No timestamp found in URL'
    };
  }
  
  return validateQRTimestamp(timestamp, maxAgeSeconds);
};
