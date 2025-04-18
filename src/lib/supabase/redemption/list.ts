
import { supabase } from '../index';
import { RedemptionCode } from '@/types/redemption';

interface PaginationOptions {
  page?: number;
  pageSize?: number;
}

/**
 * List redemption codes with optional filters and pagination
 */
export async function listRedemptionCodes(
  type?: 'student' | 'employer',
  usedOnly?: boolean,
  paginationOptions?: PaginationOptions
): Promise<{ data: RedemptionCode[], count: number }> {
  try {
    // Set default pagination values
    const page = paginationOptions?.page || 1;
    const pageSize = paginationOptions?.pageSize || 10;
    const startRange = (page - 1) * pageSize;
    const endRange = startRange + pageSize - 1;

    // First get the total count for pagination
    let countQuery = supabase
      .from('redemption_codes' as any)
      .select('id', { count: 'exact' });
    
    if (type) {
      countQuery = countQuery.eq('type', type);
    }

    if (usedOnly !== undefined) {
      countQuery = countQuery.eq('used', usedOnly);
    }

    const { count: totalCount, error: countError } = await countQuery;

    if (countError) {
      console.error('Error counting redemption codes:', countError);
      return { data: [], count: 0 };
    }

    // Then get the paginated data
    let query = supabase
      .from('redemption_codes' as any)
      .select('*')
      .order('created_at', { ascending: false })
      .range(startRange, endRange);

    if (type) {
      query = query.eq('type', type);
    }

    if (usedOnly !== undefined) {
      query = query.eq('used', usedOnly);
    }

    const { data, error } = await query;

    if (error || !data) {
      console.error('Error listing redemption codes:', error);
      return { data: [], count: 0 };
    }

    // Transform the database records to match our interface
    const redemptionCodes: RedemptionCode[] = data.map(item => {
      // Cast item to any since TypeScript doesn't know the shape
      const itemAny = item as any;
      
      return {
        id: itemAny.id,
        code: itemAny.code,
        type: itemAny.type as 'student' | 'employer' | 'admin',
        used: itemAny.used,
        usedBy: itemAny.used_by,
        usedAt: itemAny.used_at ? new Date(itemAny.used_at) : undefined,
        createdAt: new Date(itemAny.created_at),
        expiresAt: itemAny.expires_at ? new Date(itemAny.expires_at) : undefined,
        schoolId: itemAny.school_id || '',
        isReusable: itemAny.is_reusable || false
      };
    });

    return { data: redemptionCodes, count: totalCount || 0 };
  } catch (error) {
    console.error('Error listing redemption codes:', error);
    return { data: [], count: 0 };
  }
}
