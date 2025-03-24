
import { supabase } from './index';
import { RedemptionCode, RedemptionCodeValidation } from '@/types/redemption';

/**
 * Validate a redemption code
 */
export async function validateRedemptionCode(
  code: string
): Promise<RedemptionCodeValidation> {
  try {
    // Use any type to work around TypeScript limitations until types are regenerated
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

    // Transform the database record to match our interface
    const redemptionCode: RedemptionCode = {
      id: data.id,
      code: data.code,
      type: data.type,
      used: data.used,
      usedBy: data.used_by,
      usedAt: data.used_at ? new Date(data.used_at) : undefined,
      createdAt: new Date(data.created_at),
      expiresAt: data.expires_at ? new Date(data.expires_at) : undefined
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

/**
 * Mark a redemption code as used
 */
export async function useRedemptionCode(
  codeId: string,
  userId: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('redemption_codes' as any)
      .update({
        used: true,
        used_by: userId,
        used_at: new Date().toISOString(),
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
      .from('redemption_codes' as any)
      .insert({
        code,
        type,
        used: false,
        created_at: new Date().toISOString(),
        expires_at: expiresAt,
      })
      .select()
      .single();

    if (error) {
      console.error('Error generating redemption code:', error);
      return null;
    }

    // Transform the database record to match our interface
    const redemptionCode: RedemptionCode = {
      id: data.id,
      code: data.code,
      type: data.type,
      used: data.used,
      usedBy: data.used_by,
      usedAt: data.used_at ? new Date(data.used_at) : undefined,
      createdAt: new Date(data.created_at),
      expiresAt: data.expires_at ? new Date(data.expires_at) : undefined
    };

    return redemptionCode;
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
      .from('redemption_codes' as any)
      .select('*')
      .order('created_at', { ascending: false });

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

    // Transform the database records to match our interface
    const redemptionCodes: RedemptionCode[] = data.map(item => ({
      id: item.id,
      code: item.code,
      type: item.type,
      used: item.used,
      usedBy: item.used_by,
      usedAt: item.used_at ? new Date(item.used_at) : undefined,
      createdAt: new Date(item.created_at),
      expiresAt: item.expires_at ? new Date(item.expires_at) : undefined
    }));

    return redemptionCodes;
  } catch (error) {
    console.error('Error listing redemption codes:', error);
    return [];
  }
}
