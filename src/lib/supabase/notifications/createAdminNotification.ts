
import { createNotification } from './createNotifications';
import { NotificationType } from '@/types/notification';
import { supabase } from '../index';

/**
 * Get user IDs by role
 * @param role The role to find users for
 * @returns Array of user IDs with the specified role
 */
async function getUsersByRole(role: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('user_roles')
    .select('user_id')
    .eq('role', role);
    
  if (error) {
    console.error('Error fetching users by role:', error);
    return [];
  }
  
  return data.map(item => item.user_id);
}

/**
 * Create a notification for admin users (admins and CEOs)
 * 
 * @param title Notification title
 * @param message Notification message
 * @param type Notification type
 * @param link Optional link to include
 * @param metadata Optional metadata
 * @returns Array of created notification IDs
 */
export async function createAdminNotification(
  title: string,
  message: string,
  type: NotificationType,
  link?: string,
  metadata?: Record<string, any>
): Promise<string[]> {
  try {
    // Get all admin and CEO user IDs
    const adminIds = await getUsersByRole('admin');
    const ceoIds = await getUsersByRole('ceo');
    
    // Combine all unique user IDs
    const uniqueUserIds = [...new Set([...adminIds, ...ceoIds])];
    
    if (uniqueUserIds.length === 0) {
      console.log('No admin or CEO users found to notify');
      return [];
    }
    
    // Create notifications for each admin/CEO user
    const notificationPromises = uniqueUserIds.map(userId => 
      createNotification({
        user_id: userId,
        title,
        message,
        type,
        link,
        metadata
      })
    );
    
    // Wait for all notifications to be created
    const notificationIds = await Promise.all(notificationPromises);
    return notificationIds;
  } catch (error) {
    console.error('Error creating admin notifications:', error);
    return [];
  }
}
