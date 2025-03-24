
import { supabase } from '../index';
import { RedemptionCode, RedemptionCodeValidation } from '@/types/redemption';

/**
 * Validate a redemption code
 */
export async function validateRedemptionCode(
  codeOrSecurePayload: string,
  isSecurePayload: boolean = false
): Promise<RedemptionCodeValidation> {
  try {
    let codeToValidate = codeOrSecurePayload;
    let securityData = null;
    
    // If this is a secure payload, decode it
    if (isSecurePayload) {
      try {
        const decodedData = JSON.parse(atob(codeOrSecurePayload));
        codeToValidate = decodedData.code;
        securityData = decodedData;
      } catch (error) {
        return {
          isValid: false,
          message: 'Invalid security payload',
        };
      }
    }
    
    // Query the database for the code
    const { data, error } = await supabase
      .from('redemption_codes' as any)
      .select('*')
      .eq('code', codeToValidate)
      .single();

    if (error || !data) {
      return {
        isValid: false,
        message: 'Invalid redemption code',
      };
    }

    // Cast data to any since TypeScript doesn't know the shape
    const dataAny = data as any;

    // Check if the code has already been used
    if (dataAny.used) {
      return {
        isValid: false,
        message: 'This code has already been used',
      };
    }

    // Check if the code has expired
    if (dataAny.expires_at && new Date(dataAny.expires_at) < new Date()) {
      return {
        isValid: false,
        message: 'This code has expired',
      };
    }

    // If security data is present, do additional validations
    if (securityData) {
      // You could implement additional security checks here
      // For example, verify that the hash matches what you'd expect
      // or that the timestamp is within a certain window
    }

    // Transform the database record to match our interface
    const redemptionCode: RedemptionCode = {
      id: dataAny.id,
      code: dataAny.code,
      type: dataAny.type,
      used: dataAny.used,
      usedBy: dataAny.used_by,
      usedAt: dataAny.used_at ? new Date(dataAny.used_at) : undefined,
      createdAt: new Date(dataAny.created_at),
      expiresAt: dataAny.expires_at ? new Date(dataAny.expires_at) : undefined
    };

    return {
      isValid: true,
      message: 'Valid redemption code',
      code: redemptionCode,
    };
  } catch (error) {
    console.error('Error validating redemption code:', error);
    return {
      isValid: false,
      message: 'An error occurred while validating the code',
    };
  }
}
