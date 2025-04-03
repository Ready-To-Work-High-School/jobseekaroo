
import { supabase } from '../index';
import { RedemptionCode, RedemptionCodeValidation } from '@/types/redemption';

/**
 * Validate a redemption code
 */
export async function validateRedemptionCode(
  code: string
): Promise<RedemptionCodeValidation> {
  try {
    // Use explicit casting with any to work around TypeScript limitations
    const { data, error } = await supabase
      .from('redemption_codes' as any)
      .select('*')
      .eq('code', code)
      .single();

    if (error) {
      return {
        isValid: false,
        message: 'Invalid redemption code',
      };
    }

    if (!data) {
      return {
        isValid: false,
        message: 'Code not found',
      };
    }

    // Since the data may be coming from Supabase, we need to handle it safely
    // We know the shape should be correct, but TypeScript doesn't
    const dataAny = data as any;

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

    // Check if code is already used
    if (redemptionCode.used) {
      return {
        isValid: false,
        message: 'This code has already been used',
      };
    }

    // Check if code is expired
    if (redemptionCode.expiresAt && new Date(redemptionCode.expiresAt) < new Date()) {
      return {
        isValid: false,
        message: 'This code has expired',
      };
    }

    return {
      isValid: true,
      message: 'Valid code',
      code: redemptionCode,
    };
  } catch (error) {
    console.error('Error validating redemption code:', error);
    return {
      isValid: false,
      message: 'Error validating code',
    };
  }
}
