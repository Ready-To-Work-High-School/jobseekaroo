
import { supabase } from '@/lib/supabase';
import { NotificationType } from '@/types/notification';

export const createAdminNotification = async (
  userId: string,
  title: string,
  message: string,
  type: NotificationType = 'system',
  link?: string
) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        title,
        message,
        type,
        link,
        read: false,
        created_at: new Date().toISOString()
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating admin notification:', error);
    throw error;
  }
};
