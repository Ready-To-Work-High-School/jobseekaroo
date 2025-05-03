/**
 * Functions for sanitizing sensitive data
 */

import { SensitiveDataType } from './constants';

/**
 * Sanitize data by removing or masking sensitive information
 */
export function sanitizeData(data: any, type: SensitiveDataType): any {
  if (!data) return data;
  
  // Create a deep copy to avoid modifying the original
  const result = JSON.parse(JSON.stringify(data));
  
  if (type === SensitiveDataType.PERSONAL_IDENTIFIABLE_INFO) {
    // Mask email addresses
    if (typeof result === 'string' && result.includes('@')) {
      const parts = result.split('@');
      if (parts[0].length > 2) {
        return `${parts[0].substring(0, 2)}***@${parts[1]}`;
      }
    }
    
    // Sanitize objects recursively
    if (typeof result === 'object') {
      for (const key in result) {
        // Sanitize specific fields based on common PII field names
        if (['ssn', 'socialSecurityNumber', 'taxId'].includes(key)) {
          result[key] = '***-**-****';
        } else if (['phoneNumber', 'phone', 'mobile'].includes(key) && result[key]) {
          // Keep only last 4 digits of phone numbers
          const digits = String(result[key]).replace(/\D/g, '');
          if (digits.length >= 4) {
            result[key] = `***-***-${digits.substring(digits.length - 4)}`;
          }
        }
      }
    }
  }
  
  return result;
}
