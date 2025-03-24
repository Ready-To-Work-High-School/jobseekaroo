
import { supabase } from '../index';
import { RedemptionCode } from '@/types/redemption';

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
