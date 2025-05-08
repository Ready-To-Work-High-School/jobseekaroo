
import { supabase } from '../index';
import { NotificationType } from '@/types/notification';
import { NotificationData, NotificationResponse } from './types';
import { transformNotification } from './utils';

/**
 * Create a new notification for a user
 */
export async function createNotification(notification: NotificationData) {
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
  
  return transformNotification(data);
}

/**
 * Create admin notifications (for CEO and admins)
 */
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

/**
 * Create CEO notification (only for CEO)
 */
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
  await createNotification({
    user_id: ceoUser.id,
    title,
    message,
    type,
    link,
    metadata
  });
}
