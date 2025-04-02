
import { supabase } from '../index';
import { RedemptionCodeValidation } from '@/types/redemption';

export async function validateRedemptionCode(
  code: string,
  isSecurePayload: boolean = false
): Promise<RedemptionCodeValidation> {
  try {
    let codeToCheck = code;
    
    // If using a secure payload (e.g. QR code with encrypted data)
    if (isSecurePayload) {
      try {
        // In a real implementation, we would decrypt the secure payload
        // For now, we'll just assume the whole string is the code
        codeToCheck = code;
      } catch (error) {
        return {
          isValid: false,
          message: 'Invalid secure code format'
        };
      }
    }
    
    // Special handling for admin codes (they start with "ADMIN-")
    const isAdminCode = codeToCheck.startsWith('ADMIN-');
    
    if (isAdminCode) {
      // Trim the "ADMIN-" prefix for the database lookup
      codeToCheck = codeToCheck.substring(6);
    }
    
    // Check if the code exists and is not used
    const { data, error } = await supabase
      .from('redemption_codes')
      .select('*')
      .eq('code', codeToCheck)
      .eq('used', false)
      .single();
    
    if (error || !data) {
      return {
        isValid: false,
        message: 'Invalid or already used redemption code'
      };
    }
    
    // Check if the code is expired
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return {
        isValid: false,
        message: 'This redemption code has expired'
      };
    }
    
    // Convert database record to our interface format
    const redemptionCode = {
      id: data.id,
      code: data.code,
      type: isAdminCode ? 'admin' : data.type,
      used: data.used,
      usedBy: data.used_by,
      usedAt: data.used_at ? new Date(data.used_at) : undefined,
      createdAt: new Date(data.created_at),
      expiresAt: data.expires_at ? new Date(data.expires_at) : undefined
    };
    
    return {
      isValid: true,
      message: isAdminCode 
        ? 'Valid admin privileges redemption code' 
        : `Valid ${redemptionCode.type} redemption code`,
      code: redemptionCode
    };
  } catch (error) {
    console.error('Error validating redemption code:', error);
    return {
      isValid: false,
      message: 'An error occurred while validating the code'
    };
  }
}
