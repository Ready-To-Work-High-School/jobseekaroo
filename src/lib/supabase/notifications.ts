import { supabase } from './index';
import { Notification, NotificationType } from '@/types/notification';
import { NotificationPreferences } from '@/types/notification-preferences';

// Helper function to transform database object to our Notification type
const transformNotification = (dbNotification: any): Notification => {
  return {
    id: dbNotification.id,
    user_id: dbNotification.user_id,
    title: dbNotification.title,
    message: dbNotification.message,
    type: dbNotification.type as NotificationType,
    link: dbNotification.link,
    read: dbNotification.read,
    createdAt: dbNotification.created_at,
    metadata: dbNotification.metadata
  };
};

// Fetch notifications from Supabase
export const fetchNotifications = async (userId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }

  return data.map(transformNotification) as Notification[];
};

// Add a new notification
export const addNotification = async (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
  const { data, error } = await supabase
    .from('notifications')
    .insert([
      {
        user_id: notification.user_id,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        link: notification.link,
        metadata: notification.metadata,
      }
    ])
    .select('*')
    .single();

  if (error) {
    console.error('Error adding notification:', error);
    throw error;
  }

  return transformNotification(data);
};

// Mark a notification as read
export const markNotificationAsRead = async (id: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }

  return transformNotification(data);
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (userId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', userId)
    .select('*');

  if (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }

  return data.map(transformNotification) as Notification[];
};

// Remove a notification
export const removeNotification = async (id: string) => {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error removing notification:', error);
    throw error;
  }

  return true;
};

// Clear all notifications
export const clearAllNotifications = async (userId: string) => {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error('Error clearing all notifications:', error);
    throw error;
  }

  return true;
};

// Fetch notification preferences
export const fetchNotificationPreferences = async (userId: string) => {
  const { data, error } = await supabase
    .from('notification_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') { // Not found is okay
    console.error('Error fetching notification preferences:', error);
    throw error;
  }

  // If no preferences found, create default preferences
  if (!data) {
    return createDefaultNotificationPreferences(userId);
  }

  return data as NotificationPreferences;
};

// Create default notification preferences
export const createDefaultNotificationPreferences = async (userId: string) => {
  const { data, error } = await supabase
    .from('notification_preferences')
    .insert([
      {
        user_id: userId,
        email_notifications: true,
        push_notifications: true,
        job_notifications: true,
        application_notifications: true,
        message_notifications: true,
        account_notifications: true,
        achievement_notifications: true,
      }
    ])
    .select('*')
    .single();

  if (error) {
    console.error('Error creating default notification preferences:', error);
    throw error;
  }

  return data as NotificationPreferences;
};

// Update notification preferences
export const updateNotificationPreferences = async (
  userId: string,
  preferences: Partial<Omit<NotificationPreferences, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
) => {
  const { data, error } = await supabase
    .from('notification_preferences')
    .update({
      ...preferences,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating notification preferences:', error);
    throw error;
  }

  return data as NotificationPreferences;
};

// Subscribe to notifications realtime changes
export const subscribeToNotifications = (
  userId: string,
  onInsert: (notification: Notification) => void
) => {
  return supabase
    .channel('notification-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => onInsert(payload.new as Notification)
    )
    .subscribe();
};
