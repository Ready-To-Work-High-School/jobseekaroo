
import { supabase } from '../index';
import { RedemptionCode } from '@/types/redemption';

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
