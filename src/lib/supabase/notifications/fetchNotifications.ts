
import { supabase } from '@/lib/supabase';
import { transformNotifications } from './utils';
import { NotificationResponse } from './types';

export const fetchNotifications = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    const notificationRows = data as NotificationResponse[];
    return transformNotifications(notificationRows);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

export const fetchAllNotifications = async () => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    const notificationRows = data as NotificationResponse[];
    return transformNotifications(notificationRows);
  } catch (error) {
    console.error('Error fetching all notifications:', error);
    return [];
  }
};
