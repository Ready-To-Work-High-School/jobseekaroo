
import { supabase } from '@/lib/supabase';

interface AdminNotificationData {
  title: string;
  message: string;
  type: string;
  link?: string;
}

/**
 * Creates a notification for all admin users when important events occur
 */
export const createAdminNotification = async (data: AdminNotificationData): Promise<void> => {
  try {
    // Get all admin users
    const { data: adminProfiles, error: adminError } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_type', 'admin');
    
    if (adminError) {
      console.error('Error fetching admin profiles:', adminError);
      return;
    }
    
    if (!adminProfiles || adminProfiles.length === 0) {
      console.log('No admin users found to notify');
      return;
    }
    
    // Create notifications for all admins
    const notifications = adminProfiles.map(admin => ({
      user_id: admin.id,
      title: data.title,
      message: data.message,
      type: data.type,
      link: data.link || null,
      read: false
    }));
    
    const { error: insertError } = await supabase
      .from('notifications')
      .insert(notifications);
      
    if (insertError) {
      console.error('Error creating admin notifications:', insertError);
    }
  } catch (err) {
    console.error('Error in createAdminNotification:', err);
  }
};

/**
 * Marks a notification as read
 */
export const markNotificationAsRead = async (notificationId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);
      
    return !error;
  } catch (err) {
    console.error('Error marking notification as read:', err);
    return false;
  }
};

/**
 * Fetches notifications for the current user
 */
export const fetchUserNotifications = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('Error fetching notifications:', err);
    return [];
  }
};
