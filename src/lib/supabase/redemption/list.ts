
import { supabase } from '../index';
import { RedemptionCode } from '@/types/redemption';

export async function listRedemptionCodes(
  options: {
    type?: 'student' | 'employer' | 'admin';
    used?: boolean;
    schoolId?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
  } = {}
): Promise<{ codes: RedemptionCode[]; count: number }> {
  try {
    const {
      type,
      used,
      schoolId,
      page = 1,
      limit = 50,
      sortBy = 'created_at',
      sortDirection = 'desc'
    } = options;

    // Calculate pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Start building the query
    let query = supabase
      .from('redemption_codes')
      .select('*', { count: 'exact' });

    // Apply filters if provided
    if (type) {
      query = query.eq('type', type);
    }
    if (used !== undefined) {
      query = query.eq('used', used);
    }
    if (schoolId) {
      query = query.eq('school_id', schoolId);
    }

    // Apply sorting and pagination
    query = query
      .order(sortBy, { ascending: sortDirection === 'asc' })
      .range(from, to);

    // Execute the query
    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching redemption codes:', error);
      return { codes: [], count: 0 };
    }

    // Transform the database records to match our interface
    const codes: RedemptionCode[] = data.map(record => ({
      id: record.id,
      code: record.code,
      type: record.type as 'student' | 'employer' | 'admin',
      used: record.used,
      usedBy: record.used_by,
      usedAt: record.used_at ? new Date(record.used_at) : undefined,
      createdAt: new Date(record.created_at),
      expiresAt: record.expires_at ? new Date(record.expires_at) : undefined,
      schoolId: record.school_id || '',
      isReusable: record.is_reusable || false
    }));

    return { 
      codes, 
      count: count || 0 
    };
  } catch (error) {
    console.error('Error listing redemption codes:', error);
    return { codes: [], count: 0 };
  }
}
