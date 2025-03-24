
import { supabase } from './index';
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

    if (error || !data) {
      console.error('Error generating redemption code:', error);
      return null;
    }

    // Cast data to any since TypeScript doesn't know the shape
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

    if (error || !data) {
      console.error('Error listing redemption codes:', error);
      return [];
    }

    // Transform the database records to match our interface
    const redemptionCodes: RedemptionCode[] = data.map(item => {
      // Cast item to any since TypeScript doesn't know the shape
      const itemAny = item as any;
      
      return {
        id: itemAny.id,
        code: itemAny.code,
        type: itemAny.type,
        used: itemAny.used,
        usedBy: itemAny.used_by,
        usedAt: itemAny.used_at ? new Date(itemAny.used_at) : undefined,
        createdAt: new Date(itemAny.created_at),
        expiresAt: itemAny.expires_at ? new Date(itemAny.expires_at) : undefined
      };
    });

    return redemptionCodes;
  } catch (error) {
    console.error('Error listing redemption codes:', error);
    return [];
  }
}
