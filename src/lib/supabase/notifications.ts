
import { supabase } from '.';
import { Notification, NotificationType } from '@/types/notification';

// Fetch all notifications for a user
export const fetchNotifications = async (userId: string): Promise<Notification[]> => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  return data.map((item) => ({
    id: item.id,
    user_id: item.user_id,
    title: item.title,
    message: item.message,
    type: item.type as NotificationType,
    read: item.read,
    createdAt: item.created_at,
    link: item.link || '',
    metadata: item.metadata || {}
  }));
};

// Mark a notification as read
export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId);
  
  if (error) throw error;
};

// Clear all notifications for a user
export const clearAllNotifications = async (userId: string): Promise<void> => {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('user_id', userId);
  
  if (error) throw error;
};

// Create a notification
export const createNotification = async (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>): Promise<void> => {
  const { error } = await supabase
    .from('notifications')
    .insert({
      user_id: notification.user_id,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      link: notification.link,
      metadata: notification.metadata || {}
    });
  
  if (error) throw error;
};

// Create a notification for all admin users
export const createAdminNotification = async (
  title: string,
  message: string,
  type: NotificationType,
  link?: string,
  metadata?: Record<string, any>
): Promise<void> => {
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
    
    // Get CEO user (based on environment variable)
    const { data: ceoProfile, error: ceoError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', import.meta.env.VITE_CEO_EMAIL)
      .single();
      
    if (ceoError && ceoError.code !== 'PGRST116') { // Ignore not found error
      console.error('Error fetching CEO profile:', ceoError);
    }
    
    // Create a Set of unique admin IDs to avoid duplicates if CEO is also an admin
    const adminIds = new Set<string>();
    
    // Add all admin IDs
    if (adminProfiles && adminProfiles.length > 0) {
      adminProfiles.forEach(admin => {
        adminIds.add(admin.id);
      });
    }
    
    // Add CEO ID if found
    if (ceoProfile) {
      adminIds.add(ceoProfile.id);
    }
    
    if (adminIds.size === 0) {
      console.log('No admin or CEO users found to notify');
      return;
    }
    
    // Create notifications for all admins and CEO
    const notifications = Array.from(adminIds).map(id => ({
      user_id: id,
      title,
      message,
      type,
      link: link || null,
      metadata: metadata || {}
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

// Fetch notification preferences
export const fetchNotificationPreferences = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') { // No rows found
        return { email: true, push: true, inApp: true }; // Default preferences
      }
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching notification preferences:', error);
    return { email: true, push: true, inApp: true }; // Default preferences on error
  }
};

// Update notification preferences
export const updateNotificationPreferences = async (userId: string, preferences: any) => {
  try {
    const { error } = await supabase
      .from('notification_preferences')
      .upsert({
        user_id: userId,
        ...preferences,
        updated_at: new Date().toISOString()
      });
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    return false;
  }
};
