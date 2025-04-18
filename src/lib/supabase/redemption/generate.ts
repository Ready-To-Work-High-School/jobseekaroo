
import { supabase } from '../index';
import { RedemptionCode } from '@/types/redemption';
import { School } from '@/types/school';

export async function generateRedemptionCode(
  type: 'student' | 'employer',
  school: School,
  expiresInDays: number = 365
): Promise<RedemptionCode | null> {
  try {
    // Generate a random alphanumeric code
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    // Set expiration to exactly one year from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    const { data, error } = await supabase
      .from('redemption_codes')
      .insert({
        code,
        type,
        used: false,
        school_id: school.id,
        is_reusable: false,
        created_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (error || !data) {
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
      expiresAt: data.expires_at ? new Date(data.expires_at) : undefined,
      schoolId: data.school_id,
      isReusable: data.is_reusable
    };

    return redemptionCode;
  } catch (error) {
    console.error('Error generating redemption code:', error);
    return null;
  }
}
