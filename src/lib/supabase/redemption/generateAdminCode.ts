
import { supabase } from '../index';
import { RedemptionCode } from '@/types/redemption';

/**
 * Generate a new admin redemption code
 */
export async function generateAdminRedemptionCode(
  expiresInDays?: number
): Promise<RedemptionCode | null> {
  try {
    // Generate a random alphanumeric code with ADMIN- prefix
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const code = `ADMIN-${randomPart}`;
    
    let expiresAt = null;
    if (expiresInDays) {
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + expiresInDays);
      expiresAt = expDate.toISOString();
    }

    // Store the code without the ADMIN- prefix in the database
    // The prefix will be handled by the validation logic
    const { data, error } = await supabase
      .from('redemption_codes')
      .insert({
        code: randomPart,
        type: 'student', // We store it as a regular code type
        used: false,
        created_at: new Date().toISOString(),
        expires_at: expiresAt,
        is_reusable: false,
        school_id: null // Admin codes don't necessarily belong to a school
      })
      .select()
      .single();

    if (error || !data) {
      console.error('Error generating admin redemption code:', error);
      return null;
    }

    // Transform the database record to match our interface
    const redemptionCode: RedemptionCode = {
      id: data.id,
      code: code, // Return the full code with ADMIN- prefix
      type: 'admin', // But mark it as admin type in the return value
      used: data.used,
      usedBy: data.used_by,
      usedAt: data.used_at ? new Date(data.used_at) : undefined,
      createdAt: new Date(data.created_at),
      expiresAt: data.expires_at ? new Date(data.expires_at) : undefined,
      schoolId: data.school_id || '',
      isReusable: data.is_reusable || false
    };

    return redemptionCode;
  } catch (error) {
    console.error('Error generating admin redemption code:', error);
    return null;
  }
}
