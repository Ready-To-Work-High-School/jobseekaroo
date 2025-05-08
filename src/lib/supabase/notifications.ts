
import { supabase } from './index';
import { Notification, NotificationType } from '@/types/notification';

// Fetch all notifications for a user
export async function fetchNotifications(userId: string): Promise<Notification[]> {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  
  return data?.map(item => ({
    id: item.id,
    user_id: item.user_id,
    title: item.title,
    message: item.message,
    type: item.type as NotificationType,
    read: item.read,
    createdAt: item.created_at,
    link: item.link || '',
    metadata: item.metadata ? item.metadata : {},
  })) || [];
}

// Mark a notification as read
export async function markNotificationAsRead(notificationId: string): Promise<void> {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId);
    
  if (error) throw error;
}

// Mark all notifications as read for a user
export async function markAllNotificationsAsRead(userId: string): Promise<void> {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', userId);
    
  if (error) throw error;
}

// Clear all notifications for a user
export async function clearAllNotifications(userId: string): Promise<void> {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('user_id', userId);
    
  if (error) throw error;
}

// Create a new notification for a user
export async function createNotification(
  notification: {
    user_id: string;
    title: string;
    message: string;
    type: NotificationType;
    link?: string;
    metadata?: Record<string, any>;
  }
): Promise<Notification> {
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id: notification.user_id,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      link: notification.link || '',
      metadata: notification.metadata || {},
      read: false,
    })
    .select()
    .single();
    
  if (error) throw error;
  
  return {
    id: data.id,
    user_id: data.user_id,
    title: data.title,
    message: data.message,
    type: data.type as NotificationType,
    read: data.read,
    createdAt: data.created_at,
    link: data.link || '',
    metadata: data.metadata || {},
  };
}

// Create admin notifications (for CEO and admins)
export async function createAdminNotification(
  title: string,
  message: string,
  type: NotificationType,
  link?: string,
  metadata?: Record<string, any>
): Promise<void> {
  // Get all users with admin or CEO role
  const { data: adminUsers, error: adminError } = await supabase
    .from('users')
    .select('id')
    .in('role', ['admin', 'ceo']);
    
  if (adminError) throw adminError;
  
  if (!adminUsers || adminUsers.length === 0) return;
  
  // Create notifications for each admin user
  const notifications = adminUsers.map(admin => ({
    user_id: admin.id,
    title,
    message,
    type,
    link: link || '',
    metadata: metadata || {},
    read: false,
  }));
  
  const { error } = await supabase
    .from('notifications')
    .insert(notifications);
    
  if (error) throw error;
}

// Create CEO notification (only for CEO)
export async function createCeoNotification(
  title: string,
  message: string,
  type: NotificationType,
  link?: string,
  metadata?: Record<string, any>
): Promise<void> {
  // Get the CEO user
  const { data: ceoUser, error: ceoError } = await supabase
    .from('users')
    .select('id')
    .eq('role', 'ceo')
    .single();
    
  if (ceoError) {
    // If there's no CEO user, just return
    if (ceoError.code === 'PGRST116') return;
    throw ceoError;
  }
  
  if (!ceoUser) return;
  
  // Create notification for the CEO
  const { error } = await supabase
    .from('notifications')
    .insert({
      user_id: ceoUser.id,
      title,
      message,
      type,
      link: link || '',
      metadata: metadata || {},
      read: false,
    });
    
  if (error) throw error;
}

// Subscribe to real-time notifications
export function subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
  return supabase
    .channel('notifications')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `user_id=eq.${userId}`,
    }, (payload) => {
      // Transform the payload to a Notification object
      const notification: Notification = {
        id: payload.new.id,
        user_id: payload.new.user_id,
        title: payload.new.title,
        message: payload.new.message,
        type: payload.new.type as NotificationType,
        read: payload.new.read,
        createdAt: payload.new.created_at,
        link: payload.new.link || '',
        metadata: payload.new.metadata || {},
      };
      
      callback(notification);
    })
    .subscribe();
}
