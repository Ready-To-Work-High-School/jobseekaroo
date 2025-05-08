
import { supabase } from '../index';
import { Notification } from '@/types/notification';
import { transformNotification } from './utils';

/**
 * Fetch all notifications for a user
 */
export async function fetchNotifications(userId: string): Promise<Notification[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  
  return data?.map(transformNotification) || [];
}
