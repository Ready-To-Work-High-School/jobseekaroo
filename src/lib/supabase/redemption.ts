
import { supabase } from './index';
import { RedemptionCode, RedemptionCodeValidation } from '@/types/redemption';

/**
 * Validate a redemption code
 */
export async function validateRedemptionCode(
  code: string
): Promise<RedemptionCodeValidation> {
  try {
    const { data, error } = await supabase
      .from('redemption_codes')
      .select('*')
      .eq('code', code)
      .single();

    if (error) {
      return {
        isValid: false,
        message: 'Invalid redemption code',
      };
    }

    const redemptionCode = data as RedemptionCode;

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

/**
 * Mark a redemption code as used
 */
export async function useRedemptionCode(
  codeId: string,
  userId: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('redemption_codes')
      .update({
        used: true,
        usedBy: userId,
        usedAt: new Date().toISOString(),
      })
      .eq('id', codeId);

    return !error;
  } catch (error) {
    console.error('Error using redemption code:', error);
    return false;
  }
}

/**
 * Generate a new redemption code
 */
export async function generateRedemptionCode(
  type: 'student' | 'employer',
  expiresInDays?: number
): Promise<RedemptionCode | null> {
  try {
    // Generate a random alphanumeric code
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    let expiresAt = null;
    if (expiresInDays) {
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + expiresInDays);
      expiresAt = expDate.toISOString();
    }

    const { data, error } = await supabase
      .from('redemption_codes')
      .insert({
        code,
        type,
        used: false,
        createdAt: new Date().toISOString(),
        expiresAt,
      })
      .select()
      .single();

    if (error) {
      console.error('Error generating redemption code:', error);
      return null;
    }

    return data as RedemptionCode;
  } catch (error) {
    console.error('Error generating redemption code:', error);
    return null;
  }
}

/**
 * List redemption codes with optional filters
 */
export async function listRedemptionCodes(
  type?: 'student' | 'employer',
  usedOnly?: boolean
): Promise<RedemptionCode[]> {
  try {
    let query = supabase
      .from('redemption_codes')
      .select('*')
      .order('createdAt', { ascending: false });

    if (type) {
      query = query.eq('type', type);
    }

    if (usedOnly !== undefined) {
      query = query.eq('used', usedOnly);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error listing redemption codes:', error);
      return [];
    }

    return data as RedemptionCode[];
  } catch (error) {
    console.error('Error listing redemption codes:', error);
    return [];
  }
}
