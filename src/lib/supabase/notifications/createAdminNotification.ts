
import { supabase } from '../client';

export const createAdminNotification = async (
  userId: string,
  title: string, 
  message: string,
  type: string,
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
        read: false
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating admin notification:', error);
    throw error;
  }
};
